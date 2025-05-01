import { Component, OnInit } from '@angular/core';
import { SidebarLayoutComponent } from './components/sidebar/sidebar-layout.component';
import { HeaderLayoutComponent } from './components/header/header-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'invexor-layout',
  templateUrl: './invexor-layout.component.html',
  imports: [SidebarLayoutComponent, HeaderLayoutComponent, RouterOutlet],
})
export default class InvexorLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
