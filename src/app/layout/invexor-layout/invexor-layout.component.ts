import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarLayoutComponent } from './components/sidebar/sidebar-layout.component';
import { HeaderLayoutComponent } from './components/header/header-layout.component';
import { RouterOutlet } from '@angular/router';
import { ProgressbarComponent } from '../../shared/components/progressbar/progressbar.component';
import { ChatbotComponent } from '../../feature/chatbot/components/chatbot/chatbot.component';
import { LayoutService } from './services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'invexor-layout',
  templateUrl: './invexor-layout.component.html',
  imports: [
    SidebarLayoutComponent,
    HeaderLayoutComponent,
    RouterOutlet,
    ProgressbarComponent,
    ChatbotComponent,
    CommonModule,
  ],
  styles: `

  .responsive-padding{
    padding-bottom: 0px;
  }
  @media (width <= 800px) {
    .responsive-padding{
      padding-bottom: 60px;
    }
  }
  `,
})
export default class InvexorLayoutComponent {
  scrollBloqueado = false;
  constructor(private ui: LayoutService) {
    this.ui.scroll$.subscribe((valor) => (this.scrollBloqueado = valor));
  }

  @HostListener('window:beforeunload', ['$event'])
  updateView() {
    window.dispatchEvent(new Event('resize'));
  }
}
