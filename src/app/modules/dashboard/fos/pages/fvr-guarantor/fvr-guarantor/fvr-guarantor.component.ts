import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSFvrService } from '../../../../../../../data/services/feature/fvr/fvr.service';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import {
  IFvrDetail,
  IFVrHirer,
  IFvrLeadProspectDetail,
  IFvrNeighbourHood,
} from '../../../../../../../core/interfaces/app/fvr/IFvrModel';

@Component({
  selector: 'app-fvr-guarantor',
  templateUrl: './fvr-guarantor.component.html',
  styleUrl: './fvr-guarantor.component.scss',
})
export class FvrGuarantorComponent implements OnInit {
  public fvrGuarantorLeadForm: FormGroup | any = new FormGroup({});
  public fvrGuarantorLeadDetailsForm: FormGroup | any = new FormGroup({});
  public fvrGuarantorNeighbourLeadForm: FormGroup | any = new FormGroup({});
  public fvrGuarantorNeighbourDetailsForm: FormGroup | any = new FormGroup({});
  public prospectDetailsForm: FormGroup | any = new FormGroup({});
  private loggedInUser: any = {};
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

  ngOnInit(): void {
    this.GenerateFvrGuarantorForm();
    this.prospectDetailsForm.disable();
    this.fvrGuarantorLeadDetailsForm.disable();
    this.fvrGuarantorNeighbourDetailsForm.disable();
  }

