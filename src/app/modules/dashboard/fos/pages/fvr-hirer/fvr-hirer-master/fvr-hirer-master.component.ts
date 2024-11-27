import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fvr-hirer-master',
  templateUrl: './fvr-hirer-master.component.html',
  styleUrl: './fvr-hirer-master.component.scss'
})
export class FvrHirerMasterComponent {

  public fvrHirerLeadForm:FormGroup;
  public fvrHirerLeadDetailsForm:FormGroup;
  public isSubmitted:boolean = false;


  constructor(){
    this.fvrHirerLeadForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required])
    });

    this.fvrHirerLeadDetailsForm = new FormGroup({
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
