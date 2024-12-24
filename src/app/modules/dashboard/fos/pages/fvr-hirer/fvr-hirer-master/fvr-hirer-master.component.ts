import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fvr-hirer-master',
  templateUrl: './fvr-hirer-master.component.html',
  styleUrl: './fvr-hirer-master.component.scss'
})
export class FvrHirerMasterComponent implements OnInit {

  public fvrHirerLeadForm:FormGroup;
  public prospectDetailsForm:FormGroup;
  public fvrObservationLeadForm: FormGroup;
  public fvrObservationDetailsForm: FormGroup;
  public fvrNeighbourLeadForm: FormGroup;
  public fvrNeighbourDetailsForm: FormGroup;
  public isSubmitted:boolean = false;


  constructor(private toastr:ToastrService){
    this.fvrHirerLeadForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required])
    });

    this.prospectDetailsForm = new FormGroup({
      leadNumber : new FormControl(''),
      leadDate : new FormControl(''),
      branch : new FormControl(''),
      prospectName : new FormControl(''),
      mobileNumber : new FormControl(''),
      vehicleNumber : new FormControl(''),
      prospectAddress : new FormControl(''),
    });

    this.fvrObservationLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName:new FormControl('')
    });

    this.fvrObservationDetailsForm = new FormGroup({
      houseAccessibility: new FormControl(''),
      locality: new FormControl(''),
      houseType: new FormControl(''),
      flooringType: new FormControl(''),
      roofingType: new FormControl(''),
      livingStandard: new FormControl(''),
      entryPermitted: new FormControl(''),
      houseSize: new FormControl(''),
      landmark: new FormControl(''),
      recommend: new FormControl(''),
      earlierVisit: new FormControl(''),
      politicalLeaderPhotograph: new FormControl(''),
      verifierName: new FormControl(''),
      reason: new FormControl(''),
      verifierId: new FormControl(''),
      time: new FormControl(''),
      branchName: new FormControl(''),
      dateOfVisit: new FormControl(''),
      assetInHouse: new FormControl(''),
      hirerHousePhoto: new FormControl(''),
    });

    this.fvrNeighbourLeadForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      prospectName:new FormControl('')
    });

    this.fvrNeighbourDetailsForm = new FormGroup({
      hirerLocation: new FormControl(''),
      yearsOfStay: new FormControl(''),
      ownershipStatus: new FormControl(''),
      residenceSubType: new FormControl(''),
      neighbourName: new FormControl(''),
      neighbourNumber: new FormControl(''),
      neighbourAddress: new FormControl(''),
      comment: new FormControl(''),
      neighbourHousePhoto: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.prospectDetailsForm.disable();
    this.fvrObservationLeadForm.disable();
    this.fvrObservationDetailsForm.disable();
    this.fvrNeighbourLeadForm.disable();
    this.fvrNeighbourDetailsForm.disable();
  }

  go(){
    this.isSubmitted = true;
    if(this.fvrHirerLeadForm.get('leadNumber')?.valid || this.fvrHirerLeadForm.get('vehicleNumber')?.valid){
      this.isSubmitted = false
    }
    else{
      this.toastr.error('Please enter either lead number or vehicle number')
    }
  }

  clear(){
    this.fvrHirerLeadForm.reset()
  }
}