  private GenerateFvrGuarantorForm() {
    this.loaderService.showLoader();
    this.fvrGuarantorLeadForm = new FormGroup({
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
    this.fvrGuarantorLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName: new FormControl(''),
    });

    this.fvrGuarantorLeadDetailsForm = new FormGroup({
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

    this.fvrGuarantorNeighbourLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName: new FormControl(''),
    });

    this.fvrGuarantorNeighbourDetailsForm = new FormGroup({
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

  getFvrGuarantorDetails() {
    this.loaderService.showLoader();
    if (this.fvrGuarantorLeadForm.valid) {
      this.fvrService
        .getLeadHirerDetails(
          this.loggedInUser.companyId,
          this.loggedInUser.userId,
          'C',
          this.fvrGuarantorLeadForm.value.leadNumber,
          this.fvrGuarantorLeadForm.value.vehicleNumber
        )
        .subscribe(
          (data: any) => {
            let fvrDetail = data.message as IFvrDetail;
            if (fvrDetail) {
              this.fvrService
                .getFvrGuarantorDetails(
                  this.loggedInUser.companyId,
                  this.loggedInUser.userId,
                  fvrDetail.fvrProspectDetail?.leadId!,
                  2
                )
                .subscribe({
                  next: (data: any) => {
                    let fvrGuarantorDetail = data.message as IFvrDetail;
                    //let fvrNetworkDetail = data[0].message as IFvrDetail;
                    if (fvrDetail && fvrDetail.fvrProspectDetail)
                      this.setFvrProspectDetail(fvrDetail.fvrProspectDetail!);
                    if (fvrDetail && fvrDetail.fvrHirerDetail)
                      this.setFvrObservationDetails(
                        fvrGuarantorDetail.fvrHirerDetail!
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
          },
          (error: any) => {
            this.loaderService.hideLoader();
            let errorMessages = error.message.split('|');
            for (const key in errorMessages) {
              this.toasterService.error(errorMessages[key], 'Error', {
                timeOut: 2000,
              });
            }
          }
        );
    }
  }
  setFvrProspectDetail(fvrProspectDetail: IFvrLeadProspectDetail) {
    this.prospectDetailsForm
      .get('leadNumber')
      .setValue(fvrProspectDetail!.leadNumber);
    this.prospectDetailsForm
      .get('leadDate')
      .setValue(
        this.utilityService.transformDate(
          String(fvrProspectDetail!.leadDate),
          'YYYY-MM-DD'
        )
      );
    this.prospectDetailsForm
      .get('branch')
      .setValue(fvrProspectDetail!.locationName);
    this.prospectDetailsForm
      .get('prospectName')
      .setValue(fvrProspectDetail!.prospectName);
    this.prospectDetailsForm
      .get('mobileNumber')
      .setValue(fvrProspectDetail!.mobileNumber);
    this.prospectDetailsForm
      .get('vehicleNumber')
      .setValue(fvrProspectDetail!.vehicleNumber);
    this.prospectDetailsForm
      .get('prospectAddress')
      .setValue(fvrProspectDetail!.prospectAddress);

    this.fvrGuarantorLeadForm
      .get('leadNumber')
      .setValue(fvrProspectDetail!.leadNumber);

    this.fvrGuarantorLeadForm
      .get('vehicleNumber')
      .setValue(fvrProspectDetail!.vehicleNumber);

    this.fvrGuarantorLeadForm
      .get('prospectName')
      .setValue(fvrProspectDetail!.prospectName);

    this.fvrGuarantorNeighbourLeadForm
      .get('leadNumber')
      .setValue(fvrProspectDetail!.leadNumber);

    this.fvrGuarantorNeighbourLeadForm
      .get('vehicleNumber')
      .setValue(fvrProspectDetail!.vehicleNumber);

    this.fvrGuarantorNeighbourLeadForm
      .get('prospectName')
      .setValue(fvrProspectDetail!.prospectName);
  }

  setFvrObservationDetails(fvrHirer: IFVrHirer) {
    this.fvrGuarantorLeadDetailsForm
      .get('houseAccessibility')
      .setValue(fvrHirer!.houseAccessibility);
    this.fvrGuarantorLeadDetailsForm
      .get('locality')
      .setValue(fvrHirer!.localityId);
    this.fvrGuarantorLeadDetailsForm
      .get('houseType')
      .setValue(fvrHirer!.houseType);
    this.fvrGuarantorLeadDetailsForm
      .get('flooringType')
      .setValue(fvrHirer!.flooringType);
    this.fvrGuarantorLeadDetailsForm
      .get('roofingType')
      .setValue(fvrHirer!.roofingType);
    this.fvrGuarantorLeadDetailsForm
      .get('livingStandard')
      .setValue(fvrHirer!.livingType);
    this.fvrGuarantorLeadDetailsForm
      .get('entryPermitted')
      .setValue(fvrHirer!.entryPermittedType);
    this.fvrGuarantorLeadDetailsForm
      .get('houseSize')
      .setValue(fvrHirer!.houseArea);
    this.fvrGuarantorLeadDetailsForm
      .get('landmark')
      .setValue(fvrHirer!.landMark);
    this.fvrGuarantorLeadDetailsForm
      .get('recommend')
      .setValue(fvrHirer!.recommendation);
    this.fvrGuarantorLeadDetailsForm
      .get('earlierVisit')
      .setValue(fvrHirer!.earlyVisitedType);
    this.fvrGuarantorLeadDetailsForm
      .get('politicalLeaderPhotograph')
      .setValue(fvrHirer!.politicalAffiliation);
    this.fvrGuarantorLeadDetailsForm
      .get('verifierName')
      .setValue(fvrHirer!.visitedBy);
    this.fvrGuarantorLeadDetailsForm.get('reason').setValue(fvrHirer!.remarks);
    this.fvrGuarantorLeadDetailsForm
      .get('verifierId')
      .setValue(fvrHirer!.verifierId);
    this.fvrGuarantorLeadDetailsForm.get('time').setValue(fvrHirer!.timeStamp);
    this.fvrGuarantorLeadDetailsForm
      .get('branchName')
      .setValue(fvrHirer!.localityName);
    this.fvrGuarantorLeadDetailsForm
      .get('dateOfVisit')
      .setValue(
        this.utilityService.transformDate(
          String(fvrHirer!.dateVisited),
          'YYYY-MM-DD'
        )
      );
    this.fvrGuarantorLeadDetailsForm
      .get('assetInHouse')
      .setValue(fvrHirer!.furnitures);
    // this.fvrGuarantorLeadDetailsForm
    //   .get('hirerHousePhoto')!
    //   .setValue(fvrHirer!.houseImagePath);
  }

  setFvrNeighbourhoodDetails(fvrNeighbour: IFvrNeighbourHood) {
    this.fvrGuarantorNeighbourDetailsForm
      .get('hirerLocation')
      .setValue(fvrNeighbour!.hirerStayType);
    this.fvrGuarantorNeighbourDetailsForm
      .get('yearsOfStay')
      .setValue(fvrNeighbour!.noOfYears);
    this.fvrGuarantorNeighbourDetailsForm
      .get('ownershipStatus')
      .setValue(fvrNeighbour!.personType);
    this.fvrGuarantorNeighbourDetailsForm
      .get('residenceSubType')
      .setValue(fvrNeighbour!.houseStatusType);
    this.fvrGuarantorNeighbourDetailsForm
      .get('neighbourName')
      .setValue(fvrNeighbour!.neighbourName);
    this.fvrGuarantorNeighbourDetailsForm
      .get('neighbourNumber')
      .setValue(fvrNeighbour!.mobileNumber);
    this.fvrGuarantorNeighbourDetailsForm
      .get('neighbourAddress')
      .setValue(fvrNeighbour!.neighbourHoodAddress);
    this.fvrGuarantorNeighbourDetailsForm
      .get('comment')!
      .setValue(fvrNeighbour!.comments);
  }

  clear() {
    this.fvrGuarantorLeadForm.reset();
    this.prospectDetailsForm.reset();
    this.fvrGuarantorLeadForm.reset();
    this.fvrGuarantorNeighbourLeadForm.reset();
    this.fvrGuarantorLeadDetailsForm.reset();
    this.fvrGuarantorNeighbourDetailsForm.reset();
  }
}
