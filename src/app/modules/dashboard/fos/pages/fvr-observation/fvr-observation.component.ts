import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fvr-observation',
  templateUrl: './fvr-observation.component.html',
  styleUrl: './fvr-observation.component.scss'
})
export class FvrObservationComponent {


    public fvrObservationLeadForm: FormGroup;
    public fvrObservationDetailsForm: FormGroup;
    public isSubmitted: boolean = false;


    constructor() {
      this.fvrObservationLeadForm = new FormGroup({
        leadNumber: new FormControl(''),
        vehicleNumber: new FormControl(''),
        prospectName:new FormControl('')
      });

      this.fvrObservationDetailsForm = new FormGroup({
        houseAccessibility: new FormControl('',[Validators.required]),
        locality: new FormControl('',[Validators.required]),
        houseType: new FormControl('',[Validators.required]),
        flooringType: new FormControl('',[Validators.required]),
        roofingType: new FormControl('',[Validators.required]),
        livingStandard: new FormControl('',[Validators.required]),
        entryPermitted: new FormControl('',[Validators.required]),
        houseSize: new FormControl('',[Validators.required]),
        landmark: new FormControl('',[Validators.required]),
        recommend: new FormControl('',[Validators.required]),
        earlierVisit: new FormControl('',[Validators.required]),
        politicalLeaderPhotograph: new FormControl('',[Validators.required]),
        verifierName: new FormControl('',[Validators.required]),
        reason: new FormControl('',[Validators.required]),
        verifierId: new FormControl('',[Validators.required]),
        time: new FormControl('',[Validators.required]),
        branchName: new FormControl('',[Validators.required]),
        dateOfVisit: new FormControl('',[Validators.required]),
        assetInHouse: new FormControl('',[Validators.required]),
        hirerHousePhoto: new FormControl('',[Validators.required]),
      });
    }
}
