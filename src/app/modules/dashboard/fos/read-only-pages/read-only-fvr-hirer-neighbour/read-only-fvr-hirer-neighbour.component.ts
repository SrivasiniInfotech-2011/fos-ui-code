import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-read-only-fvr-hirer-neighbour',
  templateUrl: './read-only-fvr-hirer-neighbour.component.html',
  styleUrl: './read-only-fvr-hirer-neighbour.component.scss'
})
export class ReadOnlyFvrHirerNeighbourComponent {

  public fvrHirerNeighbourLeadForm: FormGroup;
  public fvrHirerNeighbourLeadDetailsForm: FormGroup;


  constructor() {
    this.fvrHirerNeighbourLeadForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true })
    });

    this.fvrHirerNeighbourLeadDetailsForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      leadDate: new FormControl({ value: '', disabled: true }),
      location: new FormControl({ value: '', disabled: true }),
      prospectName: new FormControl({ value: '', disabled: true }),
      mobileNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      prospectAddress: new FormControl({ value: '', disabled: true }),
    });
  }
}
