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
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required])
    })
  }

  search(){
    this.isSubmitted = true;
    if(this.bmApprovalMasterForm.valid){
      this.isSubmitted = false;
    }
  }
}
