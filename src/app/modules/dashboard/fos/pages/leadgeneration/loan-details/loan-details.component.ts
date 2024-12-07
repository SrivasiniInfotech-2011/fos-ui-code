import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
import {
  IFieldExecutive,
  ILead,
  ILeadAssetDetail,
  ILeadHeader,
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
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrl: './loan-details.component.scss',
})
export class LoanDetailsComponent implements OnInit {
  public leadForm: FormGroup | any = new FormGroup({});
  public loanDetailsForm: FormGroup | any = new FormGroup({});
  public assetDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public leadTypeLookup: IFOSLookup[] = [];
  public tenureTypeLookup: IFOSLookup[] = [];
  public repaymentFrequencyLookup: IFOSLookup[] = [];
  public fieldExecutiveLookup: IFOSLookup[] = [];
  public documentCategoryLookup: any[] = [];
  public assetClassLookup: IFOSLookup[] = [];
  public assetModelLookup: IFOSLookup[] = [];
  public assetMakeLookup: IFOSLookup[] = [];
  public assetTypeLookup: IFOSLookup[] = [];
  public ownershipLookup: IFOSLookup[] = [];
  public vehicleTypeLookup: IFOSLookup[] = [];
  public taxTypeLookup: IFOSLookup[] = [];
  public fuelTypeLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};
  private loggedInUser: any = {};
  public fieldExecutives: IFieldExecutive[] = [];
  public lineOfBusinesses: any[] = [];
  public selectedTab: any;
  private mode: string = '';
  private leadId: number = 0;
  public buttonDisabled: boolean = false;
  public action: any = {};
  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    public dialog: MatDialog,
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
    this.SetupLoanDetailsScreen();
    this.setLookups();
    this.setLineOfBusinesses();
    this.setFieldExecutives();
    this.setDocumentCategories();
    this.sleep(1200);
    this.route.queryParams.subscribe((params: Params) => {
      this.action = params;
      if (params['view']) {
        this.leadForm.disable();
        this.loanDetailsForm.disable();
        this.assetDetailsForm.disable();
        this.buttonDisabled = true;
      } else {
        this.leadForm.enable();
        this.loanDetailsForm.enable();
        this.assetDetailsForm.enable();
        this.buttonDisabled = false;
      }

      let leadDetails = JSON.parse(
        localStorage.getItem('leadDetails')!
      ) as ILead;

      if (leadDetails) {
        this.leadId = leadDetails.header?.leadId!;
        this.setLeadLoanDetails(
          leadDetails.lobId,
          leadDetails.header!,
          leadDetails.asset!
        );
      }
    });
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setLeadLoanDetails(
    lobId: number,
    leadHeader: ILeadHeader,
    asset: ILeadAssetDetail
  ) {
    if (leadHeader) {
      this.leadHeader = leadHeader;
      this.leadForm.get('leadNumber')!.setValue(leadHeader.leadNumber!);
      this.leadForm
        .get('vehicleNumber')!
        .setValue(leadHeader.vehicleRegistrationNumber!);
    }
    if (asset) {
      this.loanDetailsForm.get('lineOfBusiness')!.setValue(lobId);

      this.loanDetailsForm
        .get('financeAmount')!
        .setValue(leadHeader.financeAmount!);

      this.loanDetailsForm.get('tenure')!.setValue(leadHeader.tenure!);

      this.loanDetailsForm
        .get('tenureType')!
        .setValue(leadHeader.tenureLookupValueId!);

      this.loanDetailsForm.get('rate')!.setValue(leadHeader.rate!);

      this.loanDetailsForm
        .get('repaymentFrequency')!
        .setValue(leadHeader.repaymentFrequencyLookupValueId!);

      this.loanDetailsForm
        .get('leavePeriod')!
        .setValue(leadHeader.leavePeriod!);

      this.loanDetailsForm
        .get('fieldExecutive')!
        .setValue(leadHeader.fieldExecutiveId!);

      this.loanDetailsForm
        .get('documentCategory')!
        .setValue(leadHeader.documentCategoryId!);

      this.assetDetailsForm.get('assetClass')!.setValue(asset.assetClassId!);

      this.assetDetailsForm.get('assetName')!.setValue(asset.assetMakeId!);

      this.assetDetailsForm.get('assetType')!.setValue(asset.assetTypeId!);

      this.assetDetailsForm.get('assetModel')!.setValue(asset.assetModelId!);

      this.assetDetailsForm
        .get('vehicleNumber')!
        .setValue(asset.vehicleNumber!);

      this.assetDetailsForm.get('engineNumber')!.setValue(asset.engineNumber!);

      this.assetDetailsForm.get('chassisNumber')!.setValue(asset.chasisNumber!);

      this.assetDetailsForm.get('serialNumber')!.setValue(asset.serialNumber!);

      this.assetDetailsForm
        .get('ownership')!
        .setValue(asset.ownershipLookupValueId!);

      this.assetDetailsForm.get('model')!.setValue(asset.model!);

      this.assetDetailsForm
        .get('vehicleType')!
        .setValue(asset.vehicleTypeLookupValueId!);

      this.assetDetailsForm
        .get('taxType')!
        .setValue(asset.taxTypeLookupValueId!);
      this.assetDetailsForm
        .get('fuelType')!
        .setValue(asset.fuelTypeLookupValueId!);
    }
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (this.action['view']) {
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
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
      }
    } else if (this.action['modify']) {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            queryParams: { modify: this.action['modify'] },
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            queryParams: { modify: this.action['modify'] },
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            queryParams: { modify: this.action['modify'] },
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { modify: this.action['modify'] },
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { modify: this.action['modify'] },
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
          this.router.navigate(['/fos/lead-guarantor-1'], {
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            state: { value: event.index },
          });
          break;
      }
    }
  }

  setLineOfBusinesses() {
    this.leadService
      .fetchLineOfBusinesses(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      )
      .subscribe({
        next: (data: any) => {
          this.lineOfBusinesses = data.message;
        },
        error: (error: any) => {},
      });
  }

  setFieldExecutives() {
    this.loaderService.showLoader();
    this.leadService
      .fetchFieldExecutives(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      )
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          this.fieldExecutives = data.message as IFieldExecutive[];
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
        },
      });
  }

  setDocumentCategories() {
    this.loaderService.showLoader();
    this.leadService
      .fetchDocumentCategories(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      )
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          this.documentCategoryLookup = data.message;
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
        },
      });
  }

  setupAssetLookups() {
    this.loaderService.showLoader();
    this.leadService
      .fetchAssetLookup(this.loggedInUser.companyId, this.loggedInUser.userId)
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          let assetLookup = data.message as IFOSLookup[];
          this.assetClassLookup = assetLookup.filter(
            (s) => s.lookupTypeDescription == 'CLASS'
          );
          this.assetModelLookup = assetLookup.filter(
            (s) => s.lookupTypeDescription == 'MODEL'
          );
          this.assetMakeLookup = assetLookup.filter(
            (s) => s.lookupTypeDescription == 'MAKE'
          );
          this.assetTypeLookup = assetLookup.filter(
            (s) => s.lookupTypeDescription == 'TYPE'
          );
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
        },
      });
  }

  private SetupLoanDetailsScreen() {
    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;
    this.leadForm = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });

    if (this.leadHeader) {
      this.leadForm.get('leadNumber')!.setValue(this.leadHeader.leadNumber!);
      this.leadForm
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    }
    this.loanDetailsForm = new FormGroup({
      lineOfBusiness: new FormControl('', [Validators.required]),
      financeAmount: new FormControl('', [Validators.required]),
      tenure: new FormControl('', [Validators.required]),
      tenureType: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      repaymentFrequency: new FormControl('', [Validators.required]),
      leavePeriod: new FormControl('', [Validators.required]),
      fieldExecutive: new FormControl('', [Validators.required]),
      documentCategory: new FormControl('', [Validators.required]),
    });

    this.assetDetailsForm = new FormGroup({
      assetClass: new FormControl('', [Validators.required]),
      assetName: new FormControl('', [Validators.required]),
      assetType: new FormControl('', [Validators.required]),
      assetModel: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl(''),
      engineNumber: new FormControl('', [Validators.required]),
      chassisNumber: new FormControl('', [Validators.required]),
      serialNumber: new FormControl('', [Validators.required]),
      ownership: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      vehicleType: new FormControl('', [Validators.required]),
      taxType: new FormControl('', [Validators.required]),
      fuelType: new FormControl('', [Validators.required]),
    });
  }

  setLookups() {
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    if (lookup) {
      this.leadTypeLookup = lookup.filter((s) => s.lookupTypeId == 4);
      this.repaymentFrequencyLookup = lookup.filter((s) => s.lookupTypeId == 5);
      this.ownershipLookup = lookup.filter((s) => s.lookupTypeId == 6);
      this.fuelTypeLookup = lookup.filter((s) => s.lookupTypeId == 7);
      this.vehicleTypeLookup = lookup.filter((s) => s.lookupTypeId == 8);
      this.taxTypeLookup = lookup.filter((s) => s.lookupTypeId == 9);
      this.tenureTypeLookup = lookup.filter((s) => s.lookupTypeId == 31);
      this.setupAssetLookups();
    }
  }

  submit() {
    this.isSubmitted = true;
    if (
      this.leadForm.valid &&
      this.loanDetailsForm.valid &&
      this.assetDetailsForm.valid
    ) {
      this.isSubmitted = false;
      let leadHeader = {
        leadId: this.leadHeader.leadId,
        prospectId: this.leadHeader.prospectId,
        leadDate: this.leadHeader.leadDate,
        leadNumber: this.leadHeader.leadNumber,
        rate: this.loanDetailsForm.value.rate,
        vehicleRegistrationNumber: this.leadHeader.vehicleRegistrationNumber,
        documentCategoryId: this.loanDetailsForm.value.documentCategory,
        fieldExecutiveId: this.loanDetailsForm.value.fieldExecutive,
        financeAmount: parseFloat(this.loanDetailsForm.value.financeAmount),
        tenure: this.loanDetailsForm.value.tenure,
        tenureLookupTypeId: this.loanDetailsForm.value.tenureType,
        leadTypeLookupValueId: this.leadHeader.leadTypeLookupValueId,
        leavePeriod: this.loanDetailsForm.value.leavePeriod,
        repaymentFrequencyLookupValueId:
          this.loanDetailsForm.value.repaymentFrequency,
        salesPersonId: this.loanDetailsForm.value.fieldExecutive,
      } as ILeadHeader;
      let leadAsset = {
        assetClassId: this.assetDetailsForm.value.assetClass,
        assetMakeId: this.assetDetailsForm.value.assetName,
        assetModelId: this.assetDetailsForm.value.assetModel,
        assetTypeId: this.assetDetailsForm.value.assetType,
        chasisNumber: this.assetDetailsForm.value.chassisNumber,
        engineNumber: this.assetDetailsForm.value.engineNumber,
        fuelTypeLookupValueId: this.assetDetailsForm.value.fuelType,
        model: this.assetDetailsForm.value.model,
        ownershipLookupValueId: this.assetDetailsForm.value.ownership,
        serialNumber: this.assetDetailsForm.value.serialNumber,
        taxTypeLookupValueId: this.assetDetailsForm.value.taxType,
        vehicleNumber: this.assetDetailsForm.value.vehicleNumber,
        vehicleTypeLookupValueId: this.assetDetailsForm.value.vehicleType,
      } as ILeadAssetDetail;

      let lead = {
        companyId: this.loggedInUser.companyId,
        userId: this.loggedInUser.userId,
        lobId: this.loanDetailsForm.value.lineOfBusiness,
        asset: leadAsset,
        header: leadHeader,
        leadDate: this.leadHeader.leadDate,
      } as ILead;
      this.loaderService.showLoader();
      this.leadService.addLeadLoanDetails(lead).subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          var dialogRef = this.dialog.open(ModalComponent, {
            data: {
              title: 'LEAD GENERATION',
              message: `The Lead ${this.leadHeader.leadNumber} has been updated with the Loan Details successfully.`,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.onTabChanged({ index: 2 } as MatTabChangeEvent);
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
