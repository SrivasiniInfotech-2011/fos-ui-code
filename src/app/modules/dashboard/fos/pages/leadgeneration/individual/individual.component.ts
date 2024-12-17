import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
import {
  IFieldExecutive,
  ILead,
  ILeadAssetDetail,
  ILeadHeader,
  ILeadIndividualDetail,
  ILineOfBusiness,
} from '../../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../../shared/components/modal/modal-component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.scss',
})
export class IndividualComponent implements OnInit {
  public individualForm: FormGroup | any = new FormGroup({});
  public individualDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public maritalStatusLookup: IFOSLookup[] = [];
  public employmentLookup: IFOSLookup[] = [];
  public houseTypeLookup: IFOSLookup[] = [];
  public houseStatusLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};
  private loggedInUser: any = {};
  public selectedTab: any;
  public action: any;
  public buttonDisabled: boolean = false;
  private leadId: number = 0;

  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    public dialog: MatDialog,
     private location: Location,
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

  ngOnInit(): void {
    let tabValue = window.history.state?.value;
    this.selectedTab = tabValue;

    let leadDetails = JSON.parse(localStorage.getItem('leadDetails')!) as ILead;
    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;

    this.individualForm = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });
    if (this.leadHeader) {
      this.individualForm
        .get('leadNumber')!
        .setValue(this.leadHeader.leadNumber!);
      this.individualForm
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    } else if (leadDetails && leadDetails.header) {
      this.leadHeader = leadDetails.header;
      this.individualForm
        .get('leadNumber')!
        .setValue(leadDetails.header.leadNumber!);
      this.individualForm
        .get('vehicleNumber')!
        .setValue(leadDetails.header.vehicleRegistrationNumber!);
    }

    this.individualDetailsForm = new FormGroup({
      fatherName: new FormControl('', [Validators.required]),
      motherName: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
      employment: new FormControl('', [Validators.required]),
      netSalary: new FormControl('', [Validators.required]),
      noOfAdultDependents: new FormControl('', [Validators.required]),
      noOfChildDependents: new FormControl('', [Validators.required]),
      houseType: new FormControl('', [Validators.required]),
      floorFlatNumber: new FormControl('', [Validators.required]),
      houseStatus: new FormControl('', [Validators.required]),
      rentalLeaseAmount: new FormControl('', [Validators.required]),
      owned2Wheeler: new FormControl('', [Validators.required]),
      owned4Wheeler: new FormControl('', [Validators.required]),
      ownedHeavyVehicle: new FormControl('', [Validators.required]),
      existingLoans: new FormControl('', [Validators.required]),
      totalExistingLoans: new FormControl('', [Validators.required]),
      spouseName: new FormControl('', [Validators.required]),
      spouseEmployment: new FormControl('', [Validators.required]),
      spouseMonthlySalary: new FormControl('', [Validators.required]),
    });

    this.setLookups();

    this.route.queryParams.subscribe((params: Params) => {
      this.action = params;
      if (params['view'] =="true") {
        this.individualForm.disable();
        this.individualDetailsForm.disable();
        this.buttonDisabled = true;
      } else {
        this.individualForm.enable();
        this.individualDetailsForm.enable();
        this.buttonDisabled = false;
      }

      if (leadDetails && leadDetails.individualDetail) {
        this.leadId = leadDetails.header?.leadId!;
        this.setLeadIndividualDetails(leadDetails.individualDetail);
      }
    });
  }

  /**
   * Sets Individual Details.
   * @param individualDetail Individual Detail object.
   */
  setLeadIndividualDetails(individualDetail: ILeadIndividualDetail) {
    this.individualDetailsForm
      .get('fatherName')!
      .setValue(individualDetail!.fatherName);
    this.individualDetailsForm
      .get('motherName')!
      .setValue(individualDetail!.motherName);
    this.individualDetailsForm
      .get('maritalStatus')!
      .setValue(individualDetail!.maritialStatusLookupValueId);
    this.individualDetailsForm
      .get('employment')!
      .setValue(individualDetail!.employmentLookupValueId);
    this.individualDetailsForm
      .get('netSalary')!
      .setValue(individualDetail!.monthlySalary);
    this.individualDetailsForm
      .get('noOfAdultDependents')!
      .setValue(individualDetail!.adultDependents);
    this.individualDetailsForm
      .get('noOfChildDependents')!
      .setValue(individualDetail!.childDependents);
    this.individualDetailsForm
      .get('houseType')!
      .setValue(individualDetail!.houseLookupValueId);
    this.individualDetailsForm
      .get('floorFlatNumber')!
      .setValue(individualDetail!.doorFloorNumber);
    this.individualDetailsForm
      .get('houseStatus')!
      .setValue(individualDetail!.houseStatusLookupValueId);
    this.individualDetailsForm
      .get('rentalLeaseAmount')!
      .setValue(individualDetail!.houseRentalAmount);
    this.individualDetailsForm
      .get('owned2Wheeler')!
      .setValue(individualDetail!.ownTwoWheeler);
    this.individualDetailsForm
      .get('owned4Wheeler')!
      .setValue(individualDetail!.ownFourWheeler);
    this.individualDetailsForm
      .get('ownedHeavyVehicle')!
      .setValue(individualDetail!.ownHeavyVehicle);
    this.individualDetailsForm
      .get('existingLoans')!
      .setValue(individualDetail!.existingLoanEmi);
    this.individualDetailsForm
      .get('totalExistingLoans')!
      .setValue(individualDetail!.existingLoanCount);
    this.individualDetailsForm
      .get('spouseName')!
      .setValue(individualDetail!.spouseName);
    this.individualDetailsForm
      .get('spouseEmployment')!
      .setValue(individualDetail!.spouseEmploymentLookupValueId);
    this.individualDetailsForm
      .get('spouseMonthlySalary')!
      .setValue(individualDetail!.spouseSalary);
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (this.action['view'] == "true") {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-non-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 5:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
      }
    } else if (this.action['view'] == "false") {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-non-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 5:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
      }
    } else {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-non-individual'], {
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            state: { value: event.index },
          });
          break;
        case 5:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            state: { value: event.index },
          });
          break;
      }
    }
  }
  setLookups() {
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    this.maritalStatusLookup = lookup?.filter((s) => s.lookupTypeId == 32);
    this.houseStatusLookup = lookup?.filter((s) => s.lookupTypeId == 15);
    this.houseTypeLookup = lookup?.filter((s) => s.lookupTypeId == 14);
    this.employmentLookup = lookup?.filter((s) => s.lookupTypeId == 16);
  }

  back() {
     this.location.back();
  }

  submit() {
    this.isSubmitted = true;
    if (this.individualForm.valid && this.individualDetailsForm.valid) {
      this.isSubmitted = false;
      let individualDetail = {
        adultDependents: this.individualDetailsForm.value.noOfAdultDependents,
        childDependents: this.individualDetailsForm.value.noOfChildDependents,
        doorFloorNumber: this.individualDetailsForm.value.floorFlatNumber,
        employmentLookupValueId: this.individualDetailsForm.value.employment,
        ExistingLoanEmi: this.individualDetailsForm.value.totalExistingLoans,
        existingLoanCount: this.individualDetailsForm.value.existingLoans,
        fatherName: this.individualDetailsForm.value.fatherName,
        houseLookupValueId: this.individualDetailsForm.value.houseType,
        houseRentalAmount: this.individualDetailsForm.value.rentalLeaseAmount,
        houseStatusLookupValueId: this.individualDetailsForm.value.houseStatus,
        maritialStatusLookupValueId:
          this.individualDetailsForm.value.maritalStatus,
        monthlySalary: this.individualDetailsForm.value.netSalary,
        motherName: this.individualDetailsForm.value.motherName,
        ownFourWheeler: this.individualDetailsForm.value.owned4Wheeler,
        ownHeavyVehicle: this.individualDetailsForm.value.ownedHeavyVehicle,
        ownTwoWheeler: this.individualDetailsForm.value.owned2Wheeler,
        spouseEmploymentLookupValueId:
          this.individualDetailsForm.value.spouseEmployment,
        spouseName: this.individualDetailsForm.value.spouseName,
        spouseSalary: this.individualDetailsForm.value.spouseMonthlySalary,
      } as ILeadIndividualDetail;

      this.loaderService.showLoader();
      this.leadService
        .addLeadIndividualDetails(
          this.loggedInUser.companyId,
          this.loggedInUser.userId,
          this.leadHeader.leadId!,
          individualDetail
        )
        .subscribe({
          next: (data: any) => {
            this.loaderService.hideLoader();
            var dialogRef = this.dialog.open(ModalComponent, {
              data: {
                title: 'LEAD GENERATION',
                message: `The Lead ${this.leadHeader.leadNumber} has been updated with the Individual Details successfully.`,
              },
            });

            dialogRef.afterClosed().subscribe((result) => {
              this.onTabChanged({ index: 3 } as MatTabChangeEvent);
            });
          },
          error: (error: any) => {
            this.loaderService.hideLoader();
            this.toasterService.show(error);
          },
        });
    }
  }
}
