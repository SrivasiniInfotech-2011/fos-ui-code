import { Component , ViewChild ,OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  IHierarchyLookupDetails,
  IFOSLookup,
  InsertLocationMaster,
  GerLoctionTypes
} from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
import { LocationMasterService } from '../../../../../../../data/services/feature/locationMaster/location-master.service';
import { FOSLeadMasterService } from '../../../../../../../data/services/feature/leadMaster/leadmaster.service';
import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrl: './location-master.component.scss'
})
export class LocationMasterComponent implements  OnInit {

 @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  // selectedView: string = 'definition'; // Default view
  public showTable: boolean = true
  public displayedColumns: string[] = ['LocationCode', 'LocationDiscription','HierarchyDiscription','view','modify']
  public dataSource = new MatTableDataSource<any>()
  filters: { [key: string]: string } = {};
  users: GerLoctionTypes[] = []; // Array to store user data
  public currentView: string = ''; // Track the current view (Corporate, State, or Branch)

  ngOnInit(): void {
    this.getCorporateLookup();
  }

  ngAfterViewInit():void { 
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.error('DataSource is not initialized!');
    }
  }

   constructor(private fb: FormBuilder,
    private router: Router,
          private utilityService: UtilsService,
          private leadsService: FOSLeadMasterService,
          private loaderService: LoaderService,
          private locationMasterService: LocationMasterService,
          private toasterService: ToastrService,
    ) {}

  getCorporateLookup() {
    this.currentView = 'Corporate';
   this.loaderService.showLoader();
   this.locationMasterService
     .fetchCorporateLookup({
      Parent_ID: 1,
      Company_ID:1      
     })
     .subscribe({
       next: (data: any) => {
         this.loaderService.hideLoader();
         if (data && data.message) {
           this.users = data.message as GerLoctionTypes[];
          
           this.dataSource = new MatTableDataSource(this.users);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
            console.log(this.users)
            this.showTable = true
         }
       },
       error: (error: any) => {
         this.loaderService.hideLoader();
         this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
       },
     });
 }
 getStateLookup() {
  this.currentView = 'State';
  this.loaderService.showLoader();
  this.locationMasterService
    .fetchCorporateLookup({
     Parent_ID: 2,
     Company_ID:1      
    })
    .subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          this.users = data.message as GerLoctionTypes[];
         
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
           console.log(this.users)
           this.showTable = true
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
}
getBranchLookup() {
  this.currentView = 'Branch';
  this.loaderService.showLoader();
  this.locationMasterService
    .fetchCorporateLookup({
     Parent_ID: 3,
     Company_ID:1      
    })
    .subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          this.users = data.message as GerLoctionTypes[];
         
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
           console.log(this.users)
           this.showTable = true
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
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


viewOrModifyUser(location_ID: string, action: string): void {
  console.log('Location ID:', location_ID);
  // Navigate to the 'user-create' path with userId and action as query parameters
  this.router.navigate(['/location-master-create'], { queryParams: { location_ID, action } });
}


  // Define columns dynamically based on the selected view
  // get displayedColumns(): string[] {
  //   if (this.selectedView === 'definition') {
  //     // Columns for "Location Definition"
  //     return ['userCode', 'locationDescription', 'hierarchyDescription', 'view', 'modify'];
  //   } else if (this.selectedView === 'mapping') {
  //     // Columns for "Location Mapping"
  //     return ['userCode', 'locationDescription', 'view', 'modify'];
  //   }
  //   return [];
  // }

}
