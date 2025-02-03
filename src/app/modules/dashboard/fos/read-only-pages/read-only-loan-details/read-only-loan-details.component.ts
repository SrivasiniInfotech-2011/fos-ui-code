import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILeadHeader, IFieldExecutive, ILead, ILeadAssetDetail } from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSLeadMasterService } from '../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';

@Component({
  selector: 'app-read-only-loan-details',
  templateUrl: './read-only-loan-details.component.html',
  styleUrl: './read-only-loan-details.component.scss'
})
export class ReadOnlyLoanDetailsComponent  implements OnInit {
  public leadForm: FormGroup | any = new FormGroup({});
  public loanDetailsForm: FormGroup | any = new FormGroup({});
  public assetDetailsForm: FormGroup | any = new FormGroup({});
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
  public leadId: number = 0;
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
    this.SetupLoanDetailsScreen();
    this.setLookups();
    this.setLineOfBusinesses();
    this.setFieldExecutives();
    this.setDocumentCategories();
    this.sleep(1200);
    let leadDetails = JSON.parse(
      localStorage.getItem('leadDetails') || '{}'
    ) as ILead;

    if (leadDetails) {
      this.leadId = leadDetails.header?.leadId!;
      this.setLeadLoanDetails(
        leadDetails.lobId,
        leadDetails.header!,
        leadDetails.asset!
      );
    }
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
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
    });

    if (this.leadHeader) {
      this.leadForm.get('leadNumber')!.setValue(this.leadHeader.leadNumber!);
      this.leadForm
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    }
    this.loanDetailsForm = new FormGroup({
      lineOfBusiness: new FormControl({ value: '', disabled: true }),
      financeAmount: new FormControl({ value: '', disabled: true }),
      tenure: new FormControl({ value: '', disabled: true }),
      tenureType: new FormControl({ value: '', disabled: true }),
      rate: new FormControl({ value: '', disabled: true }),
      repaymentFrequency: new FormControl({ value: '', disabled: true }),
      leavePeriod: new FormControl({ value: '', disabled: true }),
      fieldExecutive: new FormControl({ value: '', disabled: true }),
      documentCategory: new FormControl({ value: '', disabled: true }),
    });

    this.assetDetailsForm = new FormGroup({
      assetClass: new FormControl({ value: '', disabled: true }),
      assetName: new FormControl({ value: '', disabled: true }),
      assetType: new FormControl({ value: '', disabled: true }),
      assetModel: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl(''),
      engineNumber: new FormControl({ value: '', disabled: true }),
      chassisNumber: new FormControl({ value: '', disabled: true }),
      serialNumber: new FormControl({ value: '', disabled: true }),
      ownership: new FormControl({ value: '', disabled: true }),
      model: new FormControl({ value: '', disabled: true }),
      vehicleType: new FormControl({ value: '', disabled: true }),
      taxType: new FormControl({ value: '', disabled: true }),
      fuelType: new FormControl({ value: '', disabled: true }),
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

}

