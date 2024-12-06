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
        vehicleNumber:new FormControl('')
      });

      this.fvrGuarantorLeadDetailsForm = new FormGroup({
        leadNumber : new FormControl(''),
        leadDate : new FormControl(''),
        branch : new FormControl(''),
        prospectName : new FormControl(''),
        mobileNumber : new FormControl(''),
        vehicleNumber : new FormControl(''),
        prospectAddress : new FormControl(''),
      });
    }

    go(){
      this.isSubmitted = true;
      if(this.fvrGuarantorLeadForm.valid){
        this.isSubmitted = false;
      }
    }

    clear(){
      this.fvrGuarantorLeadForm.reset()
    }
}
