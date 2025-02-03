import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IFOSLeadStatus, ILeadHeader } from '../../../../../../core/interfaces/app/leads/IFOSLeadsModel';
import { ToastrService } from 'ngx-toastr';
import { FOSLeadMasterService } from '../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { LoaderService } from '../../../../../../data/services/shared/loader.service';

@Component({
  selector: 'app-read-only-lead-master',
  templateUrl: './read-only-lead-master.component.html',
  styleUrl: './read-only-lead-master.component.scss'
})
export class ReadOnlyLeadMasterComponent implements OnInit {

  public searchParametersForm: FormGroup;
  public displayedColumns: string[] = [
    'leadNumber',
    'leadDate',
    'leadCurrentStatusDescription'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<ILeadHeader>([]);
  public leadStatuses: IFOSLeadStatus[] = [];

  constructor(
    private leadsService: FOSLeadMasterService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
  ) {
    this.searchParametersForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true }),
      status: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit(): void {
    this.getLeadStatusesForFiltering();
  }

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
}
