import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'header-layout',
  templateUrl: './header-layout.component.html',
  imports: [RouterLink, TitleCasePipe],
})
export class HeaderLayoutComponent implements OnInit {
  currentTitle = input<string>('hola');

  constructor() {}

  ngOnInit() {}
}
