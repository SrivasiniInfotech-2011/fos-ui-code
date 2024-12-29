import { FOSBaseWrapperService } from '../../shared/fos-basewrapper.service';
import { UtilsService } from '../../shared/utils.service';
import {
  ICustomerProspectData,
  ICustomerProspectRequest,
} from '../../../../core/interfaces/app/request/IFOSModels';
import {
  FOSApiEndPoints,
  FOSCCMicroApiDomain,
} from '../../../../core/common/literals';
import { catchError, Observable, take, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { FOSErrorhandlingService } from '../../shared/fos-error-handling.service';
import { environment } from '../../../../environments/environment';
import {
  IFvrAssetDetail,
  IFvrDetail,
  IFvrDocument,
  IFVrHirer,
  IFvrLeadProspectDetail,
  IFvrNeighbourHood,
} from '../../../../core/interfaces/app/fvr/IFvrModel';

@Injectable({
  providedIn: 'root',
})

/**
 * Service class for Request
 */
export class FOSFvrService {
  /**
   * Constructor to initialize the dependencies
   * @param hlBaseWrapper
   * @param utilsService
   */
  constructor(
    private fosBaseWrapper: FOSBaseWrapperService,
    private utilsService: UtilsService,
    public fosErrorHandler: FOSErrorhandlingService
  ) {}

  /**
   * Method to fetch the Fvr Hirer Lookup..
   */
  getFvrHirerLookup(companyId: number, userId: number): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.GET_FVR_HIRER_LOOKUP.replace(
        '{companyId}',
        String(companyId)
      ).replace('{userId}', String(userId))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.get(endPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Method to fetch the Fvr Asset Lookup.
   */
  getFvrAssetLookup(companyId: number, userId: number): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.GET_FVR_ASSET_LOOKUP.replace(
        '{companyId}',
        String(companyId)
      ).replace('{userId}', String(userId))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.get(endPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Method to fetch the Fvr Neighbourhood Lookup.
   */
  getFvrNeighbourLookup(companyId: number, userId: number): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.GET_FVR_NEIGHBOUR_LOOKUP.replace(
        '{companyId}',
        String(companyId)
      ).replace('{userId}', String(userId))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.get(endPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Method to fetch the Prospect Lookup.
   */
  getFvrNeighbourHoodDetails(
    companyId: number,
    userId: number,
    leadId: number,
    fieldVerificationId: number
  ): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.GET_FVR_NEIGHBOURHOOD_DETAILS.replace(
        '{companyId}',
        String(companyId)
      )
        .replace('{userId}', String(userId))
        .replace('{leadId}', String(leadId))
        .replace('{fieldVerificationId}', String(fieldVerificationId))
    );

    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.get(endPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Method to fetch the Prospect Lookup.
   */
  getLeadAssetDetails(
    companyId: number,
    userId: number,
    leadNumber: string,
    vehicleNumber: string
  ): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.GET_LEAD_ASSET_DETAILS.replace(
        '{companyId}',
        String(companyId)
      )
        .replace('{userId}', String(userId))
        .replace('{leadNumber}', String(leadNumber))
        .replace('{vehicleNumber}', String(vehicleNumber))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.get(endPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Method to fetch the Prospect Lookup.
   */
  getLeadHirerDetails(
    companyId: number,
    userId: number,
    mode: string,
    leadNumber: string,
    vehicleNumber: string
  ): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.GET_LEAD_HIRER_DETAILS.replace(
        '{companyId}',
        String(companyId)
      )
        .replace('{userId}', String(userId))
        .replace('{mode}', String(mode))
        .replace('{leadNumber}', String(leadNumber))
        .replace('{vehicleNumber}', String(vehicleNumber))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.get(endPoint).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  addFvrHirerDetail(
    companyId: number,
    leadId: number,
    fvrDetail: IFvrDetail
  ): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.POST_FVR_HIRER_DETAILS.replace(
        '{companyId}',
        String(companyId)
      ).replace('{userId}', String(leadId))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper.post<any, IFvrDetail>(endPoint, fvrDetail).pipe(
      catchError((error) => {
        this.fosErrorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  addFvrAssetDetail(
    companyId: number,
    userId: number,
    leadId: number,
    fvrDetail: IFvrAssetDetail
  ): Observable<any> {
    let endPoint = this.utilsService.buildApiEndpoint(
      environment.prospectsApi,
      FOSApiEndPoints.Fvr.POST_FVR_ASSET_DETAILS.replace(
        '{companyId}',
        String(companyId)
      )
        .replace('{userId}', String(userId))
        .replace('{leadId}', String(leadId))
    );
    if (endPoint.trim()) {
      //this.translate.instant('services.configuration'),this.translate.instant('services.errorLoading'); -- Todo - Need to check this
    }
    return this.fosBaseWrapper
      .post<any, IFvrAssetDetail>(endPoint, fvrDetail)
      .pipe(
        catchError((error) => {
          this.fosErrorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }
}
