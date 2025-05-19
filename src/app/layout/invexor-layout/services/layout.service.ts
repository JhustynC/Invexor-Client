import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private scrollSubject = new BehaviorSubject<boolean>(false);
  scroll$ = this.scrollSubject.asObservable();

  bloquearScroll() {
    this.scrollSubject.next(true);
  }

  permitirScroll() {
    this.scrollSubject.next(false);
  }
}
