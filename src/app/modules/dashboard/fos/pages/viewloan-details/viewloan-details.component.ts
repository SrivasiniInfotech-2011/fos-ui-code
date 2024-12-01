import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ILeadHeader,
  ILeadProspectDetail,
} from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../data/services/feature/leadMaster/leadmaster.service';
import {
  ICustomerProspectData,
  ICustomerProspectRequest,
  IFOSLookup,
} from '../../../../../../core/interfaces/app/request/IFOSModels';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../../../../shared/components/modal/modal-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-viewloan-details',
  templateUrl: './viewloan-details.component.html',
  styleUrl: './viewloan-details.component.scss',
})
export class ViewloanDetailsComponent implements OnInit {
  public prospectSearchForm: FormGroup | any = new FormGroup({});
  public leadGenerationForm: FormGroup | any = new FormGroup({});
  public submittedForm1: boolean = false;
  public submittedForm2: boolean = false;
  public loggedInUser: any = {};
  private leadProspectDetail: ILeadProspectDetail = {};
  public leadTypeLookup: IFOSLookup[] = [];
  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    public dialog: MatDialog
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

  initializeForm() {
    this.prospectSearchForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
    });

    this.leadGenerationForm = new FormGroup({
      mobileNo: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      leadNumber: new FormControl({ value: '', disabled: true }, []),
      leadDate: new FormControl(
        this.utilityService.transformDate(
          String(new Date()),
          'YYYY-MM-DD'
        ),
        [Validators.required]
      ),
      leadType: new FormControl('', [Validators.required]),
      prospectName: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
      prospectType: new FormControl('', [Validators.required]),
      prospectAddress: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.initializeForm();
    this.fetchLeadGenerationLookup();
  }

  fetchLeadGenerationLookup() {
    this.loaderService.showLoader();
    this.leadService
      .fetchLeadGenerationLookup(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      )
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          let lookupData = data.message as IFOSLookup[];
          this.leadTypeLookup = lookupData.filter((s) => s.lookupTypeId == 4);
          localStorage.setItem(
            'leadGenerationLookups',
            JSON.stringify(lookupData)
          );
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
  setLeadGenerationDetails(data?: ILeadProspectDetail) {
    this.leadGenerationForm.get('mobileNo')!.setValue(data!.mobileNumber);
    this.leadGenerationForm.get('branch')!.setValue(data!.locationName);
    this.leadGenerationForm.get('leadNumber')!.setValue('');
    this.leadGenerationForm
      .get('leadDate')!
      .setValue(
        this.utilityService.transformDate(String(new Date()), 'YYYY-MM-DD')
      );
    this.leadGenerationForm.get('leadType')!.setValue(data!.leadType);
    this.leadGenerationForm.get('prospectName')!.setValue(data!.prospectName);
    this.leadGenerationForm.get('vehicleNumber')!.setValue(data!.vehicleNumber);
    this.leadGenerationForm
      .get('prospectType')!
      .setValue(data!.prospectTypeDescription);
    this.leadGenerationForm
      .get('prospectAddress')!
      .setValue(data!.prospectAddress);
  }

  searchProspect() {
    this.submittedForm1 = true;
    if (this.prospectSearchForm.valid) {
      this.submittedForm1 = false;
      let request = {
        aadharNumber: this.prospectSearchForm.value.aadharNumber,
        companyId: this.loggedInUser.companyId,
        mobileNumber: this.prospectSearchForm.value.mobileNumber,
        panNumber: this.prospectSearchForm.value.panNumber,
        userId: this.loggedInUser.userId,
      } as ICustomerProspectRequest;

      this.loaderService.showLoader();

      this.leadService.fetchLeadProspect(request).subscribe({
        next: (data: any) => {
          this.leadProspectDetail = data.message as ILeadProspectDetail;
          this.setLeadGenerationDetails(this.leadProspectDetail);
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

  openLeadGenerationDialog(
    prospectNumber: string,
    vehicleNumber: string,
    leadNumber: string
  ) {
    this.dialog.open(ModalComponent, {
      data: {
        title: 'LEAD GENERATION',
        message: `The Lead for Prospect ${prospectNumber} and Vehicle Number ${vehicleNumber} has been successfully generated. The Lead Number is ${leadNumber}`,
      },
    });
  }

  generateLead() {
    this.submittedForm2 = true;
    if (this.leadGenerationForm.valid) {
      this.submittedForm2 = false;
      let leadGenerationHeader = {
        prospectId: this.leadProspectDetail.prospectId!,
        leadNumber: this.leadGenerationForm.value.leadNumber,
        leadDate: this.leadGenerationForm.value.leadDate,
        vehicleRegistrationNumber: this.leadGenerationForm.value.vehicleNumber,
      } as ILeadHeader;
      this.leadService
        .generateLead(
          this.loggedInUser.userId,
          this.loggedInUser.companyId,
          this.leadProspectDetail.locationId!,
          leadGenerationHeader
        )
        .subscribe({
          next: (data: any) => {
            let lead = data.message as ILeadHeader;
            this.openLeadGenerationDialog(
              this.leadProspectDetail.prospectName!,
              lead.vehicleRegistrationNumber!,
              lead.leadNumber!
            );
            localStorage.setItem('leadHeader', JSON.stringify(lead));
          },
          error: (error: any) => {},
        });
    }
  }
}
