import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-lead-prospect-detail',
  templateUrl: './lead-prospect-detail.component.html',
  styleUrl: './lead-prospect-detail.component.scss'
})
export class LeadProspectDetailComponent implements OnInit {

  public prospectDetailsForm1: FormGroup;
  public prospectDetailsForm2: FormGroup;
  public isSubmitted: boolean = false;
  public saveDetails: boolean = false;
  public selectedTab: any;
  public readOnly: boolean = false;
  public action: any;
  public buttonDisabled: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.prospectDetailsForm1 = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?) |0)?[0-9]{10}$')]),
      aadharNumber: new FormControl('', [Validators.required, Validators.pattern('^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$')]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]),
    });

    this.prospectDetailsForm2 = new FormGroup({
      branch: new FormControl('', [Validators.required]),
      leadNumber: new FormControl(''),
      leadDate: new FormControl(''),
      leadType: new FormControl(''),
      prospectName: new FormControl(''),
      vehicleNumber: new FormControl('', [Validators.required]),
      prospectAddress: new FormControl(''),
      prospectType: new FormControl('')
    });

  }

  ngOnInit(): void {
    let tabValue = window.history.state?.value;
    this.selectedTab = tabValue;

    this.route.queryParams.subscribe((params: Params) => {
      this.action = params
      if (params['view']) {
        this.prospectDetailsForm1.disable();
        this.prospectDetailsForm2.disable();
        this.buttonDisabled = true;
      }
      else {
        this.prospectDetailsForm1.enable();
        this.prospectDetailsForm2.enable();
        this.buttonDisabled = false;
      }
    })
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

  go() {
    this.saveDetails = true;
    if (this.prospectDetailsForm1.valid) {
      this.saveDetails = false;
    }
  }

  submit() {
    this.isSubmitted = true;
    if (this.prospectDetailsForm2.valid) {
      this.isSubmitted = false;
    }
  }
}
