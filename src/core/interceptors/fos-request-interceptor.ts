import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, tap} from 'rxjs';
import {Store} from "@ngrx/store";
import {IUserAuth} from "../interfaces/user-auth";

@Injectable()
/**
 * Interceptor for Requests
 */
export class FOSRequestInterceptor implements HttpInterceptor {
  userAuth : IUserAuth = {} as IUserAuth;

  /**
   * Constructor to initialize the dependencies
   * @param router
   * @param userAuthStore
   */
  constructor(
    private router: Router
  ) {
    // this.userAuthStore.select(user => user.login).subscribe(data =>{
    //   this.userAuth = {...{},...data};
    // });
  }

  /**
   * Intercepts the HTTP request to add the bearer token to headers
   * @param req The request to be handled
   * @param next The next handler in the chain
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders();
    let accessToken: string = "";
    if (this.userAuth.accessToken) {
      accessToken = this.userAuth.accessToken;
    }
    httpHeaders = httpHeaders.append(
        'Authorization',
        `Bearer ${accessToken}`
    );
    const httpReq = req.clone({
      headers: httpHeaders,
    });
    return next.handle(httpReq).pipe(
      tap(
        (httpEvent: HttpEvent<any>) => {
          if (httpEvent.type == 4) {
            // TODO: For debugging purpose
          }
        },
        (httpError: HttpErrorResponse) => {
          if (
            (httpError && httpError.status == 401) ||
            httpError.status == 403
          ) {
            this.router.navigate(['/access-denied']);
          }
        }
      )
    );
  }
}
