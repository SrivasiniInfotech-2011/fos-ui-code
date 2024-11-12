import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormControlDirective, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrl: './prospect-details.component.scss',
})
export class ProspectDetailsComponent {
  public basicDetailForm: FormGroup = new FormGroup({});
  public prospectDetailForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ) {
    this.setBasicDetailsForm();
    this.setProspectDetails();
    this.addAddress('communicationAddress')
    this.addAddress('permanantAddress')
  }

  setBasicDetailsForm = () => {
    this.basicDetailForm = this.fb.group({
      mobileNumber: this.fb.control('', [Validators.required]),
      aadharNumber: this.fb.control(''),
      panNumber: this.fb.control(''),
    }, { validators: this.aadharOrPanRequired })
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
      communicationAddress:this.fb.array([]),
      permanantAddress:this.fb.array([]),
    })
  }

  setPrimaryKYCUplods(){
    this.prospectDetailForm = this.fb.group({
      aadharNumber: this.fb.control('', [Validators.required]),
      panNumber: this.fb.control('', [Validators.required]),
      aadharImage: this.fb.control('', [Validators.required]),
      panImage: this.fb.control('', [Validators.required]),
      prospectImage: this.fb.control('', [Validators.required]),
    })
  }

  get communicationAddressFormValue() {
    return this.prospectDetailForm.controls["communicationAddress"] as FormArray;
  }

  get permanantAddressFormValue() {
    return this.prospectDetailForm.controls["permanantAddress"] as FormArray;
  }

  addAddress(control:string,data?:any) {
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

 
}
