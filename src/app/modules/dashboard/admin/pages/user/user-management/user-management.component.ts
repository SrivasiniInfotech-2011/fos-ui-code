import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent  implements AfterViewInit {

  public showTable: boolean = false
  public displayedColumns: string[] = ['userCode', 'userName', 'email', 'designation','userLevel', 'view', 'modify']
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor() {
    let obj: any[] =
      [
        {
          'userCode': 'FOSDEMO',
          'userName': 'FOS DEMO User',
          'emailId': 'fosdemoascentya.in',
          'designation': 'SysAdmin',
          'userLevel':'System Admin'
        },
        {
          'userCode': 'FOSDEMO',
          'userName': 'FOS DEMO User',
          'emailId': 'fosdemoascentya.in',
          'designation': 'SysAdmin',
          'userLevel':'System Admin'
        },
        {
          'userCode': 'FOSDEMO',
          'userName': 'FOS DEMO User',
          'emailId': 'fosdemoascentya.in',
          'designation': 'SysAdmin',
          'userLevel':'System Admin'
        },
        {
          'userCode': 'FOSDEMO',
          'userName': 'FOS DEMO User',
          'emailId': 'fosdemoascentya.in',
          'designation': 'SysAdmin',
          'userLevel':'System Admin'
        },
        {
          'userCode': 'FOSDEMO',
          'userName': 'FOS DEMO User',
          'emailId': 'fosdemoascentya.in',
          'designation': 'SysAdmin',
          'userLevel':'System Admin'
        }

      ]

    this.dataSource = new MatTableDataSource<any>(obj)

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  displayTable() {
    this.showTable = true
  }

}
