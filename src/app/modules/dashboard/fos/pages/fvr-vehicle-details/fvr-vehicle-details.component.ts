import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fvr-vehicle-details',
  templateUrl: './fvr-vehicle-details.component.html',
  styleUrl: './fvr-vehicle-details.component.scss'
})
export class FvrVehicleDetailsComponent {

  public fvrVehicleLeadForm: FormGroup;
    public fvrVehicle1Form: FormGroup;
    public fvrVehicle2Form: FormGroup;
    public isSubmitted: boolean = false;


    constructor() {
      this.fvrVehicleLeadForm = new FormGroup({
        leadNumber: new FormControl(''),
        vehicleNumber: new FormControl(''),
        prospectName:new FormControl('')
      });

      this.fvrVehicle1Form = new FormGroup({
        verifierName: new FormControl('',[Validators.required]),
        verifierId: new FormControl('',[Validators.required]),
        branchName: new FormControl('',[Validators.required]),
        dateOfVisit: new FormControl('',[Validators.required]),
        time: new FormControl('',[Validators.required]),
        taxExpiry: new FormControl('',[Validators.required]),
        taxExpiryDate: new FormControl('',[Validators.required]),
        permitStatus: new FormControl('',[Validators.required]),
        insuranceExpiryDate: new FormControl('',[Validators.required]),
        fieldExecutiveComment: new FormControl('',[Validators.required]),
        inspectedVehicleValue: new FormControl('',[Validators.required]),
        rcRegistrationDate: new FormControl('',[Validators.required]),
        vehicleDescription: new FormControl('',[Validators.required]),
        frontTyreCondition: new FormControl('',[Validators.required]),
        rearTyreCondition: new FormControl('',[Validators.required]),
        colour: new FormControl('',[Validators.required]),
        vehicleCondition: new FormControl('',[Validators.required]),
        inspectedVehiclePlace: new FormControl('',[Validators.required]),
        bodyType: new FormControl('',[Validators.required]),
        bodyLength: new FormControl('',[Validators.required]),
        nationalPermitValidity: new FormControl('',[Validators.required]),
        statePermitValidity: new FormControl('',[Validators.required]),
        vehiclePresentOwner: new FormControl('',[Validators.required]),
        engineCondition: new FormControl('',[Validators.required]),
        verifiedDuplicateKey: new FormControl('',[Validators.required]),
      });

      this.fvrVehicle2Form = new FormGroup({
        scanFront: new FormControl('',[Validators.required]),
        scanBack: new FormControl('',[Validators.required]),
        scanInside: new FormControl('',[Validators.required]),
        scanEngine: new FormControl('',[Validators.required]),
        scanKms: new FormControl('',[Validators.required]),
        scanChassis: new FormControl('',[Validators.required]),
        scanFrontLeftTyre: new FormControl('',[Validators.required]),
        scanFrontRightTyre: new FormControl('',[Validators.required]),
        scanBackLeftTyre: new FormControl('',[Validators.required]),
        scanBackRightTyre: new FormControl('',[Validators.required]),
        scanVehicleLeftSide: new FormControl('',[Validators.required]),
        scanVehicleRightSide: new FormControl('',[Validators.required]),
        additionalScanner1: new FormControl('',[Validators.required]),
        additionalScanner2: new FormControl('',[Validators.required]),
        additionalScanner3: new FormControl('',[Validators.required]),
        additionalScanner4: new FormControl('',[Validators.required]),
        additionalScanner5: new FormControl('',[Validators.required]),
        chassisNumberPencilPrint: new FormControl('',[Validators.required]),
      })
    }
}
