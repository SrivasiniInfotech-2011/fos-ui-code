import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ILeadHeader,
  ILeadProspectDetail,
} from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { UtilsService } from '../../../../../../data/services/shared/utils.service';
import { FOSLeadMasterService } from '../../../../../../data/services/feature/leadMaster/leadmaster.service';
import {
  ICustomerProspectData,
  ICustomerProspectRequest,
  IFOSLookup,
} from '../../../../../../core/interfaces/app/request/IFOSModels';
import { EncryptionService } from '../../../../../../data/services/shared/encryption.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../../../../shared/components/modal/modal-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-viewloan-details',
  templateUrl: './viewloan-details.component.html',
  styleUrl: './viewloan-details.component.scss',
})
export class ViewloanDetailsComponent implements OnInit {
  public prospectSearchForm: FormGroup | any = new FormGroup({});
  public leadGenerationForm: FormGroup | any = new FormGroup({});
  public submittedForm1: boolean = false;
  public submittedForm2: boolean = false;

  constructor(
   
  ) {
    
  }

  initializeForm() {
    this.prospectSearchForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required]),
    });

    this.leadGenerationForm = new FormGroup({
      mobileNo: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      leadNumber: new FormControl({ value: '', disabled: true }, []),
      leadDate: new FormControl(
       '' ,
        [Validators.required]
      ),
      leadType: new FormControl('', [Validators.required]),
      prospectName: new FormControl('', [Validators.required]),
      vehicleNumber: new FormControl('', [Validators.required]),
      prospectType: new FormControl('', [Validators.required]),
      prospectAddress: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    
  }

  
}
