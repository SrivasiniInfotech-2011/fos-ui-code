import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disbursement-detail-create',
  templateUrl: './disbursement-detail-create.component.html',
  styleUrl: './disbursement-detail-create.component.scss'
})
export class DisbursementDetailCreateComponent {

  public disbursementCreateForm:FormGroup;
  public disbursementDetailForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(private toastr:ToastrService){
    this.disbursementCreateForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      vehicleNumber:new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')])
    })

    this.disbursementDetailForm = new FormGroup({
      lineOfBusiness:new FormControl(''),
      location:new FormControl(''),
      customerType:new FormControl(''),
      customerName:new FormControl(''),
      financeAmount:new FormControl(''),
      tenure:new FormControl(''),
      rate:new FormControl(''),
      repaymentFrequency:new FormControl(''),
      totalRepaymentAmount:new FormControl(''),
      leadDate:new FormControl(''),
    })
  }

  go(){
    this.isSubmitted = true;
    if(this.disbursementCreateForm.get('leadNumber')?.valid || this.disbursementCreateForm.get('vehicleNumber')?.valid){
      this.isSubmitted = false;
    }
    else{
      this.toastr.error('Either Lead Number or Vehicle Number is mandatory')
    }
  }
}
