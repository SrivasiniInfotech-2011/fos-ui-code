import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { EncryptionService } from '../../../../../../../data/services/shared/encryption.service';
import { ToastrService } from 'ngx-toastr';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import {
  IFOSLeadStatus,
  ILeadHeader,
  ILeadTranslanderRequest,
} from '../../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
@Component({
  selector: 'app-lead-master',
  templateUrl: './lead-master.component.html',
  styleUrl: './lead-master.component.scss',
})
export class LeadMasterComponent implements OnInit {
  public totalRecords:number=0;
  public loggedInUser: any = {};
  public leadStatuses: IFOSLeadStatus[] = [];
  public leads: ILeadHeader[] = [];
  public searchParametersForm: FormGroup | any = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private leadsService: FOSLeadMasterService,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private encryptionService: EncryptionService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        // Decrypt data
        const decryptedUserData =
          this.encryptionService.decrypt(encryptedUserData);
        this.loggedInUser = decryptedUserData || '';
        this.setSearchParametersForm();
        this.getLeadStatusesForFiltering();
      }
    }
  }

  setSearchParametersForm = () => {
    this.searchParametersForm = this.fb.group({
      leadNumber: this.fb.control(''),
      vehicleNumber: this.fb.control(''),
      status: this.fb.control(''),
    });
  };

  getLeadStatusesForFiltering() {
    this.loaderService.showLoader();
    this.leadsService.fetchLeStatuses().subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          this.leadStatuses = data.message as IFOSLeadStatus[];
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
  }

  onSearch() {
    this.leadsService
      .getLeadTranslanderDetails({
        companyId: this.loggedInUser.companyId,
        currentPage: 1,
        leadNumber: this.searchParametersForm.value.leadNumber,
        status: this.searchParametersForm.value.status,
        pageSize: 100,
        searchValue: '',
        userId: this.loggedInUser.userId,
        vehicleNumber: this.searchParametersForm.value.vehicleNumber,
      } as ILeadTranslanderRequest)
      .subscribe({
        next: (data: any) => {
          this.totalRecords =data.message.totalRecords;
          this.leads = data.message.leads as ILeadHeader[];
        },
        error: (error: any) => {},
      });
  }
}
