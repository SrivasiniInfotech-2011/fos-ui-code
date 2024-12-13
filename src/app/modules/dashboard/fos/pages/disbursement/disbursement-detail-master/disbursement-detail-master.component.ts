import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-disbursement-detail-master',
  templateUrl: './disbursement-detail-master.component.html',
  styleUrl: './disbursement-detail-master.component.scss'
})
export class DisbursementDetailMasterComponent {

  public disbursementMasterForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(){
    this.disbursementMasterForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      vehicleNumber:new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')])
    })
  }

  search(){

  }
}
