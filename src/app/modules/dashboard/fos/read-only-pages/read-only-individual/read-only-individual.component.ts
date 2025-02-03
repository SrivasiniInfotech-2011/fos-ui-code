import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ILeadHeader, ILead, ILeadIndividualDetail } from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';

@Component({
  selector: 'app-read-only-individual',
  templateUrl: './read-only-individual.component.html',
  styleUrl: './read-only-individual.component.scss'
})
export class ReadOnlyIndividualComponent implements OnInit {

  public individualForm: FormGroup | any = new FormGroup({});
  public individualDetailsForm: FormGroup | any = new FormGroup({});
  public isSubmitted: boolean = false;
  public maritalStatusLookup: IFOSLookup[] = [];
  public employmentLookup: IFOSLookup[] = [];
  public houseTypeLookup: IFOSLookup[] = [];
  public houseStatusLookup: IFOSLookup[] = [];
  private leadHeader: ILeadHeader = {};

  constructor() {
    this.individualForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
    });

    this.individualDetailsForm = new FormGroup({
      fatherName: new FormControl({ value: '', disabled: true }),
      motherName: new FormControl({ value: '', disabled: true }),
      maritalStatus: new FormControl({ value: '', disabled: true }),
      employment: new FormControl({ value: '', disabled: true }),
      netSalary: new FormControl({ value: '', disabled: true }),
      noOfAdultDependents: new FormControl({ value: '', disabled: true }),
      noOfChildDependents: new FormControl({ value: '', disabled: true }),
      houseType: new FormControl({ value: '', disabled: true }),
      floorFlatNumber: new FormControl({ value: '', disabled: true }),
      houseStatus: new FormControl({ value: '', disabled: true }),
      rentalLeaseAmount: new FormControl({ value: '', disabled: true }),
      owned2Wheeler: new FormControl({ value: '', disabled: true }),
      owned4Wheeler: new FormControl({ value: '', disabled: true }),
      ownedHeavyVehicle: new FormControl({ value: '', disabled: true }),
      existingLoans: new FormControl({ value: '', disabled: true }),
      totalExistingLoans: new FormControl({ value: '', disabled: true }),
      spouseName: new FormControl({ value: '', disabled: true }),
      spouseEmployment: new FormControl({ value: '', disabled: true }),
      spouseMonthlySalary: new FormControl({ value: '', disabled: true }),
    });
  }
  ngOnInit(): void {
    let leadDetails = JSON.parse(localStorage.getItem('leadDetails') || '{}') as ILead;
    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;

    if (this.leadHeader) {
      this.individualForm
        .get('leadNumber')!
        .setValue(this.leadHeader.leadNumber!);
      this.individualForm
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    } else if (leadDetails && leadDetails.header) {
      this.leadHeader = leadDetails.header;
      this.individualForm
        .get('leadNumber')!
        .setValue(leadDetails.header.leadNumber!);
      this.individualForm
        .get('vehicleNumber')!
        .setValue(leadDetails.header.vehicleRegistrationNumber!);
    }


    if (leadDetails && leadDetails?.individualDetail) {
      this.setLeadIndividualDetails(leadDetails?.individualDetail);
    }

    this.setLookups();

  }

  setLookups() {
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups') || '[]'
    ) as IFOSLookup[];
    this.maritalStatusLookup = lookup?.filter((s) => s.lookupTypeId == 32);
    this.houseStatusLookup = lookup?.filter((s) => s.lookupTypeId == 15);
    this.houseTypeLookup = lookup?.filter((s) => s.lookupTypeId == 14);
    this.employmentLookup = lookup?.filter((s) => s.lookupTypeId == 16);
  }

  setLeadIndividualDetails(individualDetail: ILeadIndividualDetail) {
    this.individualDetailsForm
      .get('fatherName')!
      .setValue(individualDetail!.fatherName);
    this.individualDetailsForm
      .get('motherName')!
      .setValue(individualDetail!.motherName);
    this.individualDetailsForm
      .get('maritalStatus')!
      .setValue(individualDetail!.maritialStatusLookupValueId);
    this.individualDetailsForm
      .get('employment')!
      .setValue(individualDetail!.employmentLookupValueId);
    this.individualDetailsForm
      .get('netSalary')!
      .setValue(individualDetail!.monthlySalary);
    this.individualDetailsForm
      .get('noOfAdultDependents')!
      .setValue(individualDetail!.adultDependents);
    this.individualDetailsForm
      .get('noOfChildDependents')!
      .setValue(individualDetail!.childDependents);
    this.individualDetailsForm
      .get('houseType')!
      .setValue(individualDetail!.houseLookupValueId);
    this.individualDetailsForm
      .get('floorFlatNumber')!
      .setValue(individualDetail!.doorFloorNumber);
    this.individualDetailsForm
      .get('houseStatus')!
      .setValue(individualDetail!.houseStatusLookupValueId);
    this.individualDetailsForm
      .get('rentalLeaseAmount')!
      .setValue(individualDetail!.houseRentalAmount);
    this.individualDetailsForm
      .get('owned2Wheeler')!
      .setValue(individualDetail!.ownTwoWheeler);
    this.individualDetailsForm
      .get('owned4Wheeler')!
      .setValue(individualDetail!.ownFourWheeler);
    this.individualDetailsForm
      .get('ownedHeavyVehicle')!
      .setValue(individualDetail!.ownHeavyVehicle);
    this.individualDetailsForm
      .get('existingLoans')!
      .setValue(individualDetail!.existingLoanEmi);
    this.individualDetailsForm
      .get('totalExistingLoans')!
      .setValue(individualDetail!.existingLoanCount);
    this.individualDetailsForm
      .get('spouseName')!
      .setValue(individualDetail!.spouseName);
    this.individualDetailsForm
      .get('spouseEmployment')!
      .setValue(individualDetail!.spouseEmploymentLookupValueId);
    this.individualDetailsForm
      .get('spouseMonthlySalary')!
      .setValue(individualDetail!.spouseSalary);
  }

}
