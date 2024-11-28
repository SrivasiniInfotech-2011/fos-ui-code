import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guarantor-1',
  templateUrl: './guarantor-1.component.html',
  styleUrl: './guarantor-1.component.scss'
})
export class Guarantor1Component implements OnInit{

    public guarantor1Form:FormGroup;
    public guarantor1DetailsForm:FormGroup;
    public guarantor1CommunicationAddressForm:FormGroup;
    public guarantor1PermanentAddressForm:FormGroup;
    public guarantor1KYCForm:FormGroup;
    public isSubmitted:boolean = false;
    public selectedTab:any;

    constructor(private router:Router){
      this.guarantor1Form = new FormGroup({
          leadNumber: new FormControl('', [Validators.required]),
          vehicleNumber: new FormControl('', [Validators.required])
      });

      this.guarantor1DetailsForm = new FormGroup({
        guarantorName: new FormControl('', [Validators.required]),
        relationship: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
        mobileNumber: new FormControl('', [Validators.required]),
        alternateMobileNumber: new FormControl(''),
        guarantorAmount: new FormControl('', [Validators.required])
      });

      this.guarantor1CommunicationAddressForm = new FormGroup({
        addressLine1: new FormControl(''),
        addressLine2: new FormControl(''),
        landmark: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [Validators.required])
      });

      this.guarantor1PermanentAddressForm = new FormGroup({
        addressLine1: new FormControl(''),
        addressLine2: new FormControl(''),
        landmark: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [Validators.required])
      });

      this.guarantor1KYCForm = new FormGroup({
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
      if(this.guarantor1Form.valid && this.guarantor1DetailsForm.valid && this.guarantor1CommunicationAddressForm.valid && this.guarantor1PermanentAddressForm.valid && this.guarantor1KYCForm.valid){
        this.isSubmitted = false;
      }
    }
}
