import {IFOSCCGlobalState} from "../interfaces/store/IFOSCCGlobalState";
import {ISecurityProfile, IUserConfig} from "../interfaces/user-auth";
import {getPages} from "../common/page";
import {
  IFOSMyRequestConfig,
  IFOSRequestInterestedPartyConfig,
  IFOSRequestTabConfig,
  IFOSUserConfig
} from "../interfaces/store/IFOSConfig";
// import {IFOSCcRequest} from "../interfaces/app/request/IFOSModels";

/*
* Global State object of the Application
* */
export const globalState: IFOSCCGlobalState = {
  userAuth : {
    sessionDate: 0,
    sessionExpireDate: 0,
    accessToken: '',
    loginName: '',
    fullName: '',
    securityProfile: {} as ISecurityProfile,
    config: {} as IUserConfig,
    isAuthenticated: false
  },
  pages:getPages(),
  config:{
    myRequest: {} as IFOSMyRequestConfig,
    request: {} as IFOSRequestTabConfig,
    ccRequestInterestedParty: {} as IFOSRequestInterestedPartyConfig
  },
  userConfig:{
    userSettings:{
      myRequests:{
        tableSettings:[]
      }
    }
  } as IFOSUserConfig,
  conflictsCheckRequest:{} as any //IFOSCcRequest
};
