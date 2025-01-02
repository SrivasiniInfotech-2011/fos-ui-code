import { FormControl, FormGroup, Validators ,FormBuilder,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{UserManagementService} from'../../../../../../../data/services/feature/userManagement/user-management.service';
 import { UtilsService } from '../../../../../../../data/services/shared/utils.service';
 import { LoaderService } from '../../../../../../../data/services/shared/loader.service';
 import {
  IExistinghUserRequest,
  IExistinghUserRequestData,
  IExistinghUserRequestTranslander,
  IExistinghUserRequestTranslanderData,
  
} from '../../../../../../../core/interfaces/app/request/IFOSModels';
import { AfterViewInit, Component, ViewChild ,OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent  implements  OnInit {

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public showTable: boolean = false
  public displayedColumns: string[] = ['userCode', 'userName', 'email', 'designation','userLevel', 'view', 'modify']
  public dataSource = new MatTableDataSource<any>()
  filters: { [key: string]: string } = {};


  users: IExistinghUserRequestTranslanderData[] = []; // Array to store user data
  public loggedInUser: any = {};

 


  ngAfterViewInit():void { 
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.error('DataSource is not initialized!');
    }
  }

  displayTable() {
    this.showTable = true
  }




  constructor( private fb: FormBuilder,
     private router: Router,
    private utilityService: UtilsService,
    private loaderService: LoaderService,
    private toasterService: ToastrService,
    private useManagementService:UserManagementService,
    // private encryptionService: EncryptionService
  ) { }


  
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

  ngOnInit(): void {
    this.getExistingUserDetailsTranlander();
  }

  getExistingUserDetailsTranlander() {
    const companyId = this.loggedInUser?.companyId || 1;
     this.loaderService.showLoader();
    this.useManagementService.fetchExistingUserDetailsTranlander({
      companyId:companyId,
      userId: this.loggedInUser.userId
    } as IExistinghUserRequestTranslander).subscribe({
      next: (data: any) => {
        this.loaderService.hideLoader();
        if (data && data.message) {
          
          this.users = data.message as IExistinghUserRequestTranslanderData[];
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
           console.log(this.users)

        
        
        // Optional: You can call a method to trigger additional UI changes if needed
        this.displayTable();
        }
      },
      error: (error: any) => {
        this.loaderService.hideLoader();
        this.toasterService.error(error.message, 'Error', { timeOut: 3000 });
      },
    });
}




viewOrModifyUser(userId: string, action: string): void {
  console.log('User ID:', userId);
  // Navigate to the 'user-create' path with userId and action as query parameters
  this.router.navigate(['/user-create'], { queryParams: { userId, action } });
}

}


