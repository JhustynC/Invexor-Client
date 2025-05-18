import { AfterViewInit, signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

export interface ChatMessage {
  from: string;
  message: string;
  time: string;
  side: 'start' | 'end';
}

@Component({
  selector: 'chatbot',
  imports: [FormsModule, ChatMessageComponent],
  templateUrl: './chatbot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotComponent implements AfterViewInit {
  //TODO: Fix scroll to bottom

  message = signal<string>('');
  messages: ChatMessage[] = [];

  @ViewChild('chatMessages') chatMessages!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.chatMessages.nativeElement.classList.add('hidden');
  }

  openChatbot() {
    if (this.chatMessages.nativeElement.classList.contains('hidden')) {
      this.chatMessages.nativeElement.classList.remove('hidden');
      return;
    }
    this.chatMessages.nativeElement.classList.add('hidden');
  }

  sendMessage() {
    if (!this.message().trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Mensaje del usuario
    this.messages.push({
      from: 'Tú',
      message: this.message(),
      time,
      side: 'end',
    });

    const userMessage = this.message;
    this.message.set('');

    setTimeout(() => this.scrollToBottom(), 100);

    // Respuesta automática del bot
    setTimeout(() => {
      const botReply = this.getRandomBotMessage();
      const botTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      this.messages.push({
        from: 'Bot',
        message: botReply,
        time: botTime,
        side: 'start',
      });

      setTimeout(() => this.scrollToBottom(), 100);
    }, 1000); // 1 segundo después
  }

  scrollToBottom() {
    try {
      const div = this.chatMessages.nativeElement;
      div.scrollTop = div.scrollHeight;
    } catch (err) {}
  }

  getRandomBotMessage(): string {
    const botMessages = [
      'Hola, ¿en qué puedo ayudarte?',
      'Estoy aquí para asistirte con tus dudas.',
      '¿Podrías repetir eso? No lo entendí bien.',
      'Interesante, cuéntame más.',
      'Claro, eso tiene sentido.',
      'Gracias por tu mensaje, lo estoy procesando.',
      'Estoy aprendiendo constantemente, gracias a ti.',
      '¿Deseas ayuda con algo técnico o personal?',
      '¡Qué gusto tener esta conversación contigo!',
      'Estoy aquí 24/7 por si me necesitas.',
      'Hmm... déjame pensarlo un segundo.',
      '¿Te gustaría saber más sobre Angular?',
      '¡Buen punto! Lo consideraré.',
      '¿Estás trabajando en algún proyecto interesante?',
      '¡Eso suena genial!',
    ];

    const index = Math.floor(Math.random() * botMessages.length);
    return botMessages[index];
  }
}
