import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  ICustomerProspectData,
  IFOSLookup,
} from '../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSProspectService } from '../../../../../../data/services/feature/prospectMaster/prospects.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrl: './prospect-details.component.scss',
})
/* The ProspectDetailsComponent class in TypeScript defines form groups for basic and prospect details,
handles address addition, validation, and API calls related to prospect data. */
export class ProspectDetailsComponent implements OnInit {
  public basicDetailForm: FormGroup = new FormGroup({});
  public prospectDetailForm: FormGroup = new FormGroup({});
  public countryLookup: IFOSLookup[] = [];
  public genderLookup: IFOSLookup[] = [];
  public prospectTypeLookup: IFOSLookup[] = [];
  public customerProspectData: ICustomerProspectData = {};
  public loggedInUser: any = {};
  constructor(
    private fb: FormBuilder,
    private prospectService: FOSProspectService,
    private utilityService: UtilsService
  ) {
    this.setBasicDetailsForm();
    this.setProspectDetails();
    this.addAddress('communicationAddress');
    this.addAddress('permanantAddress');
  }
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('userDetails') || '');
    this.getProspectLookup();
  }

  setBasicDetailsForm = () => {
    this.basicDetailForm = this.fb.group(
      {
        mobileNumber: this.fb.control('', [Validators.required]),
        aadharNumber: this.fb.control(''),
        panNumber: this.fb.control(''),
      },
      { validators: this.aadharOrPanRequired }
    );
  };

  setProspectDetails = () => {
    this.prospectDetailForm = this.fb.group({
      branch: this.fb.control('', [Validators.required]),
      prospectCode: this.fb.control('', [Validators.required]),
      prospectDate: this.fb.control('', [Validators.required]),
      prospectName: this.fb.control('', [Validators.required]),
      prospectType: this.fb.control('', [Validators.required]),
      website: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required]),
      gender: this.fb.control('', [Validators.required]),
      mobileNumber: this.fb.control('', [Validators.required]),
      alternateMobileNumber: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      communicationAddress: this.fb.array([]),
      permanantAddress: this.fb.array([]),
    });
  };

  setPrimaryKYCUplods() {
    this.prospectDetailForm = this.fb.group({
      aadharNumber: this.fb.control('', [Validators.required]),
      panNumber: this.fb.control('', [Validators.required]),
      aadharImage: this.fb.control('', [Validators.required]),
      panImage: this.fb.control('', [Validators.required]),
      prospectImage: this.fb.control('', [Validators.required]),
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

  addAddress(control: string, data?: any) {
    const value = this.fb.group({
      addressLine1: [data?.addressLine1 ? data?.addressLine1 : ''],
      addressLine2: [data?.addressLine2 ? data?.addressLine2 : ''],
      landmark: [data?.landmark ? data?.landmark : ''],
      city: [data?.city ? data?.city : ''],
      state: [data?.state ? data?.state : ''],
      country: [data?.country ? data?.country : ''],
      pincode: [data?.pincode ? data?.pincode : ''],
    });

    (this.prospectDetailForm.get(control) as FormArray).push(value);
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
    this.prospectService.fetchProspectLookup().subscribe((data: any) => {
      if (data && data.message) {
        let lookItems = data.message as IFOSLookup[];
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
    });
  }

  onSearch() {}

  getBranchLocations() {
    this.prospectService
      .fetchBranchLocation({
        companyId: this.loggedInUser.companyId,
        isActive: false,
        lobId: 0,
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
    this.prospectService
      .fetchCustomerProspect({
        companyId: this.loggedInUser.companyId,
        aadharNumber: this.basicDetailForm.value.aadharNumber,
        mobileNumber: this.basicDetailForm.value.mobileNumber,
        userId: this.loggedInUser.userId,
        panNumber: this.basicDetailForm.value.panNumber,
        prospectId: 0,
      })
      .subscribe((data: any) => {
        if (data && data.message) {
          let customerProspectData = data.message as ICustomerProspectData;
          this.prospectDetailForm
            .get('prospectCode')!
            .setValue(customerProspectData.prospectCode);
          this.prospectDetailForm
            .get('prospectDate')!
            .setValue(
              this.utilityService.transformDate(
                String(customerProspectData.prospectDate),
                'YYYY-MM-DD'
              )
            );
          this.prospectDetailForm
            .get('prospectName')!
            .setValue(customerProspectData.prospectName);
          this.prospectDetailForm
            .get('prospectType')!
            .setValue(customerProspectData.prospectTypeId);
          this.prospectDetailForm
            .get('website')!
            .setValue(customerProspectData.website);
          this.prospectDetailForm
            .get('dob')!
            .setValue(
              this.utilityService.transformDate(
                String(customerProspectData.dateofBirth),
                'YYYY-MM-DD'
              )
            );
          if (customerProspectData.dateofBirth)
            this.prospectDetailForm
              .get('age')!
              .setValue(
                this.utilityService.getAge(
                  String(customerProspectData.dateofBirth)
                )
              );
          this.prospectDetailForm
            .get('gender')!
            .setValue(customerProspectData.genderId);
          this.prospectDetailForm
            .get('mobileNumber')!
            .setValue(customerProspectData.mobileNumber);
          this.prospectDetailForm
            .get('alternateMobileNumber')!
            .setValue(customerProspectData.alternateMobileNumber);
          this.prospectDetailForm
            .get('email')!
            .setValue(customerProspectData.email);

            
            this.prospectDetailForm
            .get('email')!
            .setValue(customerProspectData.email);

            this.prospectDetailForm
            .get('email')!
            .setValue(customerProspectData.email);

            this.prospectDetailForm
            .get('email')!
            .setValue(customerProspectData.email);

            this.prospectDetailForm
            .get('email')!
            .setValue(customerProspectData.email);
          if (customerProspectData.communicationAddress)
            this.addAddress(
              'communicationAddress',
              customerProspectData.communicationAddress
            );
          if (customerProspectData.permanentAddress)
            this.addAddress(
              'permanantAddress',
              customerProspectData.permanentAddress
            );
        }
      });
  }

  saveCustomerProspect() {
    var customerProspectData = {
      aadharNumber: '',
      companyId: 0,
      mobileNumber: '',
      panNumber: '',
      prospectId: 0,
      aadharImagePath: '',
      alternateMobileNumber: '',
      communicationAddress: {},
      email: '',
      genderId: 0,
      genderName: '',
      locationDescription: '',
      locationId: 0,
      panNumberImagePath: '',
      permanentAddress: {},
      prospectCode: '',
      prospectDate: new Date(),
      customerCode: '',
      customerId: 0,
      dateofBirth: new Date(),
      prospectImagePath: '',
      prospectName: '',
      prospectTypeId: 0,
      website: '',
    } as ICustomerProspectData;
    this.prospectService.createNewProspect(customerProspectData).subscribe({
      next(data: any) {},
      error(err: any) {},
    });
  }
}
