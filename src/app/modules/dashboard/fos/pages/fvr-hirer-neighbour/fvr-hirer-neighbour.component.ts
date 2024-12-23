import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fvr-hirer-neighbour',
  templateUrl: './fvr-hirer-neighbour.component.html',
  styleUrl: './fvr-hirer-neighbour.component.scss'
})
export class FvrHirerNeighbourComponent {

    public fvrHirerNeighbourLeadForm:FormGroup;
    public fvrHirerNeighbourLeadDetailsForm:FormGroup;
    public isSubmitted:boolean = false;


    constructor(){
      this.fvrHirerNeighbourLeadForm = new FormGroup({
        leadNumber:new FormControl('', [Validators.required]),
        vehicleNumber:new FormControl('', [Validators.required])
      });

      this.fvrHirerNeighbourLeadDetailsForm = new FormGroup({
        leadNumber : new FormControl(''),
        leadDate : new FormControl(''),
        location : new FormControl(''),
        prospectName : new FormControl(''),
        mobileNumber : new FormControl(''),
        vehicleNumber : new FormControl(''),
        prospectAddress : new FormControl(''),
      });
    }

    go(){
      this.isSubmitted = true;
      if(this.fvrHirerNeighbourLeadForm?.valid){
        this.isSubmitted = false
      }
     }
}
