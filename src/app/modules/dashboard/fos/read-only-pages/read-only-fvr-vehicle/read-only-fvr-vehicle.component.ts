import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-read-only-fvr-vehicle',
  templateUrl: './read-only-fvr-vehicle.component.html',
  styleUrl: './read-only-fvr-vehicle.component.scss'
})
export class ReadOnlyFvrVehicleComponent {

  public fvrVehicleLeadForm: FormGroup;
  public fvrVehicle1Form: FormGroup;
  public fvrVehicle2Form: FormGroup;

  constructor() {
    this.fvrVehicleLeadForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      prospectName: new FormControl({ value: '', disabled: true })
    });

    this.fvrVehicle1Form = new FormGroup({
      verifierName: new FormControl({ value: '', disabled: true }),
      verifierId: new FormControl({ value: '', disabled: true }),
      branchName: new FormControl({ value: '', disabled: true }),
      dateOfVisit: new FormControl({ value: '', disabled: true }),
      time: new FormControl({ value: '', disabled: true }),
      taxExpiry: new FormControl({ value: '', disabled: true }),
      taxExpiryDate: new FormControl({ value: '', disabled: true }),
      permitStatus: new FormControl({ value: '', disabled: true }),
      insuranceExpiryDate: new FormControl({ value: '', disabled: true }),
      fieldExecutiveComment: new FormControl({ value: '', disabled: true }),
      inspectedVehicleValue: new FormControl({ value: '', disabled: true }),
      rcRegistrationDate: new FormControl({ value: '', disabled: true }),
      vehicleDescription: new FormControl({ value: '', disabled: true }),
      frontTyreCondition: new FormControl({ value: '', disabled: true }),
      rearTyreCondition: new FormControl({ value: '', disabled: true }),
      colour: new FormControl({ value: '', disabled: true }),
      vehicleCondition: new FormControl({ value: '', disabled: true }),
      inspectedVehiclePlace: new FormControl({ value: '', disabled: true }),
      bodyType: new FormControl({ value: '', disabled: true }),
      bodyLength: new FormControl({ value: '', disabled: true }),
      nationalPermitValidity: new FormControl({ value: '', disabled: true }),
      statePermitValidity: new FormControl({ value: '', disabled: true }),
      vehiclePresentOwner: new FormControl({ value: '', disabled: true }),
      engineCondition: new FormControl({ value: '', disabled: true }),
      verifiedDuplicateKey: new FormControl({ value: '', disabled: true }),
    });

    this.fvrVehicle2Form = new FormGroup({
      scanFront: new FormControl({ value: '', disabled: true }),
      scanBack: new FormControl({ value: '', disabled: true }),
      scanInside: new FormControl({ value: '', disabled: true }),
      scanEngine: new FormControl({ value: '', disabled: true }),
      scanKms: new FormControl({ value: '', disabled: true }),
      scanChassis: new FormControl({ value: '', disabled: true }),
      scanFrontLeftTyre: new FormControl({ value: '', disabled: true }),
      scanFrontRightTyre: new FormControl({ value: '', disabled: true }),
      scanBackLeftTyre: new FormControl({ value: '', disabled: true }),
      scanBackRightTyre: new FormControl({ value: '', disabled: true }),
      scanVehicleLeftSide: new FormControl({ value: '', disabled: true }),
      scanVehicleRightSide: new FormControl({ value: '', disabled: true }),
      additionalScanner1: new FormControl({ value: '', disabled: true }),
      additionalScanner2: new FormControl({ value: '', disabled: true }),
      additionalScanner3: new FormControl({ value: '', disabled: true }),
      additionalScanner4: new FormControl({ value: '', disabled: true }),
      additionalScanner5: new FormControl({ value: '', disabled: true }),
      chassisNumberPencilPrint: new FormControl({ value: '', disabled: true }),
    })
  }

}
