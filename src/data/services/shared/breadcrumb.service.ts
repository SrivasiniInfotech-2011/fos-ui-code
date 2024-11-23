import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Array<{ label: string; url: string }>>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.next(breadcrumbs);
      });
  }

  getBreadcrumbs(): Observable<Array<{ label: string; url: string }>> {
    return this.breadcrumbs.asObservable();
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Array<{ label: string; url: string }> = []): Array<{ label: string; url: string }> {
    const routeData = route.data;
    const routePath = route.url.map((segment) => segment.path).join('/');

    if (routeData['breadcrumb']) {
      url += `/${routePath}`;
      breadcrumbs.push({ label: routeData['breadcrumb'], url });
    }

    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
