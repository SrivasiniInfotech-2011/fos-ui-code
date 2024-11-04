import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../../data/services/shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) {}

  /**
   * Check conditions to allow route activation
   * @param route
   * @param state
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.userService.getUser();
    if (user && user.sessionExpireDate) {
      const currentDate = new Date().getTime().toString();
      const currentDateWithoutMilliseconds = parseInt(
        currentDate.substring(0, currentDate.length - 3)
      );
      if (currentDateWithoutMilliseconds < user.sessionExpireDate) {
        return true;
      }
    }
    return new Observable((observer) => {
      // this.oidcService.isLoggedIn().then(async (authenticated: boolean) => {
      //   if (authenticated) {
      //     observer.next(this.doCanActivate(route, state));
      //     return;
      //   }
      //   await this.authService.authenticate(
      //     route.url.toString(),
      //     route.queryParams
      //   );
      //   observer.next(false);
      // });
    });
  }

  /**
   * Process authentication and redirect on route activation
   * @param route
   * @param state
   * @returns
   */
  private doCanActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // this.authService
    //   .completeAuthentication({
    //     redirectUrl: route.url.toString(),
    //     queryParams: route.queryParams,
    //   })
    //   .catch(throwError);
    return true;
  }
}
