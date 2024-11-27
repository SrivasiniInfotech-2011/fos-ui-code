import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrl: './company-master.component.scss'
})
export class CompanyMasterComponent {

  public companyMasterForm:FormGroup;
  public corporateDetailsForm:FormGroup;
  public otherDetailsForm:FormGroup;

  constructor(){
    this.companyMasterForm = new FormGroup({
      companyCode:new FormControl('', [Validators.required]),
      companyName:new FormControl('', [Validators.required]),
      constitutionalStatus:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      state:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      pincode:new FormControl('', [Validators.required]),
      companyAddress:new FormControl('', [Validators.required])
    });

    this.corporateDetailsForm = new FormGroup({
      ceoName:new FormControl('', [Validators.required]),
      mobileNumber:new FormControl('', [Validators.required]),
      telephoneNumber:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      website:new FormControl('', [Validators.required]),
      systemAdminCode:new FormControl('', [Validators.required]),
      systemAdminPassword:new FormControl('', [Validators.required])
    });

    this.otherDetailsForm = new FormGroup({
      communicationAddress:new FormControl('', [Validators.required]),
      address1:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      state:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      pincode:new FormControl('', [Validators.required]),
      companyStartDate:new FormControl('', [Validators.required]),
      licenseNumber:new FormControl('', [Validators.required]),
      validityOfLicenseNumber:new FormControl('', [Validators.required]),
      incomeTaxNumber:new FormControl('', [Validators.required]),
      accountingCurrency:new FormControl('', [Validators.required]),
      remarks:new FormControl('', [Validators.required])
    })
  }


}
