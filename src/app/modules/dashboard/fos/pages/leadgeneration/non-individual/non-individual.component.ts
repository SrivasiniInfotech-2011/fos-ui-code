import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-non-individual',
  templateUrl: './non-individual.component.html',
  styleUrl: './non-individual.component.scss'
})
export class NonIndividualComponent implements OnInit {

  public nonIndividualForm: FormGroup;
  public nonIndividualDetailsForm: FormGroup;
  public isSubmitted: boolean = false;
  public selectedTab: any;
  public action: any;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {
    this.nonIndividualForm = new FormGroup({
      leadNumber: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
    });

    this.nonIndividualDetailsForm = new FormGroup({
      publicCloselyHeld: new FormControl(''),
      noOfDirectors: new FormControl(''),
      listedExchange: new FormControl(''),
      paidUpCapital: new FormControl(''),
      sharesFaceValue: new FormControl(''),
      sharesBookValue: new FormControl(''),
      businessProfile: new FormControl(''),
      geographicalCoverage: new FormControl(''),
      noOfBranches: new FormControl(''),
      governmentInstitutionalParticipation: new FormControl(''),
      promoterStake: new FormControl(''),
      jvPartnerName: new FormControl(''),
      jvPartnerStake: new FormControl(''),
      ceoName: new FormControl('', [Validators.required]),
      ceoDateOfBirth: new FormControl('', [Validators.required]),
      ceoAge: new FormControl('', [Validators.required]),
      experienceInYears: new FormControl(''),
      weddingAnniversaryDate: new FormControl(''),
      residentialAddress: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.selectedTab = window.history.state?.value;

    this.route.queryParams.subscribe((params: Params) => {
      this.action = params
      if (this.action['view'] == "true") {
        this.nonIndividualForm.disable();
        this.nonIndividualDetailsForm.disable();
      }
      else {
        this.nonIndividualForm.enable();
        this.nonIndividualDetailsForm.enable();
      }
    })
  }


  onTabChanged(event: MatTabChangeEvent) {
    if (this.action['view'] == "true") {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-non-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 5:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
      }
    } else if (this.action['view'] == "false") {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-non-individual'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
        case 5:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { view: this.action['view'] },
            state: { value: event.index },
          });
          break;
      }
    } else {
      switch (event.index) {
        case 0:
          this.router.navigate(['/fos/lead-prospect-detail'], {
            state: { value: event.index },
          });
          break;
        case 1:
          this.router.navigate(['/fos/lead-loan-details'], {
            state: { value: event.index },
          });
          break;
        case 2:
          this.router.navigate(['/fos/lead-individual'], {
            state: { value: event.index },
          });
          break;
        case 3:
          this.router.navigate(['/fos/lead-non-individual'], {
            state: { value: event.index },
          });
          break;
        case 4:
          this.router.navigate(['/fos/lead-guarantor-1'], {
            state: { value: event.index },
          });
          break;
        case 5:
          this.router.navigate(['/fos/lead-guarantor-2'], {
            state: { value: event.index },
          });
          break;
      }
    }
  }

  back() {
    this.location.back();
  }

  submit() {
    this.isSubmitted = true;
    if (this.nonIndividualForm?.valid && this.nonIndividualDetailsForm?.valid) {
      this.isSubmitted = false;
    }
  }
}

