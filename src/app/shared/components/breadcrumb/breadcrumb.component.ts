import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../data/services/shared/breadcrumb.service';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter } from 'rxjs';
interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  // breadcrumbs: Array<{ label: string; url: string }> = [];

  // constructor(private breadcrumbService: BreadcrumbService) { }

  // ngOnInit(): void {
  //   this.breadcrumbService.getBreadcrumbs().subscribe((breadcrumbs: any) => {
  //     this.breadcrumbs = breadcrumbs;
  //     console.log(this.breadcrumbs);
  //   });
  // }
  public breadcrumbs!: Breadcrumb[];

  /**
  /*.filter(event => event instanceof NavigationEnd)
 .distinctUntilChanged()
 .map(event =>  this.buildBreadCrumb(this.activatedRoute.root)); */

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('hello');
  }

  ngOnInit() {
    let breadcrumb: Breadcrumb = {
      label: 'Dashboard',
      url: '/',
    };
    console.log('xbcbxxb')

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      console.log(this.route);
      const root: ActivatedRoute = this.route.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
      this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
      console.log(this.breadcrumbs);
    });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';
    debugger;
    //get the child routes
    let children: ActivatedRoute[] = route.children;
    console.log(route);
    console.log(route.children);

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length == 0) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url,
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  // Helper method to check login status
  private isLoggedIn(): boolean {
    // Replace with your actual login check logic
    return !!localStorage.getItem('userToken');
  }

  // Helper method to check if the current page is an inner page
  private isInnerPage(url: string): boolean {
    // Define the prefix or condition for inner pages
    return url.startsWith('/dashboard');
  }
}

