import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  IAddress,
  ICreateProspectRequest,
  ICustomerProspectData,
  IFOSLookup,
} from '../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSProspectService } from '../../../../../../data/services/feature/prospectMaster/prospects.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrl: './prospect-details.component.scss',
})
/* The ProspectDetailsComponent class in TypeScript defines form groups for basic and prospect details,
handles address addition, validation, and API calls related to prospect data. */
export class ProspectDetailsComponent implements OnInit {
  public basicDetailForm: FormGroup | any = new FormGroup({});
  public prospectDetailForm: FormGroup | any = new FormGroup({});
  public communicationAddressForm: FormGroup | any = new FormGroup({});
  public permanantAddressForm: FormGroup | any = new FormGroup({});
  public kycDetailForm: FormGroup | any = new FormGroup({});
  public countryLookup: IFOSLookup[] = [];
  public genderLookup: IFOSLookup[] = [];
  public stateLookup: IFOSLookup[] = [];
  public prospectTypeLookup: IFOSLookup[] = [];
  public customerProspectData: ICustomerProspectData = {};
  public loggedInUser: any = {};
  public aadharImageFilePath: string = '';
  public panNumberImageFilePath: string = '';
  public prospectImageFilePath: string = '';
  constructor(
    private fb: FormBuilder,
    private prospectService: FOSProspectService,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('userDetails')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('userDetails') || '');
    }
    this.refreshForm();
  }

  setBasicDetailsForm = () => {
    this.basicDetailForm = this.fb.group(
      {
        mobileNumber: this.fb.control('', [Validators.required]),
        aadharNumber: this.fb.control('', [Validators.required]),
        panNumber: this.fb.control('', [Validators.required]),
      },
      { validators: this.aadharOrPanRequired }
    );
  };

  setProspectDetails = () => {
    this.prospectDetailForm = this.fb.group({
      branch: this.fb.control('', [Validators.required]),
      prospectCode: this.fb.control(''),
      prospectDate: this.fb.control('', [Validators.required]),
      prospectName: this.fb.control('', [Validators.required]),
      prospectType: this.fb.control('', [Validators.required]),
      website: this.fb.control(''),
      dob: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required]),
      gender: this.fb.control('', [Validators.required]),
      mobileNumber: this.fb.control('', [Validators.required]),
      alternateMobileNumber: this.fb.control(''),
      email: this.fb.control(''),
      // communicationAddress: this.fb.array([]),
      // permanantAddress: this.fb.array([]),
    });
  };

  private refreshForm() {
    this.setBasicDetailsForm();
    this.getProspectLookup();
    this.getStates();
    this.setProspectDetails();
    this.setPrimaryKYCUplods();
    this.setCommunicationAddress();
    this.setPermanantAddress();
    this.addAddress('communicationAddress', {} as IAddress);
    this.addAddress('permanantAddress', {} as IAddress);

    this.aadharImageFilePath = '';
    this.panNumberImageFilePath = '';
    this.prospectImageFilePath = '';
  }

  setPrimaryKYCUplods() {
    this.kycDetailForm = this.fb.group({
      aadharNumber: this.fb.control('', [Validators.required]),
      panNumber: this.fb.control('', [Validators.required]),
      aadharImage: this.fb.control('', [Validators.required]),
      panImage: this.fb.control('', [Validators.required]),
      prospectImage: this.fb.control('', [Validators.required]),
    });
  }
  setCommunicationAddress() {
    this.communicationAddressForm = this.fb.group({
      addressLine1: this.fb.control('', [Validators.required]),
      addressLine2: this.fb.control(''),
      landmark: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
      pincode: this.fb.control('', [Validators.required]),
    });
  }
  setPermanantAddress() {
    this.permanantAddressForm = this.fb.group({
      addressLine1: this.fb.control('', [Validators.required]),
      addressLine2: this.fb.control(''),
      landmark: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      state: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
      pincode: this.fb.control('', [Validators.required]),
    });
  }
  get communicationAddressFormValue() {
    return this.prospectDetailForm.controls[
      'communicationAddress'
    ] as FormArray;
  }

  get permanantAddressFormValue() {
    return this.prospectDetailForm.controls['permanantAddress'] as FormArray;
  }

  addAddress(control: string, data?: IAddress) {
    const value = this.fb.group({
      addressLine1: [
        data?.addressLine1 ? data?.addressLine1 : '',
        Validators.required,
      ],
      addressLine2: [data?.addressLine2 ? data?.addressLine2 : ''],
      landmark: [data?.landmark ? data?.landmark : '', Validators.required],
      city: [data?.city ? data?.city : '', Validators.required],
      state: [data?.stateId ? data?.stateId : '', Validators.required],
      country: [data?.countryId ? data?.countryId : '', Validators.required],
      pincode: [data?.pincode ? data?.pincode : '', Validators.required],
    });

    (this.prospectDetailForm.get(control) as FormArray)?.push(value);
  }

  setCommunicationAddressData(data?: IAddress) {
    this.communicationAddressForm
      .get('addressLine1')!
      .setValue(data!.addressLine1);
    this.communicationAddressForm
      .get('addressLine2')!
      .setValue(data!.addressLine2);
    this.communicationAddressForm.get('landmark')!.setValue(data!.landmark);
    this.communicationAddressForm.get('city')!.setValue(data!.city);
    this.communicationAddressForm.get('state')!.setValue(data!.stateId);
    this.communicationAddressForm.get('country')!.setValue(+data!.countryId);
  }

  setPermanentAddressData(data?: IAddress) {
    this.permanantAddressForm.get('addressLine1')!.setValue(data!.addressLine1);
    this.permanantAddressForm.get('addressLine2')!.setValue(data!.addressLine2);
    this.permanantAddressForm.get('landmark')!.setValue(data!.landmark);
    this.permanantAddressForm.get('city')!.setValue(data!.city);
    this.permanantAddressForm.get('state')!.setValue(data!.stateId);
    this.permanantAddressForm.get('country')!.setValue(+data!.countryId);
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
  getProspectLookup() {
    this.prospectService.fetchProspectLookup().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          localStorage.setItem('lookups', JSON.stringify(lookItems));
          this.SetLookups(lookItems);
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }

  getStates() {
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

  private SetLookups(lookItems: IFOSLookup[]) {
    this.prospectTypeLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 1
    );
    this.genderLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 2
    );
    this.countryLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 22
    );
  }

  getBranchLocations() {
    this.prospectService
      .fetchBranchLocation({
        companyId: this.loggedInUser.companyId,
        isActive: false,
        lobId: 1,
        userId: this.loggedInUser.userId,
      })
      .subscribe({
        next(data: any) {
          console.log(data);
        },
        error(err: any) {},
      });
  }

  getCustomerProspect() {
    this.loaderService.showLoader();
    this.prospectService
      .fetchCustomerProspect({
        companyId: this.loggedInUser.companyId,
        aadharNumber: this.basicDetailForm.value.aadharNumber,
        mobileNumber: this.basicDetailForm.value.mobileNumber,
        userId: this.loggedInUser.userId,
        panNumber: this.basicDetailForm.value.panNumber,
        prospectId: 0,
      })
      .subscribe({
        next: (data: any) => {
          if (data && data.message) {
            let lookItems = JSON.parse(
              localStorage.getItem('lookups')!
            ) as IFOSLookup[];
            this.SetLookups(lookItems);
            this.customerProspectData = data.message as ICustomerProspectData;
            this.prospectDetailForm
              .get('prospectCode')!
              .setValue(this.customerProspectData.prospectCode);

            this.prospectDetailForm
              .get('mobileNumber')!
              .setValue(this.basicDetailForm.value.mobileNumber);

            this.prospectDetailForm
              .get('prospectDate')!
              .setValue(
                this.utilityService.transformDate(
                  String(this.customerProspectData.prospectDate),
                  'YYYY-MM-DD'
                )
              );
            this.prospectDetailForm
              .get('prospectName')!
              .setValue(this.customerProspectData.prospectName);
            this.prospectDetailForm
              .get('prospectType')!
              .setValue(this.customerProspectData.prospectTypeId);
            this.prospectDetailForm
              .get('website')!
              .setValue(this.customerProspectData.website);
            this.prospectDetailForm
              .get('dob')!
              .setValue(
                this.utilityService.transformDate(
                  String(this.customerProspectData.dateofBirth),
                  'YYYY-MM-DD'
                )
              );
            if (this.customerProspectData.dateofBirth)
              this.prospectDetailForm
                .get('age')!
                .setValue(
                  this.utilityService.getAge(
                    String(this.customerProspectData.dateofBirth)
                  )
                );
            this.prospectDetailForm
              .get('gender')!
              .setValue(this.customerProspectData.genderId);

            this.prospectDetailForm
              .get('alternateMobileNumber')!
              .setValue(this.customerProspectData.alternateMobileNumber);
            this.prospectDetailForm
              .get('email')!
              .setValue(this.customerProspectData.email);

            this.kycDetailForm
              .get('aadharNumber')!
              .setValue(this.customerProspectData.aadharNumber);

            this.kycDetailForm
              .get('panNumber')!
              .setValue(this.customerProspectData.panNumber);

            this.basicDetailForm
              .get('panNumber')!
              .setValue(this.customerProspectData.panNumber);

            this.aadharImageFilePath =
              this.customerProspectData.aadharImagePath!;
            this.panNumberImageFilePath =
              this.customerProspectData.panNumberImagePath!;
            this.prospectImageFilePath =
              this.customerProspectData.prospectImagePath!;

            if (this.customerProspectData.communicationAddress)
              this.setCommunicationAddressData(
                this.customerProspectData.communicationAddress
              );
            if (this.customerProspectData.permanentAddress)
              this.setPermanentAddressData(
                this.customerProspectData.permanentAddress
              );
            this.loaderService.hideLoader();
          }
        },

        error: (error: Error) => {
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

  saveCustomerProspect() {
    this.loaderService.showLoader();
    const kycData = this.kycDetailForm.value;
    const prospectData = this.prospectDetailForm.value;
    const communicationAddress = this.communicationAddressForm.value;
    const permanentAddress = this.permanantAddressForm.value;
    var customerProspectRequestData = {
      aadharNumber: kycData.aadharNumber,
      companyId: this.loggedInUser.companyId,
      mobileNumber: prospectData.mobileNumber,
      panNumber: kycData.panNumber,
      prospectId: 0,
      aadharImagePath: kycData.aadharImage,
      alternateMobileNumber: prospectData.alternateMobileNumber,
      communicationAddress: {
        addressLine1: communicationAddress.addressLine1,
        addressLine2: communicationAddress.addressLine2,
        city: communicationAddress.city,
        countryId: communicationAddress.country,
        landmark: communicationAddress.landmark,
        pincode: communicationAddress.pincode,
        stateId: communicationAddress.state,
      },
      email: prospectData.email,
      genderId: prospectData.gender,
      genderName: '',
      locationDescription: '',
      locationId: 0,
      panNumberImagePath: kycData.panImage,
      permanentAddress: {
        addressLine1: permanentAddress.addressLine1,
        addressLine2: permanentAddress.addressLine2,
        city: permanentAddress.city,
        countryId: permanentAddress.country,
        landmark: permanentAddress.landmark,
        pincode: permanentAddress.pincode,
        stateId: permanentAddress.state,
      },
      prospectCode: prospectData.prospectCode,
      prospectDate: prospectData.prospectDate,
      customerCode: '',
      customerId: 1,
      dateofBirth: prospectData.dob,
      prospectImagePath: kycData.prospectImage,
      prospectName: prospectData.prospectName,
      prospectTypeId: this.customerProspectData.prospectTypeId,
      website: prospectData.website,
    } as ICustomerProspectData;

    var request = {
      userId: this.loggedInUser.userId,
      prospect: customerProspectRequestData,
    } as ICreateProspectRequest;

    this.prospectService.createNewProspect(request).subscribe({
      next: (data: any) => {
        this.toasterService.success(data.message, 'Update Prospect Details', {
          timeOut: 3000,
        });
        this.loaderService.hideLoader();
        this.refreshForm();
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
