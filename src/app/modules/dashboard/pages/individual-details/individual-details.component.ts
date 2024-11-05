import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrl: './individual-details.component.scss'
})
export class IndividualDetailsComponent {

  public individualDetailsForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private router:Router) {
    this.individualDetailsForm = new FormGroup({
      fatherName: new FormControl('', [Validators.required]),
      motherName: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
      employment: new FormControl('', [Validators.required]),
      netSalary: new FormControl('', [Validators.required]),
      noOfAdultDependents: new FormControl('', [Validators.required]),
      noOfChildDependents: new FormControl('', [Validators.required]),
      houseType: new FormControl('', [Validators.required]),
      floorFlatNumber: new FormControl('', [Validators.required]),
      houseStatus: new FormControl('', [Validators.required]),
      rentalLeaseAmount: new FormControl('', [Validators.required]),
      owned2Wheeler: new FormControl('', [Validators.required]),
      owned4Wheeler: new FormControl('', [Validators.required]),
      ownedHeavyVehicle: new FormControl('', [Validators.required]),
      existingLoan: new FormControl('', [Validators.required]),
      totalExistingLoans: new FormControl('', [Validators.required])
    })
  }

  submit() {
    this.isSubmitted = true;
    if (this.individualDetailsForm.valid) {
      this.isSubmitted = false;
      this.router.navigate(['/dashboard'])
    }
  }
}
