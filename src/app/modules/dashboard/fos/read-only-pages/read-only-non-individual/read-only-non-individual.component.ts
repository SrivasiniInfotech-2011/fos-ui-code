import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILead, ILeadHeader, ILeadNonIndividualDetail } from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';

@Component({
  selector: 'app-read-only-non-individual',
  templateUrl: './read-only-non-individual.component.html',
  styleUrl: './read-only-non-individual.component.scss'
})
export class ReadOnlyNonIndividualComponent implements OnInit{

  public nonIndividualForm: FormGroup | any = new FormGroup({});
  public nonIndividualDetailsForm: FormGroup | any = new FormGroup({});
  public publicTypeLookup: IFOSLookup[] = [];
  public instTypeLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};

  constructor(private utilityService: UtilsService) {
    this.nonIndividualForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
    });
    this.nonIndividualDetailsForm = new FormGroup({
      publicCloselyHeld: new FormControl({ value: '', disabled: true }),
      noOfDirectors: new FormControl({ value: '', disabled: true }),
      listedExchange: new FormControl({ value: '', disabled: true }),
      paidUpCapital: new FormControl({ value: '', disabled: true }),
      sharesFaceValue: new FormControl({ value: '', disabled: true }),
      sharesBookValue: new FormControl({ value: '', disabled: true }),
      businessProfile: new FormControl({ value: '', disabled: true }),
      geographicalCoverage: new FormControl({ value: '', disabled: true }),
      noOfBranches: new FormControl({ value: '', disabled: true }),
      governmentInstitutionalParticipation: new FormControl({ value: '', disabled: true }),
      promoterStake: new FormControl({ value: '', disabled: true }),
      jvPartnerName: new FormControl({ value: '', disabled: true }),
      jvPartnerStake: new FormControl({ value: '', disabled: true }),
      ceoName: new FormControl({ value: '', disabled: true }),
      ceoDateOfBirth: new FormControl({ value: '', disabled: true }),
      ceoAge: new FormControl({ value: '', disabled: true }),
      experienceInYears: new FormControl({ value: '', disabled: true }),
      weddingAnniversaryDate: new FormControl({ value: '', disabled: true }),
      residentialAddress: new FormControl({ value: '', disabled: true }),
    });
  }


  ngOnInit(): void {

      let leadDetails = JSON.parse(localStorage.getItem('leadDetails') || '{}') as ILead;

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

        if (leadDetails && leadDetails?.nonIndividualDetail) {
          this.setLeadNonIndividualDetails(leadDetails?.nonIndividualDetail!);
        }

  }


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

    setLookups() {
      let lookup = JSON.parse(
        localStorage.getItem('leadGenerationLookups') || '[]'
      ) as IFOSLookup[];
      this.publicTypeLookup = lookup?.filter((s) => s.lookupTypeId == 33);
      this.instTypeLookup = lookup?.filter((s) => s.lookupTypeId == 34);
    }

}
