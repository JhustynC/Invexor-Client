import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, input, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'header-layout',
  templateUrl: './header-layout.component.html',
  imports: [RouterLink, TitleCasePipe],
})
export class HeaderLayoutComponent implements OnInit {
  currentTitle = input<string | null>(null);
  breadcrumbs: Breadcrumb[] = [];
  
  // Inyectar AuthService
  private authService = inject(AuthService);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
      });

    // 👇 Esto se ejecuta en la primera carga
    this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  // Métodos para acceder a información de la sesión
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  getSessionTimeRemaining(): number {
    return this.authService.getSessionTimeRemaining();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  extendSession(): void {
    this.authService.extendSession();
  }
}
