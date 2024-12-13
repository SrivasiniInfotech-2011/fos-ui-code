import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-disbursement-detail-create',
  templateUrl: './disbursement-detail-create.component.html',
  styleUrl: './disbursement-detail-create.component.scss'
})
export class DisbursementDetailCreateComponent {

  public disbursementCreateForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(){
    this.disbursementCreateForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      vehicleNumber:new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')])
    })
  }
}
