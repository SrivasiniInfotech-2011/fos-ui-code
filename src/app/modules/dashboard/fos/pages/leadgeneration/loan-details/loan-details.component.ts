import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrl: './loan-details.component.scss'
})
export class LoanDetailsComponent {

    public leadForm:FormGroup;
    public loanDetailsForm:FormGroup;
    public assetDetailsForm:FormGroup;
    public isSubmitted:boolean = false;

    constructor(){
      this.leadForm = new FormGroup({
        leadNumber: new FormControl('', [Validators.required]),
        vehicleNumber:new FormControl('', [Validators.required])
      });

      this.loanDetailsForm = new FormGroup({
        lineOfBusiness: new FormControl('', [Validators.required]),
        financeAmount: new FormControl('', [Validators.required]),
        tenure: new FormControl('', [Validators.required]),
        tenureType: new FormControl('', [Validators.required]),
        rate: new FormControl('', [Validators.required]),
        repaymentFrequency: new FormControl('', [Validators.required]),
        leavePeriod: new FormControl('', [Validators.required]),
        fieldExecutive: new FormControl('', [Validators.required]),
        documentCategory: new FormControl('', [Validators.required])
      });

      this.assetDetailsForm = new FormGroup({
        assetClass: new FormControl('', [Validators.required]),
        assetName: new FormControl('', [Validators.required]),
        assetType: new FormControl('', [Validators.required]),
        assetModel: new FormControl('', [Validators.required]),
        vehicleNumber: new FormControl('', [Validators.required]),
        engineNumber: new FormControl('', [Validators.required]),
        chassisNumber: new FormControl('', [Validators.required]),
        serialNumber: new FormControl('', [Validators.required]),
        ownership: new FormControl('', [Validators.required]),
        model: new FormControl('', [Validators.required]),
        vehicleType: new FormControl('', [Validators.required]),
        taxType: new FormControl('', [Validators.required]),
        fuelType: new FormControl('', [Validators.required])
      })
    }

    submit(){
      this.isSubmitted = true;
      if(this.leadForm.valid && this.loanDetailsForm.valid && this.assetDetailsForm.valid){
        this.isSubmitted = false;
      }
    }
}
