import {createReducer, on} from "@ngrx/store";
import {loginApiActions} from "../actions/fos-login-actions";
import {globalState} from "../globalState";

/*
*  Reducer for login and storing the user Auth
*  @params - data<IUserAuth> - Stores user auth information
* */
export const logInReducer = createReducer(
  globalState.userAuth,
  on(loginApiActions,(state, userAuth) =>({
    ...state,
    sessionDate: userAuth.user.sessionDate,
    sessionExpireDate:userAuth.user.sessionExpireDate,
    accessToken: userAuth.user.accessToken,
    loginName: userAuth.user.loginName,
    fullName: userAuth.user.fullName,
    securityProfile: userAuth.user.securityProfile,
    config: userAuth.user.config,
    isAuthenticated: userAuth.user.isAuthenticated
  }))
)
