import { Component, OnInit } from '@angular/core';
import { SidebarLayoutComponent } from './components/sidebar/sidebar-layout.component';
import { HeaderLayoutComponent } from './components/header/header-layout.component';
import { RouterOutlet } from '@angular/router';
import { ProgressbarComponent } from '../../shared/components/progressbar/progressbar.component';

//?CACHE

//!COMPONENT???

@Component({
  selector: 'invexor-layout',
  templateUrl: './invexor-layout.component.html',
  imports: [
    SidebarLayoutComponent,
    HeaderLayoutComponent,
    RouterOutlet,
    ProgressbarComponent,
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
  constructor() {}
}
