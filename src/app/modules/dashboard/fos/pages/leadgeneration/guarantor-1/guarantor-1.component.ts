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
import { Location } from '@angular/common';
@Component({
  selector: 'app-guarantor-1',
  templateUrl: './guarantor-1.component.html',
  styleUrl: './guarantor-1.component.scss',
})
export class Guarantor1Component implements OnInit {
  public guarantor1Form: FormGroup | any = new FormGroup({});
  public guarantor1DetailsForm: FormGroup | any = new FormGroup({});
  public guarantor1CommunicationAddressForm: FormGroup | any = new FormGroup(
    {}
  );
  public guarantor1PermanentAddressForm: FormGroup | any = new FormGroup({});
  public guarantor1KYCForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public selectedTab: any;
  public genderLookup: IFOSLookup[] = [];
  public stateLookup: IFOSLookup[] = [];
  public countryLookup: IFOSLookup[] = [];
  public guarantorRelationshipLookup: IFOSLookup[] = [];
  public guarantorTypeLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};
  private loggedInUser: any = {};
  public action: any;
  public buttonDisabled: boolean = false;
  private mode: string = '';
  private leadId: number = 0;

  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private prospectService: FOSProspectService,
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

    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;

    this.guarantor1Form = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });

    this.guarantor1DetailsForm = new FormGroup({
      guarantorName: new FormControl('', [Validators.required]),
      relationship: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      alternateMobileNumber: new FormControl(''),
      guarantorAmount: new FormControl('', [Validators.required]),
    });
    this.guarantor1CommunicationAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(''),
    });

    this.guarantor1PermanentAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(''),
    });

    this.guarantor1KYCForm = new FormGroup({
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
      guarantorImage: new FormControl(null),
      aadharImage: new FormControl(null),
      panImage: new FormControl(null),
    });
    this.getStates();
    this.getProspectLookup();
    this.sleep(1200);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.action = params;
      if (params['view'] == 'true') {
        this.guarantor1Form.disable();
        this.guarantor1DetailsForm.disable();
        this.guarantor1CommunicationAddressForm.disable();
        this.guarantor1PermanentAddressForm.disable();
        this.buttonDisabled = true;
      } else {
        this.guarantor1Form.enable();
        this.guarantor1DetailsForm.enable();
        this.guarantor1CommunicationAddressForm.enable();
        this.guarantor1PermanentAddressForm.enable();
        this.buttonDisabled = false;
      }

      let leadDetails = JSON.parse(
        localStorage.getItem('leadDetails')!
      ) as ILead;

      if (leadDetails && leadDetails.header)
        this.leadHeader = leadDetails.header;

      if (this.leadHeader) {
        this.guarantor1Form
          .get('leadNumber')!
          .setValue(this.leadHeader.leadNumber!);
        this.guarantor1Form
          .get('vehicleNumber')!
          .setValue(this.leadHeader.vehicleRegistrationNumber!);
      }

      if (
        leadDetails &&
        leadDetails.leadProspectDetail &&
        leadDetails.guarantors
      ) {
        this.leadId = leadDetails.header?.leadId!;
        this.setGuarantorDetails(
          leadDetails.lobId,
          leadDetails.header!,
          leadDetails.guarantors![0]!
        );
      }
    });
  }

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onAadharImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0]; // Get the file object
      console.log('File selected:', file);

      // Update the FormControl with the file object
      this.guarantor1KYCForm.patchValue({ aadharImage: file});
    }
  }

  onPanImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0]; // Get the file object
      console.log('File selected:', file);

      // Update the FormControl with the file object
      this.guarantor1KYCForm.patchValue({ panImage: file});
    }
  }

  onGuarantorImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0]; // Get the file object
      console.log('File selected:', file);
      this.guarantor1KYCForm.patchValue({ guarantorImage: file});
    }
  }

  private setGuarantorDetails(
    lobId: number,
    header: ILeadHeader,
    guarantor: ILeadGuarantor
  ) {
    this.leadHeader = header;
    this.guarantor1Form
      .get('leadNumber')!
      .setValue(this.leadHeader.leadNumber!);
    this.guarantor1Form
      .get('vehicleNumber')!
      .setValue(this.leadHeader.vehicleRegistrationNumber!);
    this.guarantor1DetailsForm
      .get('guarantorName')!
      .setValue(guarantor!.guarantorName);

    this.guarantor1DetailsForm
      .get('relationship')!
      .setValue(guarantor!.guarantorRelationshipLookupValueId);

    this.guarantor1DetailsForm.get('gender')!.setValue(guarantor!.genderId);

    this.guarantor1DetailsForm
      .get('dateOfBirth')!
      .setValue(guarantor!.guaranterDateOfBirth);

    this.guarantor1DetailsForm
      .get('mobileNumber')!
      .setValue(guarantor!.mobileNumber);

    this.guarantor1DetailsForm
      .get('alternateMobileNumber')!
      .setValue(guarantor!.alternateMobileNumber);

    this.guarantor1DetailsForm
      .get('guarantorAmount')!
      .setValue(guarantor!.guarantorAmount);

    this.guarantor1CommunicationAddressForm
      .get('addressLine1')!
      .setValue(guarantor!.communicationAddress?.addressLine1);

    this.guarantor1CommunicationAddressForm
      .get('addressLine2')!
      .setValue(guarantor!.communicationAddress?.addressLine2);

    this.guarantor1CommunicationAddressForm
      .get('landmark')!
      .setValue(guarantor!.communicationAddress?.landmark);

    this.guarantor1CommunicationAddressForm
      .get('city')!
      .setValue(guarantor!.communicationAddress?.city);

    this.guarantor1CommunicationAddressForm
      .get('state')!
      .setValue(guarantor!.communicationAddress?.stateId);

    this.guarantor1CommunicationAddressForm
      .get('country')!
      .setValue(guarantor!.communicationAddress?.countryId);

    this.guarantor1CommunicationAddressForm
      .get('pincode')!
      .setValue(guarantor!.communicationAddress?.pincode);

    this.guarantor1PermanentAddressForm
      .get('addressLine1')!
      .setValue(guarantor!.permanentAddress?.addressLine1);

    this.guarantor1PermanentAddressForm
      .get('addressLine2')!
      .setValue(guarantor!.permanentAddress?.addressLine2);

    this.guarantor1PermanentAddressForm
      .get('landmark')!
      .setValue(guarantor!.permanentAddress?.landmark);

    this.guarantor1PermanentAddressForm
      .get('city')!
      .setValue(guarantor!.permanentAddress?.city);

    this.guarantor1PermanentAddressForm
      .get('state')!
      .setValue(guarantor!.permanentAddress?.stateId);

    this.guarantor1PermanentAddressForm
      .get('country')!
      .setValue(guarantor!.permanentAddress?.countryId);

    this.guarantor1PermanentAddressForm
      .get('pincode')!
      .setValue(guarantor!.permanentAddress?.pincode);

    this.guarantor1KYCForm
      .get('aadharNumber')!
      .setValue(guarantor!.permanentAddress?.addressLine1);

    this.guarantor1KYCForm.get('panNumber')!.setValue(guarantor.panNumber);

    this.guarantor1KYCForm
      .get('guarantorImage')!
      .setValue(guarantor.guarantorImagePath);

    this.guarantor1KYCForm
      .get('aadharImage')!
      .setValue(guarantor.aadharImagePath);

    this.guarantor1KYCForm.get('panImage')!.setValue(guarantor.panImagePath);
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

  back() {
    this.location.back();
  }

  skip() {
    if (this.action['view']) {
      this.router.navigate(['/fos/lead-guarantor-2'], {
        queryParams: { view: this.action['view'] },
        state: { value: 4 },
      });
    } else if (this.action['modify']) {
      this.router.navigate(['/fos/lead-guarantor-2'], {
        queryParams: { modify: this.action['modify'] },
        state: { value: 4 },
      });
    } else {
      this.router.navigate(['/fos/lead-guarantor-2'], { state: { value: 4 } });
    }
  }

  save() {
    this.isSubmitted = true;
    if (
      this.guarantor1Form.valid &&
      this.guarantor1DetailsForm.valid &&
      this.guarantor1CommunicationAddressForm.valid &&
      this.guarantor1PermanentAddressForm.valid &&
      this.guarantor1KYCForm.valid
    ) {
      this.isSubmitted = false;

      let guaranterDetail = {
        genderId: this.guarantor1DetailsForm.value.gender,
        guarantorTypeLookupValueId: 1,
        guarantorRelationshipLookupValueId:
          this.guarantor1DetailsForm.value.relationship,
        guarantorAmount: this.guarantor1DetailsForm.value.guarantorAmount,
        guarantorName: this.guarantor1DetailsForm.value.guarantorName,
        guaranterDateOfBirth: this.guarantor1DetailsForm.value.dateOfBirth,
        mobileNumber: String(this.guarantor1DetailsForm.value.mobileNumber),
        alternateMobileNumber: String(
          this.guarantor1DetailsForm.value.alternateMobileNumber
        ),
        email: '',
        website: '',
        aadharNumber: this.guarantor1KYCForm.value.aadharNumber,
        aadharImagePath: this.guarantor1KYCForm.value.aadharImage,
        panNumber: this.guarantor1KYCForm.value.panNumber,
        panImagePath: this.guarantor1KYCForm.value.panImage,
        guarantorImagePath: this.guarantor1KYCForm.value.guarantorImage,
        prospectId: this.leadHeader.prospectId,
        prospectCode: '',
        communicationAddress: {
          addressLine1:
            this.guarantor1CommunicationAddressForm.value.addressLine1,
          addressLine2:
            this.guarantor1CommunicationAddressForm.value.addressLine2,
          landmark: this.guarantor1CommunicationAddressForm.value.landmark,
          city: this.guarantor1CommunicationAddressForm.value.city,
          stateId: this.guarantor1CommunicationAddressForm.value.state,
          countryId: this.guarantor1CommunicationAddressForm.value.country,
          pincode: String(
            this.guarantor1CommunicationAddressForm.value.pincode
          ),
        } as IAddress,
        permanentAddress: {
          addressLine1: this.guarantor1PermanentAddressForm.value.addressLine1,
          addressLine2: this.guarantor1PermanentAddressForm.value.addressLine2,
          landmark: this.guarantor1PermanentAddressForm.value.landmark,
          city: this.guarantor1PermanentAddressForm.value.city,
          stateId: this.guarantor1PermanentAddressForm.value.state,
          countryId: this.guarantor1PermanentAddressForm.value.country,
          pincode: String(this.guarantor1PermanentAddressForm.value.pincode),
        } as IAddress,
      } as ILeadGuarantor;

      let lead = {
        header: this.leadHeader,
        companyId: this.loggedInUser.companyId,
        locationId: 1,
        userId: this.loggedInUser.userId,
        customerId: 1,
        customerCode: '',
        guarantors: [guaranterDetail] as ILeadGuarantor[],
      } as ILead;
      this.loaderService.showLoader();
      this.leadService.addLeadGuarantors(lead).subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          var dialogRef = this.dialog.open(ModalComponent, {
            data: {
              title: 'LEAD GENERATION',
              message: `The Lead ${this.leadHeader.leadNumber} has been updated with the GuarantorDetails successfully.`,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.onTabChanged({ index: 4 } as MatTabChangeEvent);
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
