import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import {
  FOSApiEndPoints,
  FOSPermissions,
  FOSRoles,
} from '../../../core/common/literals';
import { IUserAuth } from '../../../core/interfaces/user-auth';
import { UserMapper } from '../../mappers/user-mapper';
import { Store } from '@ngrx/store';
import { UtilsService } from './utils.service';
import { FOSBaseWrapperService } from './fos-basewrapper.service';
import { FOSErrorhandlingService } from './fos-error-handling.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Service provider to deal with User Service
 */
export class UserService {
  private _userSubject: BehaviorSubject<IUserAuth> =
    new BehaviorSubject<IUserAuth>(null as any);
  user$: Observable<IUserAuth> = this.store.select((state) => state.login);

  constructor(
    private fosBaseWrapper: FOSBaseWrapperService,
    private utilService: UtilsService,
    private userMapper: UserMapper,
    private store: Store<{ login: IUserAuth }>,
    public fosErrorHandler: FOSErrorhandlingService
  ) {}

  /**
   * Init the user information.
   *
   * @param user UserAuth object to init.
   *
   */
  init(user: IUserAuth) {
    this.mapUser(user)
      .pipe(
        catchError((err) => throwError(() => new Error(err))),
        tap((user) => this._userSubject.next(user))
      )
      .subscribe();
  }

  /**
   * Map user using the userMapper information.
   */
  mapUser(user: IUserAuth): Observable<IUserAuth> {
    return of(user).pipe(map(this.userMapper.map));
  }

  /**
   * Recover the user information.
   */
  getUser(): IUserAuth {
    return this._userSubject.value;
  }

  /**
   * Check if the user is a system administrator
   */
  isSystemAdministrator(): boolean {
    return (
      this.getUser()?.securityProfile.role.Roles[0].RoleId ==
      FOSRoles.SYSTEM_ADMINISTRATOR
    );
  }

  authenticateUser(userName: string, password: string): Observable<any> {
    // this.hlLoaderService.showLoader();
    let endPoint: string = this.utilService.buildApiEndpoint(
      null,
      FOSApiEndPoints.USER_LOGIN_API,
      ''
    );
    if (!endPoint.trim()) {
      //Todo - Need to use Translation Service to display the translated message
      // this.hlToastService.displayToast(HLToastSeverity.ERROR,"","" );
    }

    return this.fosBaseWrapper
      .post<any, any>(endPoint, {
        userName: userName,
        password: password,
      })
      .pipe(
        catchError((error) => {
          this.fosErrorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  getSideBarData(userId:any): Observable<any> {
    let endPoint: string = this.utilService.buildApiEndpoint(
      null,
      FOSApiEndPoints.SIDEBAR_API.replace('{userId}', userId),
      ''
    );
    return this.fosBaseWrapper
      .get(endPoint)
      .pipe(
        catchError((error) => {
          this.fosErrorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }
}
