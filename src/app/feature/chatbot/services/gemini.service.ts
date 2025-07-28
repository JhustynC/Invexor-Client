import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'; // Asegúrate de que la ruta sea correcta

// --- Interfaces para la estructura de la API de Gemini ---
export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
    index: number;
  }[];
}


@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly API_KEY = environment.gemini.apiKey;
  private readonly API_URL = environment.gemini.apiUrl;
  // La URL base para la API de Gemini 2.5 Flash
  // Ya no incluimos la API Key aquí, se pasará en los headers
  // private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent';

  constructor(private http: HttpClient) {}

  /**
   * Envía un mensaje a Gemini y obtiene la respuesta.
   * @param message El mensaje del usuario.
   * @param conversationHistory El historial previo de la conversación en formato GeminiMessage[].
   * @returns Un Observable que emite la respuesta de Gemini como una cadena de texto.
   */
  sendMessage(message: string, conversationHistory: GeminiMessage[] = []): Observable<string> {
    if (!this.isApiKeyConfigured()) {
      return throwError(() => new Error('API Key de Gemini no configurada.'));
    }

    const streamingUrl = `${this.API_URL}?alt=sse`;

    const contents: GeminiMessage[] = [
      { role: 'user', parts: [{ text: `Eres un asistente virtual para Invexor, un sistema de gestión empresarial. INSTRUCCIONES IMPORTANTES: Respuestas concisas (máximo 50 palabras). Tono amigable y directo. COMANDOS DE NAVEGACIÓN (usa cuando sea relevante): [NAVEGAR:dashboard], [NAVEGAR:transactions], [NAVEGAR:items], [NAVEGAR:resources], [NAVEGAR:reports], [NAVEGAR:mashup], [NAVEGAR:users], [NAVEGAR:areas], [NAVEGAR:branches]. Responde siempre en español.` }] },
      { role: 'model', parts: [{ text: '¡Hola! Soy tu asistente de Invexor. ¿Cómo puedo asistirte hoy?' }] },
      ...conversationHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const requestBody: GeminiRequest = {
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 150 }
    };

    return new Observable<string>(observer => {
      const controller = new AbortController();

      fetch(streamingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.API_KEY
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      }).then(response => {
        if (!response.ok) {
          return observer.error(new Error(`Error de red: ${response.statusText}`));
        }
        if (!response.body) {
          return observer.error(new Error('La respuesta no contiene un cuerpo.'));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const push = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              observer.complete();
              return;
            }
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const json = JSON.parse(line.substring(6));
                  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
                  if (text) {
                    observer.next(text);
                  }
                } catch (e) {
                  // Ignorar errores de parseo
                }
              }
            }
            push();
          }).catch(err => {
            if (!controller.signal.aborted) {
              observer.error(err);
            }
          });
        };

        push();

      }).catch(err => observer.error(err));

      return () => controller.abort();
    });
  }

  /**
   * Convierte un historial de mensajes de chat genérico a un formato compatible con Gemini.
   * Filtra los mensajes del rol 'Sistema' ya que el prompt del sistema se maneja directamente en el servicio.
   * @param messages Un array de mensajes con propiedades 'from' (ej. 'Tú', 'AI', 'Sistema') y 'message'.
   * @returns Un array de objetos GeminiMessage.
   */
  convertChatHistoryToGemini(messages: any[]): GeminiMessage[] {
    return messages
      .filter(msg => msg.from === 'Tú' || msg.from === 'AI') // Asegurar que solo los roles de usuario y modelo se incluyan
      .map(msg => ({
        role: msg.from === 'Tú' ? 'user' as const : 'model' as const, // 'Tú' -> user, cualquier otro (ej. 'AI') -> model
        parts: [{ text: msg.message }]
      }));
  }

  /**
   * Valida si la API Key de Gemini está configurada correctamente en el entorno.
   * @returns true si la API Key está configurada y no es el valor por defecto; false en caso contrario.
   */
  isApiKeyConfigured(): boolean {
    return Boolean(this.API_KEY && this.API_KEY !== 'YOUR_GEMINI_API_KEY');
  }
}
