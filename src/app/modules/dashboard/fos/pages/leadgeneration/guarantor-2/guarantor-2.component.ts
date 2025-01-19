import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  IAddress,
  IFOSLookup,
} from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSProspectService } from '../../../../../../../data/services/feature/prospectMaster/prospects.service';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  ILead,
  ILeadGuarantor,
  ILeadHeader,
} from '../../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { ModalComponent } from '../../../../../../shared/components/modal/modal-component';
import { guarantorAmountValidator } from '../../../../../../../core/validators/guarantorAmountValidator';
import { Web } from '../../../../../../../core/common/literals';
@Component({
  selector: 'app-guarantor-2',
  templateUrl: './guarantor-2.component.html',
  styleUrl: './guarantor-2.component.scss',
})
export class Guarantor2Component implements OnInit {
  public guarantor2Form: FormGroup | any = new FormGroup({});
  public guarantor2DetailsForm: FormGroup | any = new FormGroup({});
  public guarantor2CommunicationAddressForm: FormGroup | any = new FormGroup(
    {}
  );
  public guarantor2PermanentAddressForm: FormGroup | any = new FormGroup({});
  public guarantor2KYCForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public selectedTab: any;
  public genderLookup: IFOSLookup[] = [];
  public stateLookup: IFOSLookup[] = [];
  public countryLookup: IFOSLookup[] = [];
  public guarantorRelationshipLookup: IFOSLookup[] = [];
  public guarantorTypeLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};
  private loggedInUser: any = {};
  private mode: string = '';
  private leadId: number = 0;
  public action: any = {};
  public buttonDisabled: boolean = false;
  public aadharFileName: string = '';
  public guarantorFileName: string = '';
  public panFileName: string = '';
  public aadharFileContent: string = '';
  public guarantorFileContent: string = '';
  public panFileContent: string = '';
  private allowedExtensions: string[] = ['png', 'jpg', 'jpeg'];
  public guarantorImageFilePath: string = '';
  public aadharImageFilePath: string = '';
  public panNumberImageFilePath: string = '';
  public prospectType: string = '';
  public isCreateMode: boolean = false;
  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private loaderService: LoaderService,
    private prospectService: FOSProspectService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location
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

    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;

    if (this.leadHeader) {
      this.guarantor2Form
        .get('leadNumber')!
        .setValue(this.leadHeader.leadNumber!);
      this.guarantor2Form
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    }
    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;
    let leadDetails = JSON.parse(localStorage.getItem('leadDetails')!) as ILead;
    let financeAmount =
      leadDetails && leadDetails.header && leadDetails.guarantors
        ? leadDetails.header?.financeAmount! +
          Number(leadDetails.guarantors[0]?.guarantorAmount!)
        : 0;
    this.generateGuarantorForm(financeAmount);
    this.getStates();
    this.getProspectLookup();
    this.sleep(1200);

    this.route.queryParams.subscribe((params: Params) => {
      this.action = params;
      if (params['status'] == 'View') {
        this.guarantor2Form.disable();
        this.guarantor2DetailsForm.disable();
        this.guarantor2CommunicationAddressForm.disable();
        this.guarantor2KYCForm.disable();
        this.buttonDisabled = true;
      } else if (params['status'] == 'Modify') {
        this.guarantor2Form.enable();
        this.guarantor2DetailsForm.enable();
        this.guarantor2CommunicationAddressForm.enable();
        this.guarantor2PermanentAddressForm.enable();
        this.buttonDisabled = false;
      } else {
        this.guarantor2Form.enable();
        this.guarantor2DetailsForm.enable();
        this.guarantor2CommunicationAddressForm.enable();
        this.guarantor2PermanentAddressForm.enable();
        this.buttonDisabled = false;
        this.isCreateMode = true;
      }

      let leadDetails = JSON.parse(
        localStorage.getItem('leadDetails')!
      ) as ILead;

      if (leadDetails && leadDetails.header)
        this.leadHeader = leadDetails.header;

      if (this.leadHeader) {
        this.guarantor2Form
          .get('leadNumber')!
          .setValue(this.leadHeader.leadNumber!);
        this.guarantor2Form
          .get('vehicleNumber')!
          .setValue(this.leadHeader.vehicleRegistrationNumber!);
      }

      this.leadId = leadDetails?.header?.leadId!;
      this.setGuarantorDetails(
        leadDetails?.lobId,
        leadDetails?.header!,
        leadDetails?.guarantors![1]!
      );
    });
  }

  private generateGuarantorForm(totalLoanAmount: number) {
    this.guarantor2Form = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });
    this.guarantor2DetailsForm = new FormGroup({
      guarantorName: new FormControl('', [Validators.required]),
      relationship: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$'),
      ]),
      alternateMobileNumber: new FormControl(
        '',
        Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$')
      ),
      guarantorAmount: new FormControl('', [
        Validators.required,
        guarantorAmountValidator(0, totalLoanAmount),
      ]),
    });

    this.guarantor2CommunicationAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(''),
    });

    this.guarantor2PermanentAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(''),
    });

    this.guarantor2KYCForm = new FormGroup({
      aadharNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$'),
      ]),
      panNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
      ]),
      guarantorImage: new FormControl('', [Validators.required]),
      aadharImage: new FormControl('', [Validators.required]),
      panImage: new FormControl('', [Validators.required]),
    });
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onAadharImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];

      const extension = file.name.split('.').pop()?.toLowerCase();
      const fileSizeInMB = file.size / (1024 * 1024);
      // Validate file extension
      if (extension && !this.allowedExtensions.includes(extension)) {
        this.aadharFileName = '';
        this.aadharFileContent = '';
        this.toasterService.show(
          'Invalid file type. Please upload a png or jpg file.',
          'File Upload'
        );
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.aadharFileContent = reader.result.toString().split(',')[1];
        }
      };
      if (fileSizeInMB > Web.MAX_FILE_SIZE_MB) {
        this.aadharFileName = '';
        this.aadharFileContent = '';
        this.toasterService.show(
          `File size exceeds ${
            Web.MAX_FILE_SIZE_MB
          } MB. Current size: ${fileSizeInMB.toFixed(2)} MB.`,
          'File Upload'
        );
      }
      this.aadharFileName = file.name;

      reader.readAsDataURL(file);
    }
  }

  onPanImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];

      const extension = file.name.split('.').pop()?.toLowerCase();
      const fileSizeInMB = file.size / (1024 * 1024);
      // Validate file extension
      if (extension && !this.allowedExtensions.includes(extension)) {
        this.panFileName = '';
        this.panFileContent = '';
        this.toasterService.show(
          'Invalid file type. Please upload a png or jpg file.',
          'File Upload'
        );
      }
      if (fileSizeInMB > Web.MAX_FILE_SIZE_MB) {
        this.panFileContent = '';
        this.panFileName = '';
        this.toasterService.show(
          `File size exceeds ${
            Web.MAX_FILE_SIZE_MB
          } MB. Current size: ${fileSizeInMB.toFixed(2)} MB.`,
          'File Upload'
        );
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.panFileContent = reader.result.toString().split(',')[1];
        }
      };
      this.panFileName = file.name;

      reader.readAsDataURL(file);
    }
  }

  onGuarantorImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];

      const extension = file.name.split('.').pop()?.toLowerCase();
      const fileSizeInMB = file.size / (1024 * 1024);
      // Validate file extension
      if (extension && !this.allowedExtensions.includes(extension)) {
        this.guarantorFileName = '';
        this.guarantorFileContent = '';
        this.toasterService.show(
          'Invalid file type. Please upload a png or jpg file.',
          'File Upload'
        );
      }
      if (fileSizeInMB > Web.MAX_FILE_SIZE_MB) {
        this.guarantorFileContent = '';
        this.guarantorFileName = '';
        this.toasterService.show(
          `File size exceeds ${
            Web.MAX_FILE_SIZE_MB
          } MB. Current size: ${fileSizeInMB.toFixed(2)} MB.`,
          'File Upload'
        );
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.guarantorFileContent = reader.result.toString().split(',')[1];
        }
      };
      this.guarantorFileName = file.name;

      reader.readAsDataURL(file);
    }
  }

  private setGuarantorDetails(
    lobId: number,
    header: ILeadHeader,
    guarantor: ILeadGuarantor
  ) {
    this.leadHeader = this.leadHeader;

    if (this.leadHeader && guarantor) {
      this.guarantor2DetailsForm
        .get('guarantorName')!
        .setValue(guarantor?.guarantorName);

      this.guarantor2DetailsForm
        .get('relationship')!
        .setValue(guarantor?.guarantorRelationshipLookupValueId);

      this.guarantor2DetailsForm.get('gender')!.setValue(guarantor?.genderId);

      this.guarantor2DetailsForm
        .get('dateOfBirth')!
        .setValue(guarantor?.guaranterDateOfBirth);

      this.guarantor2DetailsForm
        .get('mobileNumber')!
        .setValue(guarantor?.mobileNumber);

      this.guarantor2DetailsForm
        .get('alternateMobileNumber')!
        .setValue(guarantor?.alternateMobileNumber);

      this.guarantor2DetailsForm
        .get('guarantorAmount')!
        .setValue(guarantor?.guarantorAmount);

      this.guarantor2CommunicationAddressForm
        .get('addressLine1')!
        .setValue(guarantor?.communicationAddress?.addressLine1);

      this.guarantor2CommunicationAddressForm
        .get('addressLine2')!
        .setValue(guarantor?.communicationAddress?.addressLine2);

      this.guarantor2CommunicationAddressForm
        .get('landmark')!
        .setValue(guarantor?.communicationAddress?.landmark);

      this.guarantor2CommunicationAddressForm
        .get('city')!
        .setValue(guarantor?.communicationAddress?.city);

      this.guarantor2CommunicationAddressForm
        .get('state')!
        .setValue(guarantor?.communicationAddress?.stateId);

      this.guarantor2CommunicationAddressForm
        .get('country')!
        .setValue(guarantor?.communicationAddress?.countryId);

      this.guarantor2CommunicationAddressForm
        .get('pincode')!
        .setValue(guarantor?.communicationAddress?.pincode);

      this.guarantor2PermanentAddressForm
        .get('addressLine1')!
        .setValue(guarantor?.permanentAddress?.addressLine1);

      this.guarantor2PermanentAddressForm
        .get('addressLine2')!
        .setValue(guarantor?.permanentAddress?.addressLine2);

      this.guarantor2PermanentAddressForm
        .get('landmark')!
        .setValue(guarantor?.permanentAddress?.landmark);

      this.guarantor2PermanentAddressForm
        .get('city')!
        .setValue(guarantor?.permanentAddress?.city);

      this.guarantor2PermanentAddressForm
        .get('state')!
        .setValue(guarantor?.permanentAddress?.stateId);

      this.guarantor2PermanentAddressForm
        .get('country')!
        .setValue(guarantor?.permanentAddress?.countryId);

      this.guarantor2PermanentAddressForm
        .get('pincode')!
        .setValue(guarantor?.permanentAddress?.pincode);

      this.guarantor2KYCForm
        .get('aadharNumber')!
        .setValue(guarantor?.permanentAddress?.addressLine1);

      this.guarantor2KYCForm.get('panNumber')!.setValue(guarantor?.panNumber);

      this.guarantor2KYCForm
        .get('guarantorImage')!
        .setValue(guarantor?.guarantorImagePath);

      this.guarantor2KYCForm
        .get('aadharImage')!
        .setValue(guarantor?.aadharImagePath);

      this.guarantor2KYCForm.get('panImage')!.setValue(guarantor?.panImagePath);

      this.aadharImageFilePath = guarantor.aadharImagePath!;
      this.panNumberImageFilePath = guarantor.panImagePath!;
      this.guarantorImageFilePath = guarantor.guarantorImagePath!;
    }
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

  back() {
    this.router.navigate(['/fos/lead-guarantor-1'], {
      queryParams: { status: this.action['status'] },
      state: { value: 3 },
    });
  }

  skip() {
    this.router.navigate(['/fos/lead-prospect-detail'], {
      queryParams: { status: this.action['status'] },
      state: { value: 0 },
    });
  }

  getStates() {
    this.loaderService.showLoader();
    this.prospectService.fetchStates().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          this.stateLookup = lookItems;
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }

  getProspectLookup() {
    this.loaderService.showLoader();
    this.prospectService.fetchProspectLookup().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          this.setLookups(lookItems);
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }

  private setLookups(lookItems: IFOSLookup[]) {
    this.genderLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 2
    );
    this.countryLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 22
    );
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    this.guarantorRelationshipLookup = lookup.filter(
      (s) => s.lookupTypeId == 18
    );
    this.guarantorTypeLookup = lookup.filter((s) => s.lookupTypeId == 17);
  }

  save() {
    this.isSubmitted = true;
    if (
      this.guarantor2Form.valid &&
      this.guarantor2DetailsForm.valid &&
      this.guarantor2CommunicationAddressForm.valid &&
      this.guarantor2PermanentAddressForm.valid &&
      this.guarantor2KYCForm.valid
    ) {
      this.isSubmitted = false;
      let aadharFilePath = this.aadharFileName
        ? this.aadharFileName
        : this.aadharImageFilePath;
      let panFilePath = this.panFileName
        ? this.panFileName
        : this.panNumberImageFilePath;
      let guarantorImagePath = this.guarantorFileName
        ? this.guarantorFileName
        : this.guarantorImageFilePath;

      let guaranterDetail = {
        genderId: this.guarantor2DetailsForm.value.gender,
        guarantorTypeLookupValueId: 1,
        guarantorRelationshipLookupValueId:
          this.guarantor2DetailsForm.value.relationship,
        guarantorAmount: this.guarantor2DetailsForm.value.guarantorAmount,
        guarantorName: this.guarantor2DetailsForm.value.guarantorName,
        guaranterDateOfBirth: this.guarantor2DetailsForm.value.dateOfBirth,
        mobileNumber: String(this.guarantor2DetailsForm.value.mobileNumber),
        alternateMobileNumber: String(
          this.guarantor2DetailsForm.value.alternateMobileNumber
        ),
        email: '',
        website: '',
        aadharNumber: this.guarantor2KYCForm.value.aadharNumber,
        aadharImagePath: aadharFilePath,
        aadharImageContent: this.aadharFileContent,
        panNumber: this.guarantor2KYCForm.value.panNumber,
        panImagePath: panFilePath,
        panImageContent: this.panFileContent,
        guarantorImagePath: guarantorImagePath,
        guarantorImageContent: this.guarantorFileContent,
        prospectId: this.leadHeader.prospectId,
        prospectCode: '',
        communicationAddress: {
          addressLine1:
            this.guarantor2CommunicationAddressForm.value.addressLine1,
          addressLine2:
            this.guarantor2CommunicationAddressForm.value.addressLine2,
          landmark: this.guarantor2CommunicationAddressForm.value.landmark,
          city: this.guarantor2CommunicationAddressForm.value.city,
          stateId: this.guarantor2CommunicationAddressForm.value.state,
          countryId: this.guarantor2CommunicationAddressForm.value.country,
          pincode: String(
            this.guarantor2CommunicationAddressForm.value.pincode
          ),
        } as IAddress,
        permanentAddress: {
          addressLine1: this.guarantor2PermanentAddressForm.value.addressLine1,
          addressLine2: this.guarantor2PermanentAddressForm.value.addressLine2,
          landmark: this.guarantor2PermanentAddressForm.value.landmark,
          city: this.guarantor2PermanentAddressForm.value.city,
          stateId: this.guarantor2PermanentAddressForm.value.state,
          countryId: this.guarantor2PermanentAddressForm.value.country,
          pincode: String(this.guarantor2PermanentAddressForm.value.pincode),
        } as IAddress,
      } as ILeadGuarantor;

      let leadDetail = JSON.parse(
        String(localStorage.getItem('leadDetails'))
      ) as ILead;
      let guarantors = leadDetail.guarantors;
      if (guarantors) guarantors.push(guaranterDetail);
      let lead = {
        header: this.leadHeader,
        companyId: this.loggedInUser.companyId,
        locationId: 1,
        userId: this.loggedInUser.userId,
        customerId: 1,
        customerCode: '',
        guarantors: guarantors,
      } as ILead;
      this.loaderService.showLoader();
      this.leadService.addLeadGuarantors(lead).subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          localStorage.setItem('leadDetails', JSON.stringify(lead));
          this.dialog.open(ModalComponent, {
            data: {
              title: 'LEAD GENERATION',
              message: `The Lead ${this.leadHeader.leadNumber} has been updated with the Guarantor Details successfully.`,
            },
          });
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          this.toasterService.show(error);
        },
      });
    } else {
      this.utilityService.markAllControls(this.guarantor2Form, true);
      this.utilityService.markAllControls(this.guarantor2DetailsForm, true);
      this.utilityService.markAllControls(
        this.guarantor2CommunicationAddressForm,
        true
      );
      this.utilityService.markAllControls(
        this.guarantor2PermanentAddressForm,
        true
      );
      this.utilityService.markAllControls(this.guarantor2KYCForm, true);
    }
  }

  copyCommunicationAddress(event: any) {
    var commAddress = {} as IAddress;
    if (event.target.checked)
      commAddress = {
        addressLine1:
          this.guarantor2CommunicationAddressForm.value.addressLine1,
        addressLine2:
          this.guarantor2CommunicationAddressForm.value.addressLine2,
        landmark: this.guarantor2CommunicationAddressForm.value.landmark,
        city: this.guarantor2CommunicationAddressForm.value.city,
        stateId: this.guarantor2CommunicationAddressForm.value.state,
        countryId: this.guarantor2CommunicationAddressForm.value.country,
        pincode: this.guarantor2CommunicationAddressForm.value.pincode,
      } as IAddress;

    this.guarantor2PermanentAddressForm
      .get('addressLine1')!
      .setValue(commAddress.addressLine1);

    this.guarantor2PermanentAddressForm
      .get('addressLine2')!
      .setValue(commAddress.addressLine2);

    this.guarantor2PermanentAddressForm
      .get('landmark')!
      .setValue(commAddress.landmark);

    this.guarantor2PermanentAddressForm.get('city')!.setValue(commAddress.city);

    this.guarantor2PermanentAddressForm
      .get('state')!
      .setValue(commAddress.stateId);

    this.guarantor2PermanentAddressForm
      .get('country')!
      .setValue(commAddress.countryId);

    this.guarantor2PermanentAddressForm
      .get('pincode')!
      .setValue(commAddress.pincode);
  }
}
