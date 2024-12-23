import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fvr-neighbour',
  templateUrl: './fvr-neighbour.component.html',
  styleUrl: './fvr-neighbour.component.scss'
})
export class FvrNeighbourComponent {

  public fvrNeighbourLeadForm: FormGroup;
  public fvrNeighbourDetailsForm: FormGroup;
  public isSubmitted: boolean = false;


  constructor() {
    this.fvrNeighbourLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName:new FormControl('')
    });

    this.fvrNeighbourDetailsForm = new FormGroup({
      hirerLocation: new FormControl('',[Validators.required]),
      yearsOfStay: new FormControl('',[Validators.required]),
      ownershipStatus: new FormControl('',[Validators.required]),
      residenceSubType: new FormControl('',[Validators.required]),
      neighbourName: new FormControl('',[Validators.required]),
      neighbourNumber: new FormControl('',[Validators.required]),
      neighbourAddress: new FormControl('',[Validators.required]),
      comment: new FormControl('',[Validators.required]),
      neighbourHousePhoto: new FormControl('',[Validators.required]),
    });
  }
}
