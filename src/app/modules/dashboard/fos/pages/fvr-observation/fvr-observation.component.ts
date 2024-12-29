import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IFvrDetail,
  IFVrHirer,
  IFvrLeadProspectDetail,
} from '../../../../../../core/interfaces/app/Fvr/IFvrModels';
import { FOSFvrService } from '../../../../../../data/services/feature/fvr/fvr.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-fvr-observation',
  templateUrl: './fvr-observation.component.html',
  styleUrl: './fvr-observation.component.scss',
})
export class FvrObservationComponent implements OnInit {
  public fvrObservationLeadForm: FormGroup | any = new FormGroup({});
  public fvrObservationDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  private loggedInUser: any = {};
  public houseAccessibilityLookup: IFOSLookup[] = [];
  public localityLookup: IFOSLookup[] = [];
  public houseTypeLookup: IFOSLookup[] = [];
  public flooringTypeLookup: IFOSLookup[] = [];
  public roofingTypeLookup: IFOSLookup[] = [];
  public livingStandardLookup: IFOSLookup[] = [];
  public entryPermissionLookup: IFOSLookup[] = [];
  public recommendationLookup: IFOSLookup[] = [];
  public earlierVisitLookup: IFOSLookup[] = [];
  public photographNoticedLookup: IFOSLookup[] = [];
  public furnitureLookup: IFOSLookup[] = [];
  private leadProspectDetail: IFvrLeadProspectDetail = {};
  public action: any;
  public buttonDisabled: boolean = false;
  public fieldVerificationId?: number;

