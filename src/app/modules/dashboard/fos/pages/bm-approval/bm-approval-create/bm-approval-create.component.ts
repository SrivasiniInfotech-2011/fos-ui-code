import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bm-approval-create',
  templateUrl: './bm-approval-create.component.html',
  styleUrl: './bm-approval-create.component.scss'
})
export class BmApprovalCreateComponent {

    public bmApprovalForm:FormGroup;
    public isSubmitted:boolean = false;

    constructor(public toastr: ToastrService){
      this.bmApprovalForm = new FormGroup({
        leadNumber:new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]),
        vehicleNumber:new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$')])
      })
    }

    submit(){

      if(this.bmApprovalForm.get('leadNumber')?.valid || this.bmApprovalForm.get('vehicleNumber')?.valid ){
        this.isSubmitted = false;
        this.bmApprovalForm.reset()
       }
      else{
        this.toastr.error('Enter either lead number or vehicle number', 'Error');

      }
    }
}
