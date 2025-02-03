import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { ILead, ILeadProspectDetail } from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { IFOSLookup } from '../../../../../../core/interfaces/app/request/IFOSModels';

@Component({
  selector: 'app-read-only-prospect-details',
  templateUrl: './read-only-prospect-details.component.html',
  styleUrl: './read-only-prospect-details.component.scss'
})
export class ReadOnlyProspectDetailsComponent implements OnInit {

  public prospectSearchForm: FormGroup;
  public leadGenerationForm: FormGroup;
  public leadTypeLookup: IFOSLookup[] = [];

  constructor( private utilityService: UtilsService) {
    this.prospectSearchForm = new FormGroup(
      {
        mobileNumber: new FormControl({ value: '', disabled: true }),
        aadharNumber: new FormControl({ value: '', disabled: true }),
        panNumber: new FormControl({ value: '', disabled: true }),
      });

    this.leadGenerationForm = new FormGroup({
      branch: new FormControl({ value: '', disabled: true }),
      leadNumber: new FormControl({ value: '', disabled: true }),
      leadDate: new FormControl({ value: '', disabled: true }),
      leadType: new FormControl({ value: '', disabled: true }),
      prospectName: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      prospectAddress: new FormControl({ value: '', disabled: true }),
      prospectType: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit(): void {
    var lookup = JSON.parse(
      localStorage.getItem('leadGenerationLookups') || '[]') as IFOSLookup[];
    this.leadTypeLookup = lookup?.filter((s) => s.lookupTypeId == 4);
    this.leadGenerationForm
      .get('leadDate')!
      .setValue(
        this.utilityService.transformDate(String(new Date()), 'YYYY-MM-DD')
      );

    let leadDetails = JSON.parse(localStorage.getItem('leadDetails') || '{}') as ILead;

    if (leadDetails) {
      if (leadDetails && leadDetails.header) {
        this.leadGenerationForm
          .get('leadNumber')!
          .setValue(leadDetails.header.leadNumber);
        this.leadGenerationForm.get('leadDate')?.setValue(
            this.utilityService.transformDate(String(leadDetails?.header?.leadDate), 'YYYY-MM-DD')
          )
           ;
      }

      this.setLeadGenerationDetails(leadDetails?.leadProspectDetail                     );
    }
  }

  setLeadGenerationDetails(data?: ILeadProspectDetail) {
    this.prospectSearchForm.get('mobileNumber')!.setValue(data?.mobileNumber);
    this.prospectSearchForm.get('aadharNumber')!.setValue(data?.aadharNumber);
    this.prospectSearchForm.get('panNumber')!.setValue(data?.panNumber);
    this.leadGenerationForm.get('branch')!.setValue(data?.locationName);
    this.leadGenerationForm.get('leadType')!.setValue(data?.leadType);
    this.leadGenerationForm.get('prospectName')!.setValue(data?.prospectName);
    this.leadGenerationForm.get('vehicleNumber')!.setValue(data?.vehicleNumber);
    this.leadGenerationForm.get('prospectType')!.setValue(data?.prospectTypeDescription);
    this.leadGenerationForm.get('prospectAddress')!.setValue(data?.prospectAddress);
  }
}
