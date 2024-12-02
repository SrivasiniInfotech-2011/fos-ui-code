import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guarantor-2',
  templateUrl: './guarantor-2.component.html',
  styleUrl: './guarantor-2.component.scss'
})
export class Guarantor2Component implements OnInit {

  public guarantor2Form:FormGroup;
  public guarantor2DetailsForm:FormGroup;
  public guarantor2CommunicationAddressForm:FormGroup;
  public guarantor2PermanentAddressForm:FormGroup;
  public guarantor2KYCForm:FormGroup;
  public isSubmitted:boolean = false;
  public selectedTab:any

  constructor(private router:Router){
    this.guarantor2Form = new FormGroup({
        leadNumber: new FormControl('', [Validators.required]),
        vehicleNumber: new FormControl('', [Validators.required])
    });

    this.guarantor2DetailsForm = new FormGroup({
      guarantorName: new FormControl('', [Validators.required]),
      relationship: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      alternateMobileNumber: new FormControl(''),
      guarantorAmount: new FormControl('', [Validators.required])
    });

    this.guarantor2CommunicationAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl('')
    });

    this.guarantor2PermanentAddressForm = new FormGroup({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl('')
    });

    this.guarantor2KYCForm = new FormGroup({
        aadharNumber:new FormControl('', [Validators.required]),
        panNumber:new FormControl('', [Validators.required]),
        guarantorImage:new FormControl('', [Validators.required]),
        aadharImage:new FormControl('', [Validators.required]),
        panImage:new FormControl('', [Validators.required])
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

  save(){
    this.isSubmitted = true;
    if(this.guarantor2Form.valid && this.guarantor2DetailsForm.valid && this.guarantor2CommunicationAddressForm.valid && this.guarantor2PermanentAddressForm.valid && this.guarantor2KYCForm.valid){
      this.isSubmitted = false;
    }
  }
}
