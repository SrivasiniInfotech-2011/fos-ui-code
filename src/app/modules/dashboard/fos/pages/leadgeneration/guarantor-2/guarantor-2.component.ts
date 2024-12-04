import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-guarantor-2',
  templateUrl: './guarantor-2.component.html',
  styleUrl: './guarantor-2.component.scss'
})
export class Guarantor2Component implements OnInit {

  public guarantor2Form: FormGroup;
  public guarantor2DetailsForm: FormGroup;
  public guarantor2CommunicationAddressForm: FormGroup;
  public guarantor2PermanentAddressForm: FormGroup;
  public guarantor2KYCForm: FormGroup;
  public isSubmitted: boolean = false;
  public selectedTab: any
  public action: any;
  public buttonDisabled: boolean = false;

  constructor(private router: Router, private location: Location, private route: ActivatedRoute) {
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
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
      guarantorImage: new FormControl('', [Validators.required]),
      aadharImage: new FormControl('', [Validators.required]),
      panImage: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    let tabValue = window.history.state?.value;
    this.selectedTab = tabValue;
    this.route.queryParams.subscribe((params: Params) => {
      this.action = params
      if (params['view']) {
        this.guarantor2Form.disable();
        this.guarantor2DetailsForm.disable();
        this.guarantor2CommunicationAddressForm.disable();
        this.guarantor2PermanentAddressForm.disable();
        this.guarantor2KYCForm.disable();
        this.buttonDisabled = true;
      }
      else {
        this.guarantor2Form.enable();
        this.guarantor2DetailsForm.enable();
        this.guarantor2CommunicationAddressForm.enable();
        this.guarantor2PermanentAddressForm.enable();
        this.guarantor2KYCForm.enable();
        this.buttonDisabled = false;
      }
    });

  }

  onTabChanged(event: MatTabChangeEvent) {
    if (this.action['view']) {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], { queryParams: { 'view': this.action['view'] }, state: { 'value': event.index } });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], { queryParams: { 'view': this.action['view'] }, state: { 'value': event.index } });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], { queryParams: { 'view': this.action['view'] }, state: { 'value': event.index } });
          break;
        case 3:
          this.router.navigate(['/fos/lead-guarantor-1'], { queryParams: { 'view': this.action['view'] }, state: { 'value': event.index } });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-2'], { queryParams: { 'view': this.action['view'] }, state: { 'value': event.index } });
          break;
      }
    }
    else if (this.action['modify']) {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], { queryParams: { 'modify': this.action['modify'] }, state: { 'value': event.index } });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], { queryParams: { 'modify': this.action['modify'] }, state: { 'value': event.index } });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], { queryParams: { 'modify': this.action['modify'] }, state: { 'value': event.index } });
          break;
        case 3:
          this.router.navigate(['/fos/lead-guarantor-1'], { queryParams: { 'modify': this.action['modify'] }, state: { 'value': event.index } });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-2'], { queryParams: { 'modify': this.action['modify'] }, state: { 'value': event.index } });
          break;
      }
    }
    else {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], { state: { 'value': event.index } });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], { state: { 'value': event.index } });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], { state: { 'value': event.index } });
          break;
        case 3:
          this.router.navigate(['/fos/lead-guarantor-1'], { state: { 'value': event.index } });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-2'], { state: { 'value': event.index } });
          break;
      }
    }
  }


  back() {
    this.location.back()
  }

  skip() {
    if (this.action['view']) {
      this.router.navigate(['/fos/lead-prospect-detail'], { queryParams: { 'view': this.action['view'] }, state: { 'value': 0 } });
    }
    else if (this.action['modify']) {
      this.router.navigate(['/fos/lead-prospect-detail'], { queryParams: { 'modify': this.action['modify'] }, state: { 'value': 0 } });
    }
    else {
      this.router.navigate(['/fos/lead-prospect-detail'], { state: { 'value': 0 } });
    }
  }

  save() {
    this.isSubmitted = true;
    if (this.guarantor2Form.valid && this.guarantor2DetailsForm.valid && this.guarantor2CommunicationAddressForm.valid && this.guarantor2PermanentAddressForm.valid && this.guarantor2KYCForm.valid) {
      this.isSubmitted = false;
    }
  }
}
