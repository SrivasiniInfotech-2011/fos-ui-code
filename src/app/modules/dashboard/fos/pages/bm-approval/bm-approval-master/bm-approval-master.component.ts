import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bm-approval-master',
  templateUrl: './bm-approval-master.component.html',
  styleUrl: './bm-approval-master.component.scss'
})
export class BmApprovalMasterComponent {

  public bmApprovalMasterForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(){
    this.bmApprovalMasterForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9 ]+$')]),
      vehicleNumber:new FormControl('')
    })
  }

  search(){
    this.isSubmitted = true;
    if(this.bmApprovalMasterForm.valid){
      this.isSubmitted = false;
    }
  }
}
