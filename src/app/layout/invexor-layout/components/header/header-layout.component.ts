import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-layout',
  templateUrl: './header-layout.component.html',
  imports: [RouterLink]
})
export class HeaderLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
  