import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {
  ILead,
  ILeadHeader,
  ILeadNonIndividualDetail,
} from '../../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { ModalComponent } from '../../../../../../shared/components/modal/modal-component';
@Component({
  selector: 'app-non-individual',
  templateUrl: './non-individual.component.html',
  styleUrl: './non-individual.component.scss',
})
export class NonIndividualComponent implements OnInit {
  public nonIndividualForm: FormGroup | any = new FormGroup({});
  public nonIndividualDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public selectedTab: any;
  public action: any;
  private leadHeader: ILeadHeader = {};
  private loggedInUser: any = {};
  public buttonDisabled: boolean = false;
  private leadId: number = 0;
  public publicTypeLookup: IFOSLookup[] = [];
  public instTypeLookup: IFOSLookup[] = [];
  public prospectType: string = '';
  public isCreateMode: boolean = false;
  constructor(
    private utilityService: UtilsService,
    private leadService: FOSLeadMasterService,
    private encryptionService: EncryptionService,
    private router: Router,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        // Decrypt data
        const decryptedUserData =
          this.encryptionService.decrypt(encryptedUserData);
        this.loggedInUser = decryptedUserData || '';
      }
    }
  }

  private generateNonIndividualForm() {
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
      residentialAddress: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.selectedTab = window.history.state?.value;
    this.generateNonIndividualForm();
    this.setLookups();
    this.prospectType = String(localStorage.getItem('LeadProspectType'));
    let leadDetails = JSON.parse(localStorage.getItem('leadDetails')!) as ILead;

    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;
    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;

    if (this.leadHeader) {
      this.nonIndividualForm
        .get('leadNumber')!
        .setValue(this.leadHeader.leadNumber!);
      this.nonIndividualForm
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    } else if (leadDetails && leadDetails.header) {
      this.leadHeader = leadDetails.header;
      this.nonIndividualForm
        .get('leadNumber')!
        .setValue(leadDetails.header.leadNumber!);
      this.nonIndividualForm
        .get('vehicleNumber')!
        .setValue(leadDetails.header.vehicleRegistrationNumber!);
    }

    this.route.queryParams.subscribe((params: Params) => {
      this.action = params;
      if (params['status'] == 'View') {
        this.nonIndividualForm.disable();
        this.nonIndividualDetailsForm.disable();
        this.buttonDisabled = true;
      } else if (params['status'] == 'Modify') {
        this.nonIndividualForm.enable();
        this.nonIndividualDetailsForm.enable();
        this.buttonDisabled = false;
      } else {
        this.nonIndividualForm.enable();
        this.nonIndividualDetailsForm.enable();
        this.buttonDisabled = false;
        this.isCreateMode = true;
      }

      if (leadDetails && leadDetails.nonIndividualDetail) {
        this.leadId = leadDetails.header?.leadId!;
        this.prospectType =
          leadDetails.leadProspectDetail?.prospectTypeDescription!;
        this.setLeadNonIndividualDetails(leadDetails.nonIndividualDetail!);
      }
    });
  }

  /**
   * Sets Non-Individual Details.
   * @param individualDetail Individual Detail object.
   */
  setLeadNonIndividualDetails(nonIndividualDetail: ILeadNonIndividualDetail) {
    this.nonIndividualDetailsForm
      .get('publicCloselyHeld')!
      .setValue(nonIndividualDetail!.publicCloselyLookupValueId);

    this.nonIndividualDetailsForm
      .get('noOfDirectors')!
      .setValue(nonIndividualDetail!.directorCount);

    this.nonIndividualDetailsForm
      .get('listedExchange')!
      .setValue(nonIndividualDetail!.listedExchange);

    this.nonIndividualDetailsForm
      .get('paidUpCapital')!
      .setValue(nonIndividualDetail!.paidUpCapital);

    this.nonIndividualDetailsForm
      .get('sharesFaceValue')!
      .setValue(nonIndividualDetail!.faceValueShare);

    this.nonIndividualDetailsForm
      .get('sharesBookValue')!
      .setValue(nonIndividualDetail!.bookValueShare);

    this.nonIndividualDetailsForm
      .get('businessProfile')!
      .setValue(nonIndividualDetail!.businessProfile);

    this.nonIndividualDetailsForm
      .get('geographicalCoverage')!
      .setValue(nonIndividualDetail!.geographicalCoverage);

    this.nonIndividualDetailsForm
      .get('noOfBranches')!
      .setValue(nonIndividualDetail!.branchCount);

    this.nonIndividualDetailsForm
      .get('governmentInstitutionalParticipation')!
      .setValue(nonIndividualDetail!.industryLookupValueId);

    this.nonIndividualDetailsForm
      .get('promoterStake')!
      .setValue(nonIndividualDetail!.promoterStakePercentage);

    this.nonIndividualDetailsForm
      .get('jvPartnerName')!
      .setValue(nonIndividualDetail!.jvPartnerName);

    this.nonIndividualDetailsForm
      .get('jvPartnerStake')!
      .setValue(nonIndividualDetail!.jvPartnerPercentage);

    this.nonIndividualDetailsForm
      .get('ceoName')!
      .setValue(nonIndividualDetail!.ceoName);

    this.nonIndividualDetailsForm
      .get('ceoDateOfBirth')!
      .setValue(
        this.utilityService.transformDate(
          String(nonIndividualDetail!.ceoDateofBirth),
          'YYYY-MM-DD'
        )
      );

    this.nonIndividualDetailsForm
      .get('ceoAge')!
      .setValue(
        this.utilityService.getAge(String(nonIndividualDetail!.ceoDateofBirth))
      );

    this.nonIndividualDetailsForm
      .get('experienceInYears')!
      .setValue(nonIndividualDetail!.ceoExperience);

    this.nonIndividualDetailsForm
      .get('weddingAnniversaryDate')!
      .setValue(
        this.utilityService.transformDate(
          String(nonIndividualDetail!.ceoWeddingDate),
          'YYYY-MM-DD'
        )
      );

    this.nonIndividualDetailsForm
      .get('residentialAddress')!
      .setValue(nonIndividualDetail!.residentialAddress);
  }
  navigateToNextTab() {
    this.onTabChanged({ index: 4 } as MatTabChangeEvent);
  }
  onTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/fos/lead-prospect-detail'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
      case 1:
        this.router.navigate(['/fos/lead-loan-details'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
      case 2:
        this.router.navigate(['/fos/lead-individual'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
      case 3:
        if (this.prospectType != 'Non Individual')
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { status: this.action['status'] },
            state: { value: 3 },
          });
        else
          this.router.navigate(['/fos/lead-non-individual'], {
            queryParams: { status: this.action['status'] },
            state: { value: 3 },
          });
        break;
      case 4:
        if (this.prospectType != 'Non Individual')
          this.router.navigate(['/fos/lead-guarantor-2'], {
            queryParams: { status: this.action['status'] },
            state: { value: event.index },
          });
        else
          this.router.navigate(['/fos/lead-guarantor-1'], {
            queryParams: { status: this.action['status'] },
            state: { value: event.index },
          });
        break;
      case 5:
        this.router.navigate(['/fos/lead-guarantor-2'], {
          queryParams: { status: this.action['status'] },
          state: { value: event.index },
        });
        break;
    }
  }
  calculateAge() {
    const dateOfBirth =
      this.nonIndividualDetailsForm.get('ceoDateOfBirth')?.value;
    if (dateOfBirth) {
      let age = this.utilityService.getAge(dateOfBirth);
      this.nonIndividualDetailsForm.get('ceoAge')?.setValue(age);
    }
  }
  setLookups() {
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    this.publicTypeLookup = lookup?.filter((s) => s.lookupTypeId == 33);
    this.instTypeLookup = lookup?.filter((s) => s.lookupTypeId == 34);
  }

  back() {
    this.router.navigate(['/fos/lead-individual'], {
      queryParams: { status: this.action['status'] },
      state: { value: 2 },
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.nonIndividualForm?.valid && this.nonIndividualDetailsForm?.valid) {
      this.isSubmitted = false;
      let nonIndividualDetail = {
        publicCloselyLookupValueId:
          this.nonIndividualDetailsForm.value.publicCloselyHeld,
        directorCount: this.nonIndividualDetailsForm.value.noOfDirectors,
        listedExchange: this.nonIndividualDetailsForm.value.listedExchange,
        paidUpCapital: this.nonIndividualDetailsForm.value.paidUpCapital,
        faceValueShare: this.nonIndividualDetailsForm.value.sharesFaceValue,
        bookValueShare: this.nonIndividualDetailsForm.value.sharesBookValue,
        businessProfile: this.nonIndividualDetailsForm.value.businessProfile,
        geographicalCoverage:
          this.nonIndividualDetailsForm.value.geographicalCoverage,
        branchCount: this.nonIndividualDetailsForm.value.noOfBranches,
        industryLookupValueId:
          this.nonIndividualDetailsForm.value
            .governmentInstitutionalParticipation,
        promoterStakePercentage:
          this.nonIndividualDetailsForm.value.promoterStake,
        jvPartnerName: this.nonIndividualDetailsForm.value.jvPartnerName,
        jvPartnerPercentage: this.nonIndividualDetailsForm.value.jvPartnerStake,
        ceoName: this.nonIndividualDetailsForm.value.ceoName,
        ceoDateofBirth: this.nonIndividualDetailsForm.value.ceoDateOfBirth,
        ceoExperience: this.nonIndividualDetailsForm.value.experienceInYears,
        ceoWeddingDate:
          this.nonIndividualDetailsForm.value.weddingAnniversaryDate,
        residentialAddress:
          this.nonIndividualDetailsForm.value.residentialAddress,
      } as ILeadNonIndividualDetail;

      this.loaderService.showLoader();
      this.leadService
        .addLeadNonIndividualDetails(
          this.loggedInUser.userId,
          this.leadHeader.leadId!,
          nonIndividualDetail
        )
        .subscribe({
          next: (data: any) => {
            this.loaderService.hideLoader();
            let leadDetails = JSON.parse(
              localStorage.getItem('leadDetails')!
            ) as ILead;
            leadDetails.nonIndividualDetail = nonIndividualDetail;
            localStorage.setItem('leadDetails', JSON.stringify(leadDetails));
            var dialogRef = this.dialog.open(ModalComponent, {
              data: {
                title: 'LEAD GENERATION',
                message: `The Lead ${this.leadHeader.leadNumber} has been updated with the Non Individual Details successfully.`,
              },
            });

            dialogRef.afterClosed().subscribe((result) => {
              this.onTabChanged({ index: 4 } as MatTabChangeEvent);
            });
          },
          error: (error: any) => {
            this.loaderService.hideLoader();
            this.toasterService.show(error);
          },
        });
    }
  }
}
