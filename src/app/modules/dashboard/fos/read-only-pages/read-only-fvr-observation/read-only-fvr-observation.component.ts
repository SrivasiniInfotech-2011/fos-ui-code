import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { ToastrService } from 'ngx-toastr';
import { FOSFvrService } from '../../../../../../data/services/feature/fvr/fvr.service';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-read-only-fvr-observation',
  templateUrl: './read-only-fvr-observation.component.html',
  styleUrl: './read-only-fvr-observation.component.scss'
})
export class ReadOnlyFvrObservationComponent {

  public fvrObservationLeadForm: FormGroup | any = new FormGroup({});
  public fvrObservationDetailsForm: FormGroup | any = new FormGroup({});
  public localityLookup: IFOSLookup[] = [];
  public houseTypeLookup: IFOSLookup[] = [];
  public flooringTypeLookup: IFOSLookup[] = [];
  public roofingTypeLookup: IFOSLookup[] = [];
  public livingStandardLookup: IFOSLookup[] = [];
  public defaultLookup: IFOSLookup[] = [];
  public houseOwnershipLookup: IFOSLookup[] = [];
  public residenceSubtypeLookup: IFOSLookup[] = [];
  public houseStatusLookup: IFOSLookup[] = [];
  public houseAccessibilityLookup: IFOSLookup[] = [];
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
    this.fetchHirerLookups()
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

