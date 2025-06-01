import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  public locationMasterForm: FormGroup;
  public locationTypes = ['Office', 'Warehouse', 'Factory', 'Store'];
  public corporateCodes = ['CORP123', 'CORP456', 'CORP789'];
  public countries = ['USA', 'India', 'UK'];
  public states: any = {
    USA: ['California', 'Texas'],
    India: ['Maharashtra', 'Delhi', 'Karnataka'],
    UK: ['England', 'Scotland', 'Wales']
  };

  public stateCodes: any = {
    California: 'CA',
    Texas: 'TX',
    Maharashtra: 'MH',
    Delhi: 'DL',
    Karnataka: 'KA',
    England: 'ENG',
    Scotland: 'SCO',
    Wales: 'WLS'
  };
  public availableStates: any[] = [];
  public availableStateCodes: any[] = [];

  constructor() {
    this.locationMasterForm = new FormGroup({
      locationType: new FormControl('', [Validators.required]),
      locationCode: new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$')]),
      locationDescription: new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(50)]),
      corporateCode: new FormControl(''),
      address: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      stateCode: new FormControl(''),
      landmark: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      pincode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      telephoneNumber: new FormControl(''),
      mobileNumber: new FormControl(''),
      active: new FormControl(false),
      operational: new FormControl(false),
    })
  }
  ngOnInit(): void {

    this.locationMasterForm.get('country')?.valueChanges.subscribe((country) => {
      this.availableStates = this.states[country] || [];
      this.locationMasterForm.patchValue({ state: '', stateCode: '' });
      this.availableStateCodes = [];
    });

    // Update state code when state changes
    this.locationMasterForm.get('state')?.valueChanges.subscribe((state) => {
      const code = this.stateCodes[state];
      this.availableStateCodes = code ? [code] : [];
      this.locationMasterForm.patchValue({ stateCode: code || '' });
    });

  }


  submit() {
     if (this.locationMasterForm.valid) {
    //  console.log('Form Submitted:', this.locationMasterForm.value);
    } else {
      this.locationMasterForm.markAllAsTouched();
    }
   }
}

