import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { ToastrService } from 'ngx-toastr';
import { FOSFvrService } from '../../../../../../data/services/feature/fvr/fvr.service';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { forkJoin } from 'rxjs';
import { IFvrNeighbourHood } from '../../../../../../core/interfaces/app/fvr/IFvrModel';

@Component({
  selector: 'app-read-only-fvr-neighbour',
  templateUrl: './read-only-fvr-neighbour.component.html',
  styleUrl: './read-only-fvr-neighbour.component.scss'
})
export class ReadOnlyFvrNeighbourComponent {

  public fvrNeighbourLeadForm: FormGroup | any = new FormGroup({});
  public fvrNeighbourDetailsForm: FormGroup | any = new FormGroup({});
  public localityLookup: IFOSLookup[] = [];
  public defaultLookup: IFOSLookup[] = [];
  public residenceSubtypeLookup: IFOSLookup[] = [];
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

    this.fetchHirerLookups()
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

        this.localityLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 24
        );
        this.defaultLookup = hirerLookups.filter(
          (s: IFOSLookup) => s.lookupTypeId == 28
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