  constructor(
    private fvrService: FOSFvrService,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private encryptionService: EncryptionService,
    private route: ActivatedRoute
  ) {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        // Decrypt data
        const decryptedUserData =
          this.encryptionService.decrypt(encryptedUserData);
        this.loggedInUser = decryptedUserData || '';
      }
    }
  }

  private initForm() {
    this.fvrObservationLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName: new FormControl(''),
    });

    this.fvrObservationDetailsForm = new FormGroup({
      houseAccessibility: new FormControl('', [Validators.required]),
      locality: new FormControl('', [Validators.required]),
      houseType: new FormControl('', [Validators.required]),
      flooringType: new FormControl('', [Validators.required]),
      roofingType: new FormControl('', [Validators.required]),
      livingStandard: new FormControl('', [Validators.required]),
      entryPermitted: new FormControl('', [Validators.required]),
      houseSize: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
      recommend: new FormControl('', [Validators.required]),
      earlierVisit: new FormControl('', [Validators.required]),
      politicalLeaderPhotograph: new FormControl('', [Validators.required]),
      verifierName: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      verifierId: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      branchName: new FormControl('', [Validators.required]),
      dateOfVisit: new FormControl('', [Validators.required]),
      assetInHouse: new FormControl('', [Validators.required]),
      hirerHousePhoto: new FormControl('', [Validators.required]),
    });
    this.getFvrLookup();
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.initForm();


    // this.route.queryParams.subscribe((params: Params) => {
    //   this.action = params;
    //   if (params['view'] == 'true') {
    //     this.fvrObservationLeadForm.disable();
    //     this.fvrObservationDetailsForm.disable();
    //     this.buttonDisabled = true;
    //   } else {
    //     this.fvrObservationLeadForm.disable();
    //     this.fvrObservationDetailsForm.enable();
    //     this.buttonDisabled = false;
    //   }
    //   let fvrDetails = JSON.parse(
    //     localStorage.getItem('fvrDetails')!
    //   ) as IFvrDetail;

    //   if (fvrDetails) {
    //     this.fieldVerificationId =
    //       fvrDetails.fvrHirerDetail?.fieldVerificationId!;
    //     if (fvrDetails) {
    //       this.bindHirerForm(fvrDetails!);
    //     }
    //   }
    // });
    // if (this.fvrDetail) {
    //   this.fieldVerificationId =
    //     this.fvrDetail.fvrHirerDetail?.fieldVerificationId!;
    //   if (this.fvrDetail) {
    //     this.bindHirerForm(this.fvrDetail!);
    //   }
    // }
    this.loaderService.hideLoader();
  }

  getFvrLookup() {
    this.loaderService.showLoader();
    this.fvrService
      .getFvrHirerLookup(this.loggedInUser.companyId, this.loggedInUser.userId)
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          if (data && data.message) {
            let lookItems = data.message as IFOSLookup[];
            localStorage.setItem('lookups', JSON.stringify(lookItems));
            this.setLookups(lookItems);
          }
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
        },
      });
  }

  private setLookups(lookItems: IFOSLookup[]) {
    this.houseAccessibilityLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 23
    );
    this.localityLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 24
    );
    this.flooringTypeLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 25
    );
    this.roofingTypeLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 26
    );
    this.livingStandardLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 27
    );
    this.earlierVisitLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 28
    );
    this.entryPermissionLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 28
    );
    this.recommendationLookup= lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 28
    );
    this.photographNoticedLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 28
    );
    this.houseTypeLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 14
    );
    this.furnitureLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 29
    );
  }

  bindHirerForm(hirerDetails: IFvrDetail) {
    this.fvrObservationLeadForm
      .get('leadNumber')!
      .setValue(hirerDetails!.fvrProspectDetail?.leadNumber);
    this.fvrObservationLeadForm
      .get('prospectName')!
      .setValue(hirerDetails!.fvrProspectDetail?.prospectName);
    this.fvrObservationLeadForm
      .get('vehicleNumber')!
      .setValue(hirerDetails!.fvrProspectDetail?.vehicleNumber);
    this.fvrObservationDetailsForm
      .get('houseAccessibility')!
      .setValue(hirerDetails!.fvrHirerDetail?.houseAccessibility);
    this.fvrObservationDetailsForm
      .get('locality')!
      .setValue(hirerDetails!.fvrHirerDetail?.localityId);
    this.fvrObservationDetailsForm
      .get('houseType')!
      .setValue(hirerDetails!.fvrHirerDetail?.houseType);
    this.fvrObservationDetailsForm
      .get('flooringType')!
      .setValue(hirerDetails!.fvrHirerDetail?.flooringType);
    this.fvrObservationDetailsForm
      .get('roofingType')!
      .setValue(hirerDetails!.fvrHirerDetail?.roofingType);
    this.fvrObservationDetailsForm
      .get('livingStandard')!
      .setValue(hirerDetails!.fvrHirerDetail?.livingType);
    this.fvrObservationDetailsForm
      .get('entryPermitted')!
      .setValue(hirerDetails!.fvrHirerDetail?.entryPermittedType);
    this.fvrObservationDetailsForm
      .get('houseSize')!
      .setValue(hirerDetails!.fvrHirerDetail?.houseArea);
    this.fvrObservationDetailsForm
      .get('landmark')!
      .setValue(hirerDetails!.fvrHirerDetail?.landMark);
    this.fvrObservationDetailsForm
      .get('recommend')!
      .setValue(hirerDetails!.fvrHirerDetail?.recommendation);
    this.fvrObservationDetailsForm
      .get('earlierVisit')!
      .setValue(hirerDetails!.fvrHirerDetail?.earlyVisitedType);
    this.fvrObservationDetailsForm
      .get('politicalLeaderPhotograph')!
      .setValue(hirerDetails!.fvrHirerDetail?.politicalAffiliation);
    this.fvrObservationDetailsForm
      .get('verifierName')!
      .setValue(hirerDetails!.fvrHirerDetail?.verifierName);
    this.fvrObservationDetailsForm
      .get('reason')!
      .setValue(hirerDetails!.fvrHirerDetail?.remarks);
    this.fvrObservationDetailsForm
      .get('verifierId')!
      .setValue(hirerDetails!.fvrHirerDetail?.verifierId);
    this.fvrObservationDetailsForm
      .get('time')!
      .setValue(hirerDetails!.fvrHirerDetail?.timeStamp);
    this.fvrObservationDetailsForm
      .get('branchName')!
      .setValue(hirerDetails!.fvrHirerDetail?.localityName);
    this.fvrObservationDetailsForm
      .get('dateOfVisit')!
      .setValue(hirerDetails!.fvrHirerDetail?.dateVisited);
  }

  submitForm() {
    this.loaderService.showLoader();
    const hirerDetails = this.fvrObservationDetailsForm.value;
    var fvrHirerDetails = {
      fvrProspectDetail: { prospectId: this.leadProspectDetail.prospectId },
      fvrHirerDetail: {
        verifierId: hirerDetails.verifierId,
        verifierName: hirerDetails.verifierName,
        visitedBy: hirerDetails.verifierName,
        dateVisited: hirerDetails.dateOfVisit,
        earlyVisitedType: hirerDetails.earlierVisit,
        entryPermittedType: hirerDetails.entryPermitted,
        flooringType: hirerDetails.flooringType,
        furnitures: [],
        houseAccessibility: hirerDetails.houseAccessibility,
        houseArea: hirerDetails.houseSize,
        houseType: hirerDetails.houseType,
        landMark: hirerDetails.landmark,
        livingType: hirerDetails.livingStandard,
        localityId: hirerDetails.locality,
        politicalAffiliation: hirerDetails.politicalLeaderPhotograph,
        prospectId: this.leadProspectDetail.prospectId,
        recommendation: hirerDetails.recommend,
        remarks: hirerDetails.reason,
        roofingType: hirerDetails.roofingType,
        timeStamp: hirerDetails.time,
        fieldVerificationId: this.fieldVerificationId,
      } as IFVrHirer,
    } as IFvrDetail;

    this.fvrService
      .addFvrHirerDetail(
        this.loggedInUser.companyid,
        this.leadProspectDetail.leadId!,
        fvrHirerDetails
      )
      .subscribe({
        next: (data: any) => {
          this.toasterService.success(
            data.message,
            'Update Fvr Hirer Details',
            {
              timeOut: 3000,
            }
          );
          this.loaderService.hideLoader();
          this.initForm();
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          let errorMessages = error.message.split('|');
          for (const key in errorMessages) {
            this.toasterService.error(errorMessages[key], 'Error', {
              timeOut: 2000,
            });
          }
        },
      });
  }

  clear() {
    //this.fvrHirerLeadForm.reset();
  }
}
