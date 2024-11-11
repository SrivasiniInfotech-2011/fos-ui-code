import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewloan-details',
  templateUrl: './viewloan-details.component.html',
  styleUrl: './viewloan-details.component.scss'
})
export class ViewloanDetailsComponent {
  public prospectDetailsForm1: FormGroup;
  public prospectDetailsForm2: FormGroup;
  public submittedForm1: boolean = false;
  public submittedForm2: boolean = false;

  constructor() {
    this.prospectDetailsForm1 = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required])
    });

    this.prospectDetailsForm2 = new FormGroup({
      mobileNo: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      leadNumber: new FormControl('', [Validators.required]),
      leadDate: new FormControl('', [Validators.required]),
      leadType: new FormControl('', [Validators.required]),
      prospectName: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
      prospectType: new FormControl('', [Validators.required]),
      prospectAddress: new FormControl('', [Validators.required]),
    })
  }


  go() {
    this.submittedForm1 = true;
    if (this.prospectDetailsForm1.valid) {
      this.submittedForm1 = false;
    }
  }

  generateLead() {
    this.submittedForm2 = true;
    if (this.prospectDetailsForm2.valid) {
      this.submittedForm2 = false;
    }
  }
}
