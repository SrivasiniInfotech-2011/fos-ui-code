import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILead, ILeadGuarantor, ILeadHeader } from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { ToastrService } from 'ngx-toastr';
import { FOSProspectService } from '../../../../../../data/services/feature/prospectMaster/prospects.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';

@Component({
  selector: 'app-read-only-guarantor-1',
  templateUrl: './read-only-guarantor-1.component.html',
  styleUrl: './read-only-guarantor-1.component.scss'
})
export class ReadOnlyGuarantor1Component implements OnInit {

  public guarantor1Form: FormGroup | any = new FormGroup({});
  public guarantor1DetailsForm: FormGroup | any = new FormGroup({});
  public guarantor1CommunicationAddressForm: FormGroup | any = new FormGroup({});
  public guarantor1PermanentAddressForm: FormGroup | any = new FormGroup({});
  public guarantor1KYCForm: FormGroup | any = new FormGroup({});
  public genderLookup: IFOSLookup[] = [];
  public stateLookup: IFOSLookup[] = [];
  public countryLookup: IFOSLookup[] = [];
  public guarantorRelationshipLookup: IFOSLookup[] = [];
  public guarantorTypeLookup: IFOSLookup[] = [];
  public leadHeader: ILeadHeader = {};
  public guarantorImageFilePath: string = '';
  public aadharImageFilePath: string = '';
  public panNumberImageFilePath: string = '';


