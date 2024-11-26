import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bm-approval-create',
  templateUrl: './bm-approval-create.component.html',
  styleUrl: './bm-approval-create.component.scss'
})
export class BmApprovalCreateComponent {

    public bmApprovalForm:FormGroup;
    public isSubmitted:boolean = false;

    constructor(){
      this.bmApprovalForm = new FormGroup({
        leadNumber:new FormControl('', [Validators.required]),
        vehicleNumber:new FormControl('', [Validators.required])
      })
    }

    submit(){
      this.isSubmitted = true;
      if(this.bmApprovalForm.valid){
        this.isSubmitted = false;
      }
    }
}
