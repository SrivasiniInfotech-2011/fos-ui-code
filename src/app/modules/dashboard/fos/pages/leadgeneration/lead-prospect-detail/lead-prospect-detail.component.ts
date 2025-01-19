import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  ILead,
  ILeadHeader,
  ILeadProspectDetail,
} from '../../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import {
  ICustomerProspectData,
  ICustomerProspectRequest,
  IFOSLookup,
} from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../../../../../shared/components/modal/modal-component';
import { MatDialog } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-lead-prospect-detail',
  templateUrl: './lead-prospect-detail.component.html',
  styleUrl: './lead-prospect-detail.component.scss',
})
export class LeadProspectDetailComponent implements OnInit {
  public prospectSearchForm: FormGroup | any = new FormGroup({});
  public leadGenerationForm: FormGroup | any = new FormGroup({});
  public saveDetails: boolean = false;
  public selectedTab: any;
  public readOnly: boolean = false;
  public action: any;
  public buttonDisabled: boolean = false;
  private loggedInUser: any = {};
  public leadProspectDetail: ILeadProspectDetail = {};
  public today: string = '';
  public leadTypeLookup: IFOSLookup[] = [];
  private leadId: number = 0;
  public prospectType: string = '';
  public isCreateMode: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private leadService: FOSLeadMasterService,
    private toasterService: ToastrService,
    private dialog: MatDialog,
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

    this.today = new Date().toISOString().split('T')[0];
    // this.prospectSearchForm = new FormGroup(
    //   {
    //     mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$')]),
    //     aadharNumber: new FormControl('', [Validators.required, Validators.pattern('^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$')]),
    //     panNumber: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]),
    //   },
    //   { validators: this.aadharOrPanRequired }
    // );
    this.prospectSearchForm = new FormGroup(
      {
        mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$')]),
        aadharNumber: new FormControl('', [Validators.required, Validators.pattern('^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$')]),
        panNumber: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]),
      },
      { validators: this.aadharOrPanRequired }
    );

    this.leadGenerationForm = new FormGroup({
      branch: new FormControl('', [Validators.required]),
      leadNumber: new FormControl(''),
      leadDate: new FormControl(''),
      leadType: new FormControl(''),
      prospectName: new FormControl(''),
      vehicleNumber: new FormControl('', [Validators.required]),
      prospectAddress: new FormControl(''),
      prospectType: new FormControl(''),
    });
  }

  ngOnInit(): void {
    let tabValue = window.history.state?.value;
    this.selectedTab = tabValue;
    var lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    this.leadTypeLookup = lookup?.filter((s) => s.lookupTypeId == 4);
    this.leadGenerationForm
      .get('leadDate')!
      .setValue(
        this.utilityService.transformDate(String(new Date()), 'YYYY-MM-DD')
      );
    this.route.queryParams.subscribe((params: Params) => {
      this.action = params;
      if (params['status'] == 'View') {
        this.prospectSearchForm.disable();
        this.leadGenerationForm.disable();
        this.buttonDisabled = true;
      } else if (params['status'] == 'Modify') {
        this.prospectSearchForm.disable();
        this.leadGenerationForm.disable();
        this.buttonDisabled = true;
      } else {
        this.prospectSearchForm.enable();
        this.leadGenerationForm.enable();
        this.buttonDisabled = false;
        this.isCreateMode = true;
      }
      let leadDetails = JSON.parse(
        localStorage.getItem('leadDetails')!
      ) as ILead;

      if (leadDetails) {
        this.prospectType =
          leadDetails.leadProspectDetail?.prospectTypeDescription!;

        this.leadId = leadDetails.header?.leadId!;
        if (leadDetails && leadDetails.header) {
          this.leadGenerationForm
            .get('leadNumber')!
            .setValue(leadDetails.header.leadNumber);
          this.leadGenerationForm
            .get('leadDate')!
            .setValue(
              this.utilityService.transformDate(
                String(leadDetails.header.leadDate),
                'YYYY-MM-DD'
              )
            );
        }

        this.setLeadGenerationDetails(leadDetails.leadProspectDetail!);
      }
    });

    this.loaderService.hideLoader();
  }

  aadharOrPanRequired(control: AbstractControl): ValidationErrors | null {
    const mobileNumber = control.get('mobileNumber');
    const aadharNumber = control.get('aadharNumber');
    const panNumber = control.get('panNumber');

    if (mobileNumber?.value && (aadharNumber?.value || panNumber?.value)) {
      return null; // Valid
    }

    return { aadharOrPanRequired: true }; // Invalid
  }

  onTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/fos/lead-prospect-detail'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
      case 1:
        this.router.navigate(['/fos/lead-loan-details'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
      case 2:
        this.router.navigate(['/fos/lead-individual'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
      case 3:
        if (this.prospectType != 'Non Individual')
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { status: this.action['status'] },
            state: { value: 3 },
          });
        else
          this.router.navigate(['/fos/lead-non-individual'], {
            queryParams: { status: this.action['status'] },
            state: { value: 3 },
          });
        break;
      case 4:
        if (this.prospectType != 'Non Individual')
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { status: this.action['status'] },
            state: { value: event.index },
          });
        else
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { status: this.action['status'] },
            state: { value: event.index },
          });
        break;
      case 5:
        this.router.navigate(['/fos/lead-guarantor-2'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
    }
  }

  navigateToLoanDetails() {
    this.router.navigate(['/fos/lead-loan-details'], {
      queryParams: { status: this.action['status'], state: { value: 1 } },
    });
  }

  setLeadGenerationDetails(data?: ILeadProspectDetail) {
    this.prospectSearchForm.get('mobileNumber').setValue(data!.mobileNumber);
    this.prospectSearchForm.get('aadharNumber').setValue(data!.aadharNumber);
    this.prospectSearchForm.get('panNumber').setValue(data!.panNumber);
    this.leadGenerationForm.get('branch')!.setValue(data!.locationName);
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
    if (this.prospectSearchForm.valid) {
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
          localStorage.setItem(
            'LeadProspectType',
            this.leadProspectDetail.prospectTypeDescription!
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
    } else this.utilityService.markAllControls(this.prospectSearchForm, true);
  }

  openLeadGenerationDialog(
    prospectNumber: string,
    vehicleNumber: string,
    leadNumber: string
  ) {
    var dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'LEAD GENERATION',
        message: `The Lead for Prospect ${prospectNumber} and Vehicle Number ${vehicleNumber} has been successfully generated. The Lead Number is ${leadNumber}`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/fos/lead-loan-details'], {
        state: { value: 1 },
      });
    });
  }

  generateLead() {
    if (this.leadGenerationForm.valid) {
      this.loaderService.showLoader();
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
            this.loaderService.showLoader();
            let lead = data.message as ILeadHeader;
            this.openLeadGenerationDialog(
              this.leadProspectDetail.prospectName!,
              lead.vehicleRegistrationNumber!,
              lead.leadNumber!
            );
            localStorage.setItem('leadHeader', JSON.stringify(lead));
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
    } else this.utilityService.markAllControls(this.leadGenerationForm, true);
  }
}
