import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entity-master',
  templateUrl: './entity-master.component.html',
  styleUrl: './entity-master.component.scss'
})
export class EntityMasterComponent implements AfterViewInit {

  public showEntityTable: boolean = false
  public displayedColumns: string[] = ['entType', 'entCode', 'entName', 'view', 'modify']
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor() {
    let obj: any[] =
      [
        {
          'srNo': 1,
          'entityCode': 'C2',
          'entityName': 'BMW',
          'entityType': 'CLASS',
        },
        {
          'srNo': 2,
          'entityCode': 'C1',
          'entityName': 'SWIFTCAR',
          'entityType': 'CLASS',
        },
        {
          'srNo': 3,
          'entityCode': 'LOD',
          'entityName': 'LOAD / GOODS',
          'entityType': 'TYPE',
        },
        {
          'srNo': 4,
          'entityCode': 'CAR',
          'entityName': 'CAR',
          'entityType': 'TYPE',
        },
        {
          'srNo': 5,
          'entityCode': 'WAG',
          'entityName': 'WAGON',
          'entityType': 'MODEL',
        }
      ]

    this.dataSource = new MatTableDataSource<any>(obj)

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  displayTable() {
    this.showEntityTable = true
  }
}
