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
  IAddress,
  ICustomerProspectData,
  IFOSLookup,
} from '../../../../../../core/interfaces/app/request/IFOSModels';
import { FOSProspectService } from '../../../../../../data/services/feature/prospectMaster/prospects.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';

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
  public kycDetailForm: FormGroup | any = new FormGroup({});
  public countryLookup: IFOSLookup[] = [];
  public genderLookup: IFOSLookup[] = [];
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
    private loaderService: LoaderService
  ) {
    
  }
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('userDetails') || '');
    this.setBasicDetailsForm();
    this.getProspectLookup();
    this.setProspectDetails();
    this.setPrimaryKYCUplods();
    this.addAddress('communicationAddress',{} as IAddress);
    this.addAddress('permanantAddress',{} as IAddress);

    this.aadharImageFilePath = '';
    this.panNumberImageFilePath = '';
    this.prospectImageFilePath = '';
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
    this.kycDetailForm = this.fb.group({
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

  addAddress(control: string, data?: IAddress) {
    const value = this.fb.group({
      addressLine1: data?.addressLine1 ? data?.addressLine1 : '',
      addressLine2: data?.addressLine2 ? data?.addressLine2 : '',
      landmark: data?.landmark ? data?.landmark : '',
      city: data?.city ? data?.city : '',
      state: data?.stateId ? data?.stateId : 0,
      country: data?.countryId ? data?.countryId : 0,
      pincode: data?.pincode ? data?.pincode : '',
    });

    (this.prospectDetailForm.get(control) as FormArray)?.push(value);
  }

  setAddress(control: string, data?: IAddress) {
    this.prospectDetailForm.get(control).controls[0].setValue({
      addressLine1: data?.addressLine1 ? data?.addressLine1 : '',
      addressLine2: data?.addressLine2 ? data?.addressLine2 : '',
      landmark: data?.landmark ? data?.landmark : '',
      city: data?.city ? data?.city : '',
      state: data?.stateId ? data?.stateId : 0,
      country: data?.countryId ? data?.countryId : 0,
      pincode: data?.pincode ? data?.pincode : '',
     });
    //   addressLine1: [data?.addressLine1 ? data?.addressLine1 : ''],
    //   addressLine2: [data?.addressLine2 ? data?.addressLine2 : ''],
    //   landmark: [data?.landmark ? data?.landmark : ''],
    //   city: [data?.city ? data?.city : ''],
    //   state: [data?.stateId ? data?.stateId : 0],
    //   country: [data?.countryId ? data?.countryId : 0],
    //   pincode: [data?.pincode ? data?.pincode : ''],
    // });

    // (this.prospectDetailForm.get(control) as FormArray)?.push(value);
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
      this.loaderService.hideLoader();
      if (data && data.message) {
        let lookItems = data.message as IFOSLookup[];
        localStorage.setItem('lookups', JSON.stringify(lookItems));
        this.SetLookups(lookItems);
      }
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
      .subscribe((data: any) => {
        if (data && data.message) {
          let lookItems = JSON.parse(
            localStorage.getItem('lookups')!
          ) as IFOSLookup[];
          this.SetLookups(lookItems);
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

          this.kycDetailForm
            .get('aadharNumber')!
            .setValue(customerProspectData.aadharNumber);

          this.kycDetailForm
            .get('panNumber')!
            .setValue(customerProspectData.panNumber);

          this.aadharImageFilePath = customerProspectData.aadharImagePath!;
          this.panNumberImageFilePath =
            customerProspectData.panNumberImagePath!;
          this.prospectImageFilePath = customerProspectData.prospectImagePath!;

          if (customerProspectData.communicationAddress)
            this.setAddress(
              'communicationAddress',
              customerProspectData.communicationAddress
            );
          if (customerProspectData.permanentAddress)
            this.setAddress(
              'permanantAddress',
              customerProspectData.permanentAddress
            );
        }
        this.loaderService.hideLoader();
      });
  }

  saveCustomerProspect() {
    const kycData = this.kycDetailForm.value;
    const prospectData = this.prospectDetailForm.value;
    var customerProspectData = {
      aadharNumber: kycData.aadharNumber,
      companyId: 0,
      mobileNumber: prospectData.mobileNumber,
      panNumber: kycData.panNumber,
      prospectId: 0,
      aadharImagePath: kycData.aadharImagePath,
      alternateMobileNumber: prospectData.alternateMobileNumber,
      communicationAddress: prospectData.communicationAddress,
      email: prospectData.email,
      genderId: prospectData.gender,
      genderName: prospectData.gender,
      locationDescription: '',
      locationId: 0,
      panNumberImagePath: kycData.panImage,
      permanentAddress: prospectData.permanentAddress,
      prospectCode: prospectData.prospectCode,
      prospectDate: prospectData.prospectDate,
      customerCode: '',
      customerId: 0,
      dateofBirth: prospectData.dob,
      prospectImagePath: kycData.prospectImage,
      prospectName: prospectData.prospectName,
      prospectTypeId: prospectData.prospectTypeId,
      website: prospectData.website,
    } as ICustomerProspectData;
    this.prospectService.createNewProspect(customerProspectData).subscribe({
      next(data: any) {},
      error(err: any) {},
    });
  }
}
