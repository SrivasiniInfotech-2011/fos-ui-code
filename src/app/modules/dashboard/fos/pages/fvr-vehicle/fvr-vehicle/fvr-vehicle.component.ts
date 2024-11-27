import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fvr-vehicle',
  templateUrl: './fvr-vehicle.component.html',
  styleUrl: './fvr-vehicle.component.scss'
})
export class FvrVehicleComponent {


  public fvrVehicleLeadForm:FormGroup;
  public isSubmitted:boolean = false;


  constructor(){
    this.fvrVehicleLeadForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required])
    });
  }

  search(){
    this.isSubmitted = true;
    if(this.fvrVehicleLeadForm.valid){
      this.isSubmitted = false;
    }
  }
}
