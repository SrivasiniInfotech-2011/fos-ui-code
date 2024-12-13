import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fvr-vehicle',
  templateUrl: './fvr-vehicle.component.html',
  styleUrl: './fvr-vehicle.component.scss'
})
export class FvrVehicleComponent {


  public fvrVehicleLeadForm:FormGroup;
  public isSubmitted:boolean = false;
  public showTable:boolean = false;
  public displayedColumns: string[] = ['leadNo', 'date', 'status', 'view']
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



  constructor(){
    this.fvrVehicleLeadForm = new FormGroup({
      leadNumber:new FormControl(''),
      vehicleNumber:new FormControl('')
    });
    let obj: any[] =
    [
      {
        'leadNumber': 'FOSLDN007',
        'date': '22/11/2024',
        'status': 'Field Verification Completed',
      },
      {
        'leadNumber': 'FOSLDN007',
        'date': '22/11/2024',
        'status': 'Field Verification Completed',
      },
      {
        'leadNumber': 'FOSLDN007',
        'date': '22/11/2024',
        'status': 'Field Verification Completed',
      },
      {
        'leadNumber': 'FOSLDN007',
        'date': '22/11/2024',
        'status': 'Field Verification Completed',
      },
      {
        'leadNumber': 'FOSLDN007',
        'date': '22/11/2024',
        'status': 'Field Verification Completed',
      }
    ]

  this.dataSource = new MatTableDataSource<any>(obj)

}


ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}




  search(){
   this.showTable = true;
  }

  clear(){
    this.fvrVehicleLeadForm.reset();
  }
}
