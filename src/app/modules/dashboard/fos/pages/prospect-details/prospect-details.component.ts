import { Component } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FOSProspectService } from '../../../../../../data/services/feature/prospectMaster/prospects.service';
import {
  ICustomerProspectData,
  ICustomerProspectRequest,
  IFOBranchLocation,
  IFOSLookup,
} from '../../../../../../core/interfaces/app/request/IFOSModels';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrl: './prospect-details.component.scss',
})
export class ProspectDetailsComponent {
  public prospectDetailsForm1: FormGroup;
  public prospectDetailsForm2: FormGroup;
  public submittedForm1: boolean = false;
  public submittedForm2: boolean = false;
  public branchLocations: IFOBranchLocation[] = [];
  public lookups: IFOSLookup[] = [];
  public customerProspectData: ICustomerProspectData = {};
  constructor(private prospectService: FOSProspectService) {
    this.prospectDetailsForm1 = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
    });

    this.prospectDetailsForm2 = new FormGroup({
      mobileNo: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      leadNumber: new FormControl('', [Validators.required]),
      leadDate: new FormControl('', [Validators.required]),
      leadType: new FormControl('', [Validators.required]),
      prospectName: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
      prospectType: new FormControl('', [Validators.required]),
      prospectAddress: new FormControl('', [Validators.required]),
    });
  }

  go() {
    this.submittedForm1 = true;
    if (this.prospectDetailsForm1.valid) {
      this.submittedForm1 = false;
    }
  }

  generateLead() {
    this.submittedForm2 = true;
    if (this.prospectDetailsForm2.valid) {
      this.submittedForm2 = false;
    }
  }

  getProspectLookup() {
    this.prospectService.fetchProspectLookup(this.prospectLookupCallback);
  }

  prospectLookupCallback(data: any) {}

  getBranchLocations() {
    this.prospectService
      .fetchBranchLocation({
        companyId: 0,
        isActive: false,
        lobId: 0,
        userId: 0,
      })
      .subscribe({
        next(data: any) {},
        error(err: any) {},
      });
  }

  getCustomerProspect() {
    this.prospectService
      .fetchCustomerProspect({
        companyId: 0,
        aadharNumber: '',
        mobileNumber: '',
        userId: 0,
        panNumber: '',
        prospectId: 0,
      })
      .subscribe({
        next(data: any) {},
        error(err: any) {},
      });
  }

  saveCustomerProspect() {
    var customerProspectData = {
      aadharNumber: '',
      companyId: 0,
      mobileNumber: '',
      panNumber: '',
      prospectId: 0,
      aadharImagePath: '',
      alternateMobileNumber: '',
      communicationAddress: {},
      email: '',
      genderId: 0,
      genderName: '',
      locationDescription: '',
      locationId: 0,
      panNumberImagePath: '',
      permanentAddress: {},
      prospectCode: '',
      prospectDate: new Date(),
      customerCode: '',
      customerId: 0,
      dateofBirth: new Date(),
      prospectImagePath: '',
      prospectName: '',
      prospectTypeId: 0,
      website: '',
    } as ICustomerProspectData;
    this.prospectService.createNewProspect(customerProspectData).subscribe({
      next(data: any) {},
      error(err: any) {},
    });
  }
}
