import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'chat-message',
  imports: [],
  templateUrl: './chat-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  from = input.required<string>();
  time = input.required<string>();
  message = input.required<string>();
  messageState? = input<'Seen' | 'Delivered' | 'Pending' | ''>('Delivered');
  side = input.required<'start' | 'end'>();
}
