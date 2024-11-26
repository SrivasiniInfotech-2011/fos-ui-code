import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-guarantor-2',
  templateUrl: './guarantor-2.component.html',
  styleUrl: './guarantor-2.component.scss'
})
export class Guarantor2Component {

  public guarantor2Form:FormGroup;
  public guarantor2DetailsForm:FormGroup;
  public guarantor2CommunicationAddressForm:FormGroup;
  public guarantor2PermanentAddressForm:FormGroup;
  public guarantor2KYCForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(){
    this.guarantor2Form = new FormGroup({
        leadNumber: new FormControl('', [Validators.required]),
        vehicleNumber: new FormControl('', [Validators.required])
    });

    this.guarantor2DetailsForm = new FormGroup({
      guarantorName: new FormControl('', [Validators.required]),
      relationship: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      alternateMobileNumber: new FormControl(''),
      guarantorAmount: new FormControl('', [Validators.required])
    });

    this.guarantor2CommunicationAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required])
    });

    this.guarantor2PermanentAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required])
    });

    this.guarantor2KYCForm = new FormGroup({
        aadharNumber:new FormControl('', [Validators.required]),
        panNumber:new FormControl('', [Validators.required]),
        guarantorImage:new FormControl('', [Validators.required]),
        aadharImage:new FormControl('', [Validators.required]),
        panImage:new FormControl('', [Validators.required])
    });
  }

  save(){
    this.isSubmitted = true;
    if(this.guarantor2Form.valid && this.guarantor2DetailsForm.valid && this.guarantor2CommunicationAddressForm.valid && this.guarantor2PermanentAddressForm.valid && this.guarantor2KYCForm.valid){
      this.isSubmitted = false;
    }
  }
}
