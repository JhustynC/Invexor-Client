import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'enter-img',
  imports: [],
  templateUrl: './enter-img.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterImgComponent {
  //TODO: Change the delete image button implementation for when we will use a backend service
  previewUrl = signal<string | ArrayBuffer | null>(null);
  previewUrlOutput = output<string | ArrayBuffer | null>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl.set(reader.result);
      };
      reader.readAsDataURL(file);
    }
    this.previewUrlOutput.emit(this.previewUrl());
  }
}
