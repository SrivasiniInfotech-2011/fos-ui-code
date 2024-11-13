import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';
import { GlobalErrorHandlingService } from '../../data/services/shared/global-error-handling.service';

@Injectable()
export class FOSErrorInterceptor implements HttpInterceptor {
  constructor(private globalErrorHandlingService: GlobalErrorHandlingService) { }

  /**
   * Intercepts the HTTP request to check for errors and treat them
   * @param req The request to be handled
   * @param next The next handler in the chain
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.globalErrorHandlingService.handleError(error);
        return throwError(() => error);
      })
    )
  }
}