  constructor(
     private utilityService: UtilsService,
    private loaderService: LoaderService,
    private prospectService: FOSProspectService,
    private toasterService: ToastrService,) {
    this.guarantor1Form = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
    });

    this.guarantor1DetailsForm = new FormGroup({
      guarantorName: new FormControl({ value: '', disabled: true }),
      relationship: new FormControl({ value: '', disabled: true }),
      gender: new FormControl({ value: '', disabled: true }),
      dateOfBirth: new FormControl({ value: '', disabled: true }),
      mobileNumber: new FormControl({ value: '', disabled: true }),
      alternateMobileNumber: new FormControl({ value: '', disabled: true }),
      guarantorAmount: new FormControl({ value: '', disabled: true }),
    });

    this.guarantor1CommunicationAddressForm = new FormGroup({
      addressLine1: new FormControl({ value: '', disabled: true }),
      addressLine2: new FormControl({ value: '', disabled: true }),
      landmark: new FormControl({ value: '', disabled: true }),
      city: new FormControl({ value: '', disabled: true }),
      state: new FormControl({ value: '', disabled: true }),
      country: new FormControl({ value: '', disabled: true }),
      pincode: new FormControl({ value: '', disabled: true }),
    });

    this.guarantor1PermanentAddressForm = new FormGroup({
      addressLine1: new FormControl({ value: '', disabled: true }),
      addressLine2: new FormControl({ value: '', disabled: true }),
      landmark: new FormControl({ value: '', disabled: true }),
      city: new FormControl({ value: '', disabled: true }),
      state: new FormControl({ value: '', disabled: true }),
      country: new FormControl({ value: '', disabled: true }),
      pincode: new FormControl({ value: '', disabled: true }),
    });

    this.guarantor1KYCForm = new FormGroup({
      aadharNumber: new FormControl({ value: '', disabled: true }),
      panNumber: new FormControl({ value: '', disabled: true }),
      guarantorImage: new FormControl({ value: '', disabled: true }),
      aadharImage: new FormControl({ value: '', disabled: true }),
      panImage: new FormControl({ value: '', disabled: true }),
    });
  }


  ngOnInit(): void {
    this.getStates()
    this.getProspectLookup()
    this.leadHeader = JSON.parse(
      localStorage.getItem('leadHeader')!
    ) as ILeadHeader;
    let leadDetails = JSON.parse(localStorage.getItem('leadDetails') || '{}') as ILead;

    if (leadDetails && leadDetails.header)
      this.leadHeader = leadDetails.header;

    if (this.leadHeader) {
      this.guarantor1Form
        .get('leadNumber')!
        .setValue(this.leadHeader.leadNumber!);
      this.guarantor1Form
        .get('vehicleNumber')!
        .setValue(this.leadHeader.vehicleRegistrationNumber!);
    }

    if (
      leadDetails &&
      leadDetails?.leadProspectDetail &&
      leadDetails?.guarantors
    ) {
      this.setGuarantorDetails(
        leadDetails?.lobId,
        leadDetails?.header!,
        leadDetails?.guarantors![0]!
      );
    }
  }

  private setGuarantorDetails(
    lobId: number,
    header: ILeadHeader,
    guarantor: ILeadGuarantor
  ) {
    this.leadHeader = header;
    this.guarantor1Form
      .get('leadNumber')!
      .setValue(this.leadHeader.leadNumber!);
    this.guarantor1Form
      .get('vehicleNumber')!
      .setValue(this.leadHeader.vehicleRegistrationNumber!);
    this.guarantor1DetailsForm
      .get('guarantorName')!
      .setValue(guarantor!.guarantorName);

    this.guarantor1DetailsForm
      .get('relationship')!
      .setValue(guarantor!.guarantorRelationshipLookupValueId);

    this.guarantor1DetailsForm.get('gender')!.setValue(guarantor!.genderId);

    this.guarantor1DetailsForm
      .get('dateOfBirth')!
      .setValue(
        this.utilityService.transformDate(
          String(guarantor!.guaranterDateOfBirth),
          'YYYY-MM-DD'
        )
      );

    this.guarantor1DetailsForm
      .get('mobileNumber')!
      .setValue(guarantor!.mobileNumber);

    this.guarantor1DetailsForm
      .get('alternateMobileNumber')!
      .setValue(guarantor!.alternateMobileNumber);

    this.guarantor1DetailsForm
      .get('guarantorAmount')!
      .setValue(guarantor!.guarantorAmount);

    this.guarantor1CommunicationAddressForm
      .get('addressLine1')!
      .setValue(guarantor!.communicationAddress?.addressLine1);

    this.guarantor1CommunicationAddressForm
      .get('addressLine2')!
      .setValue(guarantor!.communicationAddress?.addressLine2);

    this.guarantor1CommunicationAddressForm
      .get('landmark')!
      .setValue(guarantor!.communicationAddress?.landmark);

    this.guarantor1CommunicationAddressForm
      .get('city')!
      .setValue(guarantor!.communicationAddress?.city);

    this.guarantor1CommunicationAddressForm
      .get('state')!
      .setValue(guarantor!.communicationAddress?.stateId);

    this.guarantor1CommunicationAddressForm
      .get('country')!
      .setValue(guarantor!.communicationAddress?.countryId);

    this.guarantor1CommunicationAddressForm
      .get('pincode')!
      .setValue(guarantor!.communicationAddress?.pincode);

    this.guarantor1PermanentAddressForm
      .get('addressLine1')!
      .setValue(guarantor!.permanentAddress?.addressLine1);

    this.guarantor1PermanentAddressForm
      .get('addressLine2')!
      .setValue(guarantor!.permanentAddress?.addressLine2);

    this.guarantor1PermanentAddressForm
      .get('landmark')!
      .setValue(guarantor!.permanentAddress?.landmark);

    this.guarantor1PermanentAddressForm
      .get('city')!
      .setValue(guarantor!.permanentAddress?.city);

    this.guarantor1PermanentAddressForm
      .get('state')!
      .setValue(guarantor!.permanentAddress?.stateId);

    this.guarantor1PermanentAddressForm
      .get('country')!
      .setValue(guarantor!.permanentAddress?.countryId);

    this.guarantor1PermanentAddressForm
      .get('pincode')!
      .setValue(guarantor!.permanentAddress?.pincode);

    this.guarantor1KYCForm
      .get('aadharNumber')!
      .setValue(guarantor!.aadharNumber);

    this.guarantor1KYCForm.get('panNumber')!.setValue(guarantor.panNumber);

    this.guarantor1KYCForm
      .get('guarantorImage')!
      .setValue(guarantor.guarantorImagePath);

    this.guarantor1KYCForm
      .get('aadharImage')!
      .setValue(guarantor.aadharImagePath);

    this.guarantor1KYCForm.get('panImage')!.setValue(guarantor.panImagePath);

    this.aadharImageFilePath = guarantor.aadharImagePath!;
    this.panNumberImageFilePath = guarantor.panImagePath!;
    this.guarantorImageFilePath = guarantor.guarantorImagePath!;
  }

  getStates() {
    this.loaderService.showLoader();
    this.prospectService.fetchStates().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          this.stateLookup = lookItems;
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }

  getProspectLookup() {
    this.loaderService.showLoader();
    this.prospectService.fetchProspectLookup().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          let lookItems = data.message as IFOSLookup[];
          this.setLookups(lookItems);
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }

  private setLookups(lookItems: IFOSLookup[]) {
    this.genderLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 2
    );
    this.countryLookup = lookItems.filter(
      (s: IFOSLookup) => s.lookupTypeId == 22
    );
    let lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups')!
    ) as IFOSLookup[];
    this.guarantorRelationshipLookup = lookup.filter(
      (s) => s.lookupTypeId == 18
    );
    this.guarantorTypeLookup = lookup.filter((s) => s.lookupTypeId == 17);
  }

}
