import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fvr-guarantor',
  templateUrl: './fvr-guarantor.component.html',
  styleUrl: './fvr-guarantor.component.scss'
})
export class FvrGuarantorComponent {

    public fvrGuarantorLeadForm:FormGroup;
    public fvrGuarantorLeadDetailsForm:FormGroup;
    public isSubmitted:boolean = false;


    constructor(){
      this.fvrGuarantorLeadForm = new FormGroup({
        leadNumber:new FormControl('', [Validators.required]),
        vehicleNumber:new FormControl('', [Validators.required])
      });

      this.fvrGuarantorLeadDetailsForm = new FormGroup({
        leadNumber : new FormControl('', [Validators.required]),
        leadDate : new FormControl('', [Validators.required]),
        branch : new FormControl('', [Validators.required]),
        prospectName : new FormControl('', [Validators.required]),
        mobileNumber : new FormControl('', [Validators.required]),
        vehicleNumber : new FormControl('', [Validators.required]),
        prospectAddress : new FormControl('', [Validators.required]),
      });
    }
}
