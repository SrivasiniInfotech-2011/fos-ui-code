import {IUserAuth} from "../user-auth";
import IFOSPageState from "./IFOSPageState";
import {IFOSConfigStore, IFOSUserConfig} from "./IFOSConfig";
import {IFOSCcRequest} from "../app/request/IFOSModels";

/*
* Interface for Global State
* */
export interface IFOSCCGlobalState {
  userAuth: IUserAuth;
  pages: IFOSPageState[];
  config: IFOSConfigStore;
  userConfig:IFOSUserConfig;
  conflictsCheckRequest:IFOSCcRequest;
}
