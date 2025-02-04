import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSFvrService } from '../../../../../../data/services/feature/fvr/fvr.service';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { IFvrLeadProspectDetail, IFVrHirer, IFvrNeighbourHood } from '../../../../../../core/interfaces/app/fvr/IFvrModel';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-read-only-fvr-hirer',
  templateUrl: './read-only-fvr-hirer.component.html',
  styleUrl: './read-only-fvr-hirer.component.scss'
})
export class ReadOnlyFvrHirerComponent {

  public fvrHirerLeadForm: FormGroup | any = new FormGroup({});
  public prospectDetailsForm: FormGroup | any = new FormGroup({});
  public fvrObservationLeadForm: FormGroup | any = new FormGroup({});
  public fvrObservationDetailsForm: FormGroup | any = new FormGroup({});
  public fvrNeighbourLeadForm: FormGroup | any = new FormGroup({});
  public fvrNeighbourDetailsForm: FormGroup | any = new FormGroup({});
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
  private loggedInUser: any = {};

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

    this.GenerateFvrForm()
    this.fetchHirerLookups()
  }

  private GenerateFvrForm() {
    this.loaderService.showLoader();
    this.fvrHirerLeadForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
    });

    this.prospectDetailsForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      leadDate: new FormControl({ value: '', disabled: true }),
      branch: new FormControl({ value: '', disabled: true }),
      prospectName: new FormControl({ value: '', disabled: true }),
      mobileNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      prospectAddress: new FormControl({ value: '', disabled: true }),
    });

    this.fvrObservationLeadForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      prospectName: new FormControl({ value: '', disabled: true }),
    });

    this.fvrObservationDetailsForm = new FormGroup({
      houseAccessibility: new FormControl({ value: '', disabled: true }),
      locality: new FormControl({ value: '', disabled: true }),
      houseType: new FormControl({ value: '', disabled: true }),
      flooringType: new FormControl({ value: '', disabled: true }),
      roofingType: new FormControl({ value: '', disabled: true }),
      livingStandard: new FormControl({ value: '', disabled: true }),
      entryPermitted: new FormControl({ value: '', disabled: true }),
      houseSize: new FormControl({ value: '', disabled: true }),
      landmark: new FormControl({ value: '', disabled: true }),
      recommend: new FormControl({ value: '', disabled: true }),
      earlierVisit: new FormControl({ value: '', disabled: true }),
      politicalLeaderPhotograph: new FormControl({ value: '', disabled: true }),
      verifierName: new FormControl({ value: '', disabled: true }),
      reason: new FormControl({ value: '', disabled: true }),
      verifierId: new FormControl({ value: '', disabled: true }),
      time: new FormControl({ value: '', disabled: true }),
      branchName: new FormControl({ value: '', disabled: true }),
      dateOfVisit: new FormControl({ value: '', disabled: true }),
      assetInHouse: new FormControl({ value: '', disabled: true }),
      hirerHousePhoto: new FormControl({ value: '', disabled: true }),
    });

    this.fvrNeighbourLeadForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      prospectName: new FormControl({ value: '', disabled: true }),
    });

    this.fvrNeighbourDetailsForm = new FormGroup({
      hirerLocation: new FormControl({ value: '', disabled: true }),
      yearsOfStay: new FormControl({ value: '', disabled: true }),
      ownershipStatus: new FormControl({ value: '', disabled: true }),
      residenceSubType: new FormControl({ value: '', disabled: true }),
      neighbourName: new FormControl({ value: '', disabled: true }),
      neighbourNumber: new FormControl({ value: '', disabled: true }),
      neighbourAddress: new FormControl({ value: '', disabled: true }),
      comment: new FormControl({ value: '', disabled: true }),
      neighbourHousePhoto: new FormControl({ value: '', disabled: true }),
    });

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
