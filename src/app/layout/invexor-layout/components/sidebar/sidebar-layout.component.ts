import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css'],
})
export class SidebarLayoutComponent {

  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;
  @ViewChild('toggleBtn') toggleButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('#toggleTheme') toggleTheme!: ElementRef<HTMLButtonElement>;

  // Método alternativo usando HostListener
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
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
