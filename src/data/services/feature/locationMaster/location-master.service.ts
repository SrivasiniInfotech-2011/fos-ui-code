import { Injectable } from '@angular/core';
import {FOSBaseWrapperService} from "../../shared/fos-basewrapper.service";
import {UtilsService} from "../../shared/utils.service";
import { FOSErrorhandlingService } from "../../shared/fos-error-handling.service";
import { environment } from "../../../../environments/environment";
import {FOSApiEndPoints, FOSCCMicroApiDomain} from "../../../../core/common/literals";
import { IHierarchyLookup,InsertLocationMaster,ICorporateLookup,GetEXistingLocationMasterDetails} from '../../../../core/interfaces/app/request/IFOSModels';
import {catchError, Observable, take, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LocationMasterService {

   /**
     * Constructor to initialize the dependencies
     * @param hlBaseWrapper
     * @param utilsService
     */
   
      
      constructor(private fosBaseWrapper: FOSBaseWrapperService,
        private utilsService: UtilsService,
        public fosErrorHandler: FOSErrorhandlingService) {
  }



  /**
     * Method to fetch the Hierarchy Lookup.
     * @param data
     */
  fetchHierarchyLookup(data:IHierarchyLookup): Observable<any>{
    let endPoint = this.utilsService.buildApiEndpoint(environment.apiBaseUrl,FOSApiEndPoints.LocationMaster.GET_HIERARCHY_LOOKUP);
    if(endPoint.trim()){
    }
    return this.fosBaseWrapper
    .post<any,IHierarchyLookup>(endPoint,data)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  };

  /**
     * Method to fetch the Hierarchy Lookup.
     * @param data
     */
  fetchCorporateLookup(data:ICorporateLookup): Observable<any>{
    let endPoint = this.utilsService.buildApiEndpoint(environment.apiBaseUrl,FOSApiEndPoints.LocationMaster.GET_LOCATION_CORPORATE_DETAILS);
    if(endPoint.trim()){
    }
    return this.fosBaseWrapper
    .post<any,ICorporateLookup>(endPoint,data)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  };


  
  insertLocationMasterDeytails(data:InsertLocationMaster): Observable<any>{
    let endPoint = this.utilsService.buildApiEndpoint(environment.apiBaseUrl,FOSApiEndPoints.LocationMaster.INSERT_LOCATION_MASTER_DETAILS);
    if(endPoint.trim()){
    }
    return this.fosBaseWrapper
    .post<any,InsertLocationMaster>(endPoint,data)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  };


  GetLocationMasterDetails(data:GetEXistingLocationMasterDetails): Observable<any>{
    let endPoint = this.utilsService.buildApiEndpoint(environment.apiBaseUrl,FOSApiEndPoints.LocationMaster.GET_LOCATION_MASTER_DETAILS);
    if(endPoint.trim()){
    }
    return this.fosBaseWrapper
    .post<any,GetEXistingLocationMasterDetails>(endPoint,data)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  };
}
