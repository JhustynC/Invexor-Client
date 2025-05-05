import { Component, inject } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'progressbar-shared',
  imports: [],
  templateUrl: './progressbar.component.html',
})
export class ProgressbarComponent {
  isLoading = false;
  progressValue = 0;
  private interval: ReturnType<typeof setInterval> | undefined;
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.startLoading();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.completeLoading();
      }
    });
  }

  startLoading() {
    this.isLoading = true;
    this.progressValue = 0;
    this.interval = setInterval(() => {
      if (this.progressValue < 99) {
        this.progressValue += 1;
      } else {
        clearInterval(this.interval);
      }
    }, 500);
  }

  completeLoading() {
    clearInterval(this.interval);
    this.progressValue = 100;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
