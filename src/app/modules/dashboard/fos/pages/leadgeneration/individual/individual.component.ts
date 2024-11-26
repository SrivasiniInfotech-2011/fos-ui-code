import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.scss'
})
export class IndividualComponent {

  public individualForm:FormGroup;
  public individualDetailsForm:FormGroup;
  public isSubmitted:boolean = false;

   constructor(){
    this.individualForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required]),
    });

    this.individualDetailsForm = new FormGroup({
      fatherName: new FormControl('',[Validators.required]),
      motherName: new FormControl('',[Validators.required]),
      maritalStatus: new FormControl('',[Validators.required]),
      employment: new FormControl('',[Validators.required]),
      netSalary: new FormControl('',[Validators.required]),
      noOfAdultDependents: new FormControl('',[Validators.required]),
      noOfChildDependents: new FormControl('',[Validators.required]),
      houseType: new FormControl('',[Validators.required]),
      floorFlatNumber: new FormControl('',[Validators.required]),
      houseStatus: new FormControl('',[Validators.required]),
      rentalLeaseAmount: new FormControl('',[Validators.required]),
      owned2Wheeler: new FormControl('',[Validators.required]),
      owned4Wheeler: new FormControl('',[Validators.required]),
      ownedHeavyVehicle: new FormControl('',[Validators.required]),
      existingLoans: new FormControl('',[Validators.required]),
      totalExistingLoans: new FormControl('',[Validators.required]),
    });
   }

   submit(){
    this.isSubmitted = true;
    if(this.individualForm.valid && this.individualDetailsForm.valid){
      this.isSubmitted = false;
    }
   }
}
