import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFOBranchLocation, IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read-only-prospect-master',
  templateUrl: './read-only-prospect-master.component.html',
  styleUrl: './read-only-prospect-master.component.scss'
})
export class ReadOnlyProspectMasterComponent implements OnInit {

  public basicDetailForm: FormGroup | any = new FormGroup({});
  public prospectDetailForm: FormGroup | any = new FormGroup({});
  public communicationAddressForm: FormGroup | any = new FormGroup({});
  public permanantAddressForm: FormGroup | any = new FormGroup({});
  public kycDetailForm: FormGroup | any = new FormGroup({});
  public countryLookup: IFOSLookup[] = [];
  public genderLookup: IFOSLookup[] = [];
  public stateLookup: IFOSLookup[] = [];
  public prospectTypeLookup: IFOSLookup[] = [];
  public prospectImageFilePath: string = '';
  public aadharImageFilePath: string = '';
  public panNumberImageFilePath: string = '';
  public branchLookup: IFOBranchLocation[] = [];
  public filteredBranches!: Observable<IFOBranchLocation[]>;


  constructor(private fb: FormBuilder) {
    this.setBasicDetailsForm()
    this.setCommunicationAddress()
    this.setPermanantAddress()
    this.setPrimaryKYCUplods()
    this.setProspectDetails()
  }

  ngOnInit(): void {
  }

  setBasicDetailsForm = () => {
    this.basicDetailForm = this.fb.group(
      {
        mobileNumber: this.fb.control({ value: '', disabled: true }),
        aadharNumber: this.fb.control({ value: '', disabled: true }),
        panNumber: this.fb.control({ value: '', disabled: true }),
      });
  };

  setProspectDetails = () => {
    this.prospectDetailForm = this.fb.group(
      {
        branch: this.fb.control({ value: '', disabled: true }),
        prospectCode: this.fb.control({ value: '', disabled: true }),
        prospectDate: this.fb.control({ value: '', disabled: true }),
        prospectName: this.fb.control({ value: '', disabled: true }),
        prospectType: this.fb.control({ value: '', disabled: true }),
        website: this.fb.control({ value: '', disabled: true }),
        dob: this.fb.control({ value: '', disabled: true }),
        age: this.fb.control({ value: '', disabled: true }),
        gender: this.fb.control({ value: '', disabled: true }),
        mobileNumber: this.fb.control({ value: '', disabled: true }),
        alternateMobileNumber: this.fb.control({ value: '', disabled: true }),
        email: this.fb.control({ value: '', disabled: true }),
      });
    this.prospectDetailForm.get('age')?.disable();
    this.prospectDetailForm.get('prospectCode')?.disable();
  };


  setPrimaryKYCUplods() {
    this.kycDetailForm = this.fb.group(
      {
        aadharNumber: this.fb.control({ value: '', disabled: true }),
        panNumber: this.fb.control({ value: '', disabled: true }),
        aadharImage: this.fb.control({ value: '', disabled: true }),
        panImage: this.fb.control({ value: '', disabled: true }),
        prospectImage: this.fb.control({ value: '', disabled: true }),
      },
    );
  }

  setCommunicationAddress() {
    this.communicationAddressForm = this.fb.group({
      addressLine1: this.fb.control({ value: '', disabled: true }),
      addressLine2: this.fb.control({ value: '', disabled: true }),
      landmark: this.fb.control({ value: '', disabled: true }),
      city: this.fb.control({ value: '', disabled: true }),
      state: this.fb.control({ value: '', disabled: true }),
      country: this.fb.control({ value: '', disabled: true }),
      pincode: this.fb.control({ value: '', disabled: true }),
    });
  }

  setPermanantAddress() {
    this.permanantAddressForm = this.fb.group({
      addressLine1: this.fb.control({ value: '', disabled: true }),
      addressLine2: this.fb.control({ value: '', disabled: true }),
      landmark: this.fb.control({ value: '', disabled: true }),
      city: this.fb.control({ value: '', disabled: true }),
      state: this.fb.control({ value: '', disabled: true }),
      country: this.fb.control({ value: '', disabled: true }),
      pincode: this.fb.control({ value: '', disabled: true }),
    });
  }

}
