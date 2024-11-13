import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.url.subscribe((url) => {
      if (url[0]?.path === 'login') {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true
      }
    })

  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
