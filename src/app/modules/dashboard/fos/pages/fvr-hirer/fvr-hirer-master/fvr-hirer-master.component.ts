import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FOSFvrService } from '../../../../../../../data/services/feature/fvr/fvr.service';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import {
  IFvrDetail,
  IFVrHirer,
  IFvrLeadProspectDetail,
} from '../../../../../../../core/interfaces/app/fvr/IFvrModel';
import { FvrObservationComponent } from '../../fvr-observation/fvr-observation.component';
import { IFvrNeighbourHood } from '../../../../../../../core/interfaces/app/Fvr/IFvrModels';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fvr-hirer-master',
  templateUrl: './fvr-hirer-master.component.html',
  styleUrl: './fvr-hirer-master.component.scss',
})
export class FvrHirerMasterComponent implements OnInit {
  public fvrHirerLeadForm: FormGroup | any = new FormGroup({});
  public prospectDetailsForm: FormGroup | any = new FormGroup({});
  public fvrObservationLeadForm: FormGroup | any = new FormGroup({});
  public fvrObservationDetailsForm: FormGroup | any = new FormGroup({});
  public fvrNeighbourLeadForm: FormGroup | any = new FormGroup({});
  public fvrNeighbourDetailsForm: FormGroup | any = new FormGroup({});
  private loggedInUser: any = {};
  public isSubmitted: boolean = false;
  public houseAccessibilityLookup: IFOSLookup[] = [];
  public localityLookup: IFOSLookup[] = [];
  public houseTypeLookup: IFOSLookup[] = [];
  public flooringTypeLookup: IFOSLookup[] = [];
  public roofingTypeLookup: IFOSLookup[] = [];
  public livingStandardLookup: IFOSLookup[] = [];
  public defaultLookup: IFOSLookup[] = [];
  public houseOwnershipLookup: IFOSLookup[] = [];
  public residenceSubtypeLookup: IFOSLookup[] = [];
  public houseStatusLookup: IFOSLookup[] = [];
  constructor(
    private fvrService: FOSFvrService,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        // Decrypt data
        const decryptedUserData =
          this.encryptionService.decrypt(encryptedUserData);
        this.loggedInUser = decryptedUserData || '';
      }
    }
    this.GenerateFvrForm();
    this.prospectDetailsForm.disable();
    this.fvrObservationLeadForm.disable();
    this.fvrObservationDetailsForm.disable();
    this.fvrNeighbourLeadForm.disable();
    this.fvrNeighbourDetailsForm.disable();
  }

  fetchFvrDetails() {
    this.loaderService.showLoader();
    this.isSubmitted = true;
    if (
      this.fvrHirerLeadForm.get('leadNumber')?.valid ||
      this.fvrHirerLeadForm.get('vehicleNumber')?.valid
    ) {
      this.loaderService.showLoader();
      this.fvrService
        .getLeadHirerDetails(
          this.loggedInUser.companyId,
          this.loggedInUser.userId,
          'C',
          this.fvrHirerLeadForm.value.leadNumber,
          this.fvrHirerLeadForm.value.vehicleNumber
        )
        .subscribe({
          next: (data: any) => {
            let fvrDetail = data.message as IFvrDetail;
            if (fvrDetail) {
              if (fvrDetail.fvrProspectDetail)
                this.setFvrProspectDetail(fvrDetail.fvrProspectDetail);
              if (fvrDetail.fvrHirerDetail)
                this.setFvrObservationDetails(fvrDetail.fvrHirerDetail!);
              if (fvrDetail.fvrNeighbourHood)
                this.setFvrNeighbourhoodDetails(fvrDetail.fvrNeighbourHood!);
            }
            this.loaderService.hideLoader();
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
    } else {
      this.toasterService.error(
        'Please enter either lead number or vehicle number'
      );
    }
  }

  setFvrProspectDetail(fvrProspectDetail: IFvrLeadProspectDetail) {
    this.prospectDetailsForm
      .get('leadNumber')!
      .setValue(fvrProspectDetail!.leadNumber);
    this.prospectDetailsForm
      .get('leadDate')!
      .setValue(
        this.utilityService.transformDate(
          String(fvrProspectDetail!.leadDate),
          'YYYY-MM-DD'
        )
      );
    this.prospectDetailsForm
      .get('branch')!
      .setValue(fvrProspectDetail!.locationName);
    this.prospectDetailsForm
      .get('prospectName')!
      .setValue(fvrProspectDetail!.prospectName);
    this.prospectDetailsForm
      .get('mobileNumber')!
      .setValue(fvrProspectDetail!.mobileNumber);
    this.prospectDetailsForm
      .get('vehicleNumber')!
      .setValue(fvrProspectDetail!.vehicleNumber);
    this.prospectDetailsForm
      .get('prospectAddress')!
      .setValue(fvrProspectDetail!.prospectAddress);

    this.fvrObservationLeadForm
      .get('leadNumber')!
      .setValue(fvrProspectDetail!.leadNumber);

    this.fvrObservationLeadForm
      .get('vehicleNumber')!
      .setValue(fvrProspectDetail!.vehicleNumber);

    this.fvrObservationLeadForm
      .get('prospectName')!
      .setValue(fvrProspectDetail!.prospectName);

    this.fvrNeighbourLeadForm
      .get('leadNumber')!
      .setValue(fvrProspectDetail!.leadNumber);

    this.fvrNeighbourLeadForm
      .get('vehicleNumber')!
      .setValue(fvrProspectDetail!.vehicleNumber);

    this.fvrNeighbourLeadForm
      .get('prospectName')!
      .setValue(fvrProspectDetail!.prospectName);
  }

  setFvrObservationDetails(fvrHirer: IFVrHirer) {
    this.fvrObservationDetailsForm
      .get('houseAccessibility')!
      .setValue(fvrHirer!.houseAccessibility);
    this.fvrObservationDetailsForm
      .get('locality')!
      .setValue(fvrHirer!.localityId);
    this.fvrObservationDetailsForm
      .get('houseType')!
      .setValue(fvrHirer!.houseType);
    this.fvrObservationDetailsForm
      .get('flooringType')!
      .setValue(fvrHirer!.flooringType);
    this.fvrObservationDetailsForm
      .get('roofingType')!
      .setValue(fvrHirer!.roofingType);
    this.fvrObservationDetailsForm
      .get('livingStandard')!
      .setValue(fvrHirer!.livingType);
    this.fvrObservationDetailsForm
      .get('entryPermitted')!
      .setValue(fvrHirer!.entryPermittedType);
    this.fvrObservationDetailsForm
      .get('houseSize')!
      .setValue(fvrHirer!.houseArea);
    this.fvrObservationDetailsForm
      .get('landmark')!
      .setValue(fvrHirer!.landMark);
    this.fvrObservationDetailsForm
      .get('recommend')!
      .setValue(fvrHirer!.recommendation);
    this.fvrObservationDetailsForm
      .get('earlierVisit')!
      .setValue(fvrHirer!.earlyVisitedType);
    this.fvrObservationDetailsForm
      .get('politicalLeaderPhotograph')!
      .setValue(fvrHirer!.politicalAffiliation);
    this.fvrObservationDetailsForm
      .get('verifierName')!
      .setValue(fvrHirer!.visitedBy);
    this.fvrObservationDetailsForm.get('reason')!.setValue(fvrHirer!.remarks);
    this.fvrObservationDetailsForm
      .get('verifierId')!
      .setValue(fvrHirer!.verifierId);
    this.fvrObservationDetailsForm.get('time')!.setValue(fvrHirer!.timeStamp);
    this.fvrObservationDetailsForm
      .get('branchName')!
      .setValue(fvrHirer!.localityName);
    this.fvrObservationDetailsForm
      .get('dateOfVisit')!
      .setValue(
        this.utilityService.transformDate(
          String(fvrHirer!.dateVisited),
          'YYYY-MM-DD'
        )
      );
    this.fvrObservationDetailsForm
      .get('assetInHouse')!
      .setValue(fvrHirer!.furnitures);
    this.fvrObservationDetailsForm
      .get('hirerHousePhoto')!
      .setValue(fvrHirer!.houseImagePath);
  }

  setFvrNeighbourhoodDetails(fvrNeighbour: IFvrNeighbourHood) {
    this.fvrNeighbourDetailsForm
      .get('hirerLocation')!
      .setValue(fvrNeighbour!.hirerStayType);
    this.fvrNeighbourDetailsForm
      .get('yearsOfStay')!
      .setValue(fvrNeighbour!.noOfYears);
    this.fvrNeighbourDetailsForm
      .get('ownershipStatus')!
      .setValue(fvrNeighbour!.personType);
    this.fvrNeighbourDetailsForm
      .get('residenceSubType')!
      .setValue(fvrNeighbour!.houseStatusType);
    this.fvrNeighbourDetailsForm
      .get('neighbourName')!
      .setValue(fvrNeighbour!.neighbourName);
    this.fvrNeighbourDetailsForm
      .get('neighbourNumber')!
      .setValue(fvrNeighbour!.mobileNumber);
    this.fvrNeighbourDetailsForm
      .get('neighbourAddress')!
      .setValue(fvrNeighbour!.neighbourHoodAddress);
    this.fvrNeighbourDetailsForm
      .get('comment')!
      .setValue(fvrNeighbour!.comments);
    // this.fvrObservationDetailsForm
    //   .get('neighbourHousePhoto')!
    //   .setValue(fvrNeighbour!.);
  }

  private GenerateFvrForm() {
    this.loaderService.showLoader();
    this.fvrHirerLeadForm = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });

    this.prospectDetailsForm = new FormGroup({
      leadNumber: new FormControl(''),
      leadDate: new FormControl(''),
      branch: new FormControl(''),
      prospectName: new FormControl(''),
      mobileNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectAddress: new FormControl(''),
    });

    this.fvrObservationLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName: new FormControl(''),
    });

    this.fvrObservationDetailsForm = new FormGroup({
      houseAccessibility: new FormControl(''),
      locality: new FormControl(''),
      houseType: new FormControl(''),
      flooringType: new FormControl(''),
      roofingType: new FormControl(''),
      livingStandard: new FormControl(''),
      entryPermitted: new FormControl(''),
      houseSize: new FormControl(''),
      landmark: new FormControl(''),
      recommend: new FormControl(''),
      earlierVisit: new FormControl(''),
      politicalLeaderPhotograph: new FormControl(''),
      verifierName: new FormControl(''),
      reason: new FormControl(''),
      verifierId: new FormControl(''),
      time: new FormControl(''),
      branchName: new FormControl(''),
      dateOfVisit: new FormControl(''),
      assetInHouse: new FormControl(''),
      hirerHousePhoto: new FormControl(''),
    });

    this.fvrNeighbourLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName: new FormControl(''),
    });

    this.fvrNeighbourDetailsForm = new FormGroup({
      hirerLocation: new FormControl(''),
      yearsOfStay: new FormControl(''),
      ownershipStatus: new FormControl(''),
      residenceSubType: new FormControl(''),
      neighbourName: new FormControl(''),
      neighbourNumber: new FormControl(''),
      neighbourAddress: new FormControl(''),
      comment: new FormControl(''),
      neighbourHousePhoto: new FormControl(''),
    });

    this.fetchHirerLookups();
  }

  clear() {
    this.fvrHirerLeadForm.reset();
  }

  private fetchHirerLookups() {
    this.loaderService.showLoader();
    forkJoin([
      this.fvrService.getFvrHirerLookup(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      ),
      this.fvrService.getFvrAssetLookup(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      ),
      this.fvrService.getFvrNeighbourLookup(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      ),
    ]).subscribe({
      next: (response: any) => {
        let hirerLookups = response[0].message as IFOSLookup[];
        let assetLookups = response[1].message as IFOSLookup[];
        let neighbourHoodLookups = response[2].message as IFOSLookup[];
        this.flooringTypeLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 25
        );
        this.houseAccessibilityLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 23
        );
        this.localityLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 24
        );
        this.flooringTypeLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 25
        );
        this.roofingTypeLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 26
        );
        this.livingStandardLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 27
        );
        this.defaultLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 28
        );
        this.houseTypeLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 14
        );
        this.houseStatusLookup = neighbourHoodLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 15
        );
        this.residenceSubtypeLookup = neighbourHoodLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 36
        );
        this.loaderService.hideLoader();
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
}
