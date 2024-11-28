import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.scss'
})
export class IndividualComponent implements OnInit {

  public individualForm:FormGroup;
  public individualDetailsForm:FormGroup;
  public isSubmitted:boolean = false;
  public selectedTab:any;

   constructor(private router:Router){
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

   ngOnInit(): void {
    if(localStorage.getItem('selectedIndex')){
      this.selectedTab = JSON.parse(localStorage.getItem('selectedIndex') || '')
    }
  }

  onTabChanged(event:MatTabChangeEvent){
    localStorage.setItem('selectedIndex', JSON.stringify(event.index))
    switch (event.index) {
      case 0:
        this.router.navigate(['/fos/lead-prospect-detail']);
        break;
        case 1:
        this.router.navigate(['/fos/lead-loan-details']);
        break;
        case 2:
        this.router.navigate(['/fos/lead-individual']);
        break;
        case 3:
        this.router.navigate(['/fos/lead-guarantor-1']);
        break;
        case 4:
        this.router.navigate(['/fos/lead-guarantor-2']);
        break;
    }
  }

   submit(){
    this.isSubmitted = true;
    if(this.individualForm.valid && this.individualDetailsForm.valid){
      this.isSubmitted = false;
    }
   }
}
