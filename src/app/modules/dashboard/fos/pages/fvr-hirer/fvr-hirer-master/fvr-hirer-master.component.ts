import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fvr-hirer-master',
  templateUrl: './fvr-hirer-master.component.html',
  styleUrl: './fvr-hirer-master.component.scss'
})
export class FvrHirerMasterComponent {

  public fvrHirerLeadForm:FormGroup;
  public fvrHirerLeadDetailsForm:FormGroup;
  public isSubmitted:boolean = false;


  constructor(private toastr:ToastrService){
    this.fvrHirerLeadForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required])
    });

    this.fvrHirerLeadDetailsForm = new FormGroup({
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
    if(this.fvrHirerLeadForm.get('leadNumber')?.valid || this.fvrHirerLeadForm.get('vehicleNumber')?.valid){
      this.isSubmitted = false
    }
    else{
      this.toastr.error('Please enter either lead number or vehicle number')
    }
  }

  clear(){
    this.fvrHirerLeadForm.reset()
  }
}
