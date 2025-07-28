import { AfterViewInit, signal, inject } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { GeminiService } from '../../services/gemini.service';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface ChatMessage {
  from: string;
  message: string | SafeHtml;
  time: string;
  side: 'start' | 'end';
}

@Component({
  selector: 'chatbot',
  imports: [FormsModule, ChatMessageComponent, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChatbotComponent implements AfterViewInit {
  private geminiService = inject(GeminiService);
  private navigationService = inject(NavigationService);
  private sanitizer = inject(DomSanitizer);

  message = signal<string>('');
  messages: ChatMessage[] = [];
  isLoading = signal<boolean>(false);
  isApiConfigured = signal<boolean>(false);

  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLElement>;

  constructor() {
    // Configurar función global para navegación desde HTML inmediatamente
    (window as any).navigateToPage = (route: string) => {
      this.navigationService.navigateToPage(route);
    };
  }

  ngAfterViewInit(): void {
    this.chatMessages.nativeElement.classList.add('hidden');
    
    // Verificar si la API de Gemini está configurada
    this.isApiConfigured.set(this.geminiService.isApiKeyConfigured());
    
    // Mensaje de bienvenida
    this.addWelcomeMessage();
  }

  private addWelcomeMessage(): void {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    let welcomeMessage: string;
    let fromUser: string;

    if (this.isApiConfigured()) {
      fromUser = 'Invexor AI';
      welcomeMessage = '¡Hola! Soy tu asistente virtual de Invexor. Estoy aquí para ayudarte con cualquier consulta sobre el sistema. ¿En qué puedo asistirte? [NAVEGAR:dashboard]';
    } else {
      fromUser = 'Sistema';
      welcomeMessage = '⚠️ API de Gemini no configurada. El chatbot funcionará con respuestas predeterminadas. Puedes ir al [NAVEGAR:dashboard] para explorar el sistema.';
    }

    // Procesar comandos de navegación en el mensaje de bienvenida
    const processedMessage = this.navigationService.processNavigationCommands(welcomeMessage);
    
    // Sanitizar el HTML para permitir botones seguros
    const safeMessage = this.sanitizer.bypassSecurityTrustHtml(processedMessage);

    this.messages.push({
      from: fromUser,
      message: safeMessage,
      time,
      side: 'start',
    });
  }

  openChatbot() {
    if (this.chatMessages.nativeElement.classList.contains('hidden')) {
      this.chatMessages.nativeElement.classList.remove('hidden');
      return;
    }
    this.chatMessages.nativeElement.classList.add('hidden');
  }

  sendMessage() {
    if (!this.message().trim() || this.isLoading()) return;

    const userMessage = this.message().trim();
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Agregar mensaje del usuario
    this.messages.push({
      from: 'Tú',
      message: userMessage,
      time,
      side: 'end',
    });

    this.message.set('');
    setTimeout(() => this.scrollToBottom(), 100);

    // Mostrar indicador de carga
    this.isLoading.set(true);
    this.addTypingIndicator();

    if (this.isApiConfigured()) {
      // Usar Gemini AI
      this.sendToGemini(userMessage);
    } else {
      // Usar respuestas predeterminadas
      this.sendFallbackResponse();
    }
  }

  private sendToGemini(userMessage: string): void {
    this.removeTypingIndicator(); // Quitar "Escribiendo..." al iniciar el stream
    const history = this.geminiService.convertChatHistoryToGemini(this.messages.slice(1, -1));

    const botMessage: ChatMessage = {
      from: 'Invexor AI',
      message: '', // Inicia vacío
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      side: 'start',
    };
    this.messages.push(botMessage);

    let fullResponse = '';
    this.geminiService.sendMessage(userMessage, history).subscribe({
      next: (chunk) => {
        fullResponse += chunk;
        this.messages[this.messages.length - 1].message = fullResponse;
        this.scrollToBottom();
      },
      error: (error) => {
        this.messages[this.messages.length - 1].message = `Error: ${error.message}`;
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
        const finalMessage = this.messages[this.messages.length - 1];
        this.processBotResponse(finalMessage);
      }
    });
  }

  private processBotResponse(botMessage: ChatMessage): void {
    if (typeof botMessage.message === 'string') {
      const processedMessage = this.navigationService.processNavigationCommands(botMessage.message);
      botMessage.message = this.sanitizer.bypassSecurityTrustHtml(processedMessage);
      // Forzar la detección de cambios si es necesario, aunque la asignación directa debería funcionar
      this.messages = [...this.messages];
    }
  }

  private sendFallbackResponse(): void {
    setTimeout(() => {
      this.removeTypingIndicator();
      this.addBotResponse(this.getRandomBotMessage(), 'Bot');
      this.isLoading.set(false);
    }, 1500);
  }

  private addBotResponse(message: string, from: string): void {
    this.removeTypingIndicator();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const processedMessage = this.navigationService.processNavigationCommands(message);
    const safeMessage = this.sanitizer.bypassSecurityTrustHtml(processedMessage);

    this.messages.push({
      from,
      message: safeMessage,
      time,
      side: 'start',
    });

    setTimeout(() => this.scrollToBottom(), 100);
  }

  private addTypingIndicator(): void {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    this.messages.push({
      from: 'typing-indicator',
      message: 'Escribiendo...',
      time,
      side: 'start',
    });

    setTimeout(() => this.scrollToBottom(), 100);
  }

  private removeTypingIndicator(): void {
    const typingIndex = this.messages.findIndex(msg => msg.from === 'typing-indicator');
    if (typingIndex !== -1) {
      this.messages.splice(typingIndex, 1);
    }
  }

  scrollToBottom() {
    try {
      const div = this.chatMessages.nativeElement;
      div.scrollTop = div.scrollHeight;
    } catch (err) {}
  }

  getRandomBotMessage(): string {
    const botMessages = [
      '¡Hola! Puedo ayudarte a navegar por Invexor. ¿Qué necesitas?',
      'Ve tu resumen general aquí: [NAVEGAR:dashboard]',
      'Revisa tus transacciones: [NAVEGAR:transactions]',
      'Gestiona tu inventario: [NAVEGAR:items]',
      'Administra recursos: [NAVEGAR:resources]',
      'Genera reportes: [NAVEGAR:reports]',
      'Explora relaciones: [NAVEGAR:mashup]',
      'Gestiona usuarios: [NAVEGAR:users]',
      'Configura áreas: [NAVEGAR:areas]',
      'Administra sucursales: [NAVEGAR:branches]',
      '¿Necesitas ir a alguna sección específica?',
      'Puedo guiarte a cualquier parte del sistema.',
      '¿Te ayudo con la navegación?',
      'Dime qué buscas y te llevo allí.',
      'Estoy aquí para facilitar tu navegación.',
    ];

    const index = Math.floor(Math.random() * botMessages.length);
    return botMessages[index];
  }
}
