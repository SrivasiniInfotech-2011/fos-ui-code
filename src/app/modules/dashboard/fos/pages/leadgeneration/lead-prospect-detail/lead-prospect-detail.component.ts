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
  public selectedTab: any;
  public readOnly:boolean = false;

  constructor(private router: Router, private route:ActivatedRoute) {
    this.prospectDetailsForm1 = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
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

    this.route.queryParams.subscribe((params:Params) => {
      if(params['view']){
       this.prospectDetailsForm1.disable();
       this.prospectDetailsForm2.disable();
      }
      else{
        this.prospectDetailsForm1.enable();
       this.prospectDetailsForm2.enable();
      }
    })
  }

  onTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/fos/lead-prospect-detail'], { state: { 'value': event.index } }
        );
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

  submit() {
    this.isSubmitted = true;
    if (this.prospectDetailsForm1.valid && this.prospectDetailsForm2.valid) {
      this.isSubmitted = false;
    }
  }
}
