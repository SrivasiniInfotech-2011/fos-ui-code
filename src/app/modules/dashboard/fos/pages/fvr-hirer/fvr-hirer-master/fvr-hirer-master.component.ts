import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FOSFvrService } from '../../../../../../../data/services/feature/fvr/fvr.service';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import {
  IFvrDetail,
  IFvrLeadProspectDetail,
} from '../../../../../../../core/interfaces/app/fvr/IFvrModel';
import { FvrObservationComponent } from '../../fvr-observation/fvr-observation.component';

@Component({
  selector: 'app-fvr-hirer-master',
  templateUrl: './fvr-hirer-master.component.html',
  styleUrl: './fvr-hirer-master.component.scss',
})
export class FvrHirerMasterComponent implements OnInit {
  public fvrHirerLeadForm: FormGroup | any = new FormGroup({});
  public fvrHirerLeadDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public loggedInUser: any = {};
  @ViewChild(FvrObservationComponent) observationComponent!:FvrObservationComponent
  constructor(
    private fvrService: FOSFvrService,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private encryptionService: EncryptionService
  ) {}

  private GenerateFvrForm() {
    this.fvrHirerLeadForm = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });

    this.fvrHirerLeadDetailsForm = new FormGroup({
      leadNumber: new FormControl(''),
      leadDate: new FormControl(''),
      branch: new FormControl(''),
      prospectName: new FormControl(''),
      mobileNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectAddress: new FormControl(''),
    });
  }

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
  }

  fetchFvrDetails() {
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
            if (fvrDetail && fvrDetail.fvrProspectDetail) {
              this.setFvrProspectDetail(fvrDetail.fvrProspectDetail);
              this.observationComponent.bindHirerForm(fvrDetail);
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
    this.fvrHirerLeadDetailsForm
      .get('leadNumber')!
      .setValue(fvrProspectDetail!.leadNumber);
    this.fvrHirerLeadDetailsForm
      .get('leadDate')!
      .setValue(
        this.utilityService.transformDate(
          String(fvrProspectDetail!.leadDate),
          'YYYY-MM-DD'
        )
      );
    this.fvrHirerLeadDetailsForm
      .get('branch')!
      .setValue(fvrProspectDetail!.locationName);
    this.fvrHirerLeadDetailsForm
      .get('prospectName')!
      .setValue(fvrProspectDetail!.prospectName);
    this.fvrHirerLeadDetailsForm
      .get('mobileNumber')!
      .setValue(fvrProspectDetail!.mobileNumber);
    this.fvrHirerLeadDetailsForm
      .get('vehicleNumber')!
      .setValue(fvrProspectDetail!.vehicleNumber);
    this.fvrHirerLeadDetailsForm
      .get('prospectAddress')!
      .setValue(fvrProspectDetail!.prospectAddress);
  }

  clear() {
    this.fvrHirerLeadForm.reset();
    this.fvrHirerLeadDetailsForm.reset();
  }
}
