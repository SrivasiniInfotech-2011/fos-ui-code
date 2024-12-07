import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import {
  IFieldExecutive,
  ILead,
  ILeadAssetDetail,
  ILeadHeader,
  ILeadIndividualDetail,
  ILineOfBusiness,
} from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../shared/components/modal/modal-component';

@Component({
  selector: 'app-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrl: './individual-details.component.scss',
})
export class IndividualDetailsComponent {
  public individualDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public maritalStatusLookup: IFOSLookup[] = [];
  public employmentLookup: IFOSLookup[] = [];
  public houseTypeLookup: IFOSLookup[] = [];
  public houseStatusLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};
  private loggedInUser: any = {};
  public selectedTab: any;
  private mode: string = '';
  private leadId?: number;
  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
  ngOnInit(): void {
      this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;
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
      existingLoan: new FormControl('', [Validators.required]),
      totalExistingLoans: new FormControl('', [Validators.required]),
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['view'] =="true") {
        this.individualDetailsForm.disable();
      } else {
        this.individualDetailsForm.enable();
      }

      let leadDetails = JSON.parse(
        localStorage.getItem('leadDetails')!
      ) as ILead;

      if (leadDetails && leadDetails.individualDetail) {
        this.leadId = leadDetails.header?.leadId;
        if(leadDetails.header)
          this.leadHeader=this.leadHeader;
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
  }

  setLookups() {
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    this.maritalStatusLookup = lookup.filter((s) => s.lookupTypeId == 32);
    this.houseStatusLookup = lookup.filter((s) => s.lookupTypeId == 15);
    this.houseTypeLookup = lookup.filter((s) => s.lookupTypeId == 14);
    this.employmentLookup = lookup.filter((s) => s.lookupTypeId == 16);
  }

  submit() {
    this.isSubmitted = true;
    if (this.individualDetailsForm.valid) {
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
      } as ILeadIndividualDetail;

      this.loaderService.showLoader();
      this.leadService
        .addLeadIndividualDetails(
          this.loggedInUser.companyId,
          this.loggedInUser.userId,
          this.leadId ?? this.leadHeader.leadId!,
          individualDetail
        )
        .subscribe({
          next: (data: any) => {
            this.loaderService.hideLoader();
            this.dialog.open(ModalComponent, {
              data: {
                title: 'LEAD GENERATION',
                message: `The Lead ${this.leadHeader.leadNumber} has been updated with the Individual Details successfully.`,
              },
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
