import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css'],
  imports: [RouterLink, RouterLinkActive],
})
export class SidebarLayoutComponent {
  currentOptionTitle = output<string>();

  currentOptionTitleFn(value: string) {
    this.currentOptionTitle.emit(value);
  }

  //TODO: Create a MenuOption Component and Interface to make the sidebar dyanmic

  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;
  @ViewChild('toggleBtn') toggleButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('#toggleTheme') toggleTheme!: ElementRef<HTMLButtonElement>;

  //? Para forzar el repitando de la pantalla yq que el alyout no se desfase
  cdr = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    this.cdr.detectChanges(); // fuerza actualización de bindings y layout
  }

  //? Saber cuando existe un evento de resize en la pantalla HostListener
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    //* Para cerrar o abrir el sidebar
    if (
      window.innerWidth <= 800 &&
      this.sidebar?.nativeElement.classList.contains('close')
    ) {
      this.sidebar?.nativeElement.classList.toggle('close');
      this.toggleButton?.nativeElement.classList.toggle('rotate');
    }
  }

  public toggleSidebar() {
    this.sidebar?.nativeElement.classList.toggle('close');
    this.toggleButton?.nativeElement.classList.toggle('rotate');
    // this.toggleButton?.nativeElement.classList.toggle('tooltip');
    // this.toggleButton?.nativeElement.classList.toggle('tooltip tooltip-right');

    this.closeAllSubMenus();

    //! To force a rezise event to make the main content responsive
    window.dispatchEvent(new Event('resize'));
  }

  public toggleSubMenu(button: HTMLElement) {
    if (!button.nextElementSibling?.classList.contains('show')) {
      this.closeAllSubMenus();
    }

    button.nextElementSibling?.classList.toggle('show');
    button.classList.toggle('rotate');

    if (this.sidebar?.nativeElement.classList.contains('close')) {
      this.sidebar?.nativeElement.classList.toggle('close');
      this.toggleButton?.nativeElement.classList.toggle('rotate');
    }
  }

  public closeAllSubMenus() {
    Array.from(
      this.sidebar!.nativeElement.getElementsByClassName('show')
    ).forEach((ul) => {
      ul.classList.remove('show');
      ul.previousElementSibling!.classList.remove('rotate');
    });
  }
}
