import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
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
  ILead,
  ILeadHeader,
  ILeadTranslanderRequest,
} from '../../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { IFOSLookup } from '../../../../../../../core/interfaces/app/request/IFOSModels';
@Component({
  selector: 'app-lead-master',
  templateUrl: './lead-master.component.html',
  styleUrl: './lead-master.component.scss',
})
export class LeadMasterComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  public totalRecords: number = 0;
  public loggedInUser: any = {};
  public leadStatuses: IFOSLeadStatus[] = [];
  public leads: ILeadHeader[] = [];
  public searchParametersForm: FormGroup;

  public isSearched: boolean = false;
  public showLeadTable: boolean = false;
  public displayedColumns: string[] = [
    'leadNumber',
    'leadDate',
    'status',
    'view',
    'modify',
  ];
  public dataSource = new MatTableDataSource<ILeadHeader>();

  filters: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private leadsService: FOSLeadMasterService,
    private router: Router,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private encryptionService: EncryptionService
  ) {
    this.searchParametersForm = new FormGroup({
      leadNumber: new FormControl(''),
      vehicleNumber: new FormControl(''),
      status: new FormControl(''),
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('userDetails')) {
      const encryptedUserData = localStorage.getItem('userDetails');
      if (encryptedUserData) {
        // Decrypt data
        const decryptedUserData =
          this.encryptionService.decrypt(encryptedUserData);
        this.loggedInUser = decryptedUserData || '';
        this.dataSource.paginator = this.paginator;
        this.fetchLeadGenerationLookup();
        this.setSearchParametersForm();
        this.getLeadStatusesForFiltering();
        this.onSearch();
      }
    }
  }

  // Apply filter for a specific column
  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    // Update the filter for the specific column
    this.filters[column] = filterValue;

    // Combine filters and set the filtered data
    this.dataSource.filterPredicate = (data: any, filter) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every((key) =>
        data[key].toString().toLowerCase().includes(filters[key])
      );
    };

    this.dataSource.filter = JSON.stringify(this.filters);
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
    this.leadsService.fetchLeadStatuses().subscribe({
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
    this.loaderService.showLoader();
    this.isSearched = true;
    if (this.searchParametersForm.valid) {
      this.isSearched = false;
      this.showLeadTable = true;
    } else {
      this.showLeadTable = false;
    }
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
          this.loaderService.hideLoader();
          this.totalRecords = data.message.totalRecords;
          this.leads = data.message.leads as ILeadHeader[];
          this.dataSource = new MatTableDataSource(this.leads);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          let errorMessages = error.message.split('|');
          for (const key in errorMessages) {
            this.toasterService.error(errorMessages[key], 'Error', {
              timeOut: 2000,
            });
          }
        },
      });
  }

  clearForm() {
    this.searchParametersForm.reset();
  }

  createLead() {
    localStorage.removeItem('leadDetails');
    this.router.navigate(['fos/lead-prospect-detail'], { state: { value: 0 } });
  }

  fetchLeadGenerationLookup() {
    this.loaderService.showLoader();
    localStorage.removeItem('leadDetails');
    this.leadsService
      .fetchLeadGenerationLookup(
        this.loggedInUser.companyId,
        this.loggedInUser.userId
      )
      .subscribe({
        next: (data: any) => {
          this.loaderService.hideLoader();
          let lookupData = data.message as IFOSLookup[];

          localStorage.setItem(
            'leadGenerationLookups',
            JSON.stringify(lookupData)
          );
        },
        error: (error: any) => {
          this.loaderService.hideLoader();
          let errorMessages = error.message.split('|');
          for (const key in errorMessages) {
            this.toasterService.error(errorMessages[key], 'Error', {
              timeOut: 2000,
            });
          }
        },
      });
  }

  viewLead(leadId: any) {
    this.getLeadDetails(leadId).subscribe({
      next: (response: any) => {
        let lead = response.message as ILead;
        localStorage.setItem('leadDetails', JSON.stringify(lead));
        this.router.navigate(['fos/lead-prospect-detail'], {
          queryParams: { view: true, value: 1  },
        });
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        let errorMessages = error.message.split('|');
        for (const key in errorMessages) {
          this.toasterService.error(errorMessages[key], 'Error', {
            timeOut: 2000,
          });
        }
      },
    });
  }

  modifyLead(leadId: any) {
    this.getLeadDetails(leadId).subscribe({
      next: (response: any) => {
        let lead = response.message as ILead;
        localStorage.setItem('leadDetails', JSON.stringify(lead));
        this.router.navigate(['fos/lead-loan-details'], {
          queryParams: { view: false, value: 2 },
        });
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        let errorMessages = error.message.split('|');
        for (const key in errorMessages) {
          this.toasterService.error(errorMessages[key], 'Error', {
            timeOut: 2000,
          });
        }
      },
    });
  }

  getLeadDetails(leadId: number) {
    this.loaderService.showLoader();
    return this.leadsService.fetchLeadDetails(
      this.loggedInUser.companyId,
      this.loggedInUser.userId,
      leadId,
      '',
      ''
    );
  }
}
