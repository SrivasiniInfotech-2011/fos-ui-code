import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-master',
  templateUrl: './asset-master.component.html',
  styleUrl: './asset-master.component.scss'
})
export class AssetMasterComponent implements AfterViewInit {

  public assetMasterForm: FormGroup;
  public isSubmitted: boolean = false;
  public showTable: boolean = false;
  public displayedColumns: string[] = ['categoryCode', 'categoryDescription', 'categoryType', 'view', 'modify'];
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private router: Router) {
    this.assetMasterForm = new FormGroup({
      // assetCategoryType:new FormControl('', [Validators.required]),
      assetCategoryType: new FormControl(''),
      assetCodeDescription: new FormControl('')
    });

    let obj: any[] =
      [
        {
          'srNo': 1,
          'categoryCode': 'C2',
          'categoryDescription': 'BMW',
          'categoryType': 'CLASS',
        },
        {
          'srNo': 2,
          'categoryCode': 'C1',
          'categoryDescription': 'SWIFTCAR',
          'categoryType': 'CLASS',
        },
        {
          'srNo': 3,
          'categoryCode': 'LOD',
          'categoryDescription': 'LOAD / GOODS',
          'categoryType': 'TYPE',
        },
        {
          'srNo': 4,
          'categoryCode': 'CAR',
          'categoryDescription': 'CAR',
          'categoryType': 'TYPE',
        },
        {
          'srNo': 5,
          'categoryCode': 'WAG',
          'categoryDescription': 'WAGON',
          'categoryType': 'MODEL',
        }
      ]

    this.dataSource = new MatTableDataSource(obj)

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clear() {
    this.assetMasterForm.reset();
    this.showTable = false;
  }

  search() {
    this.isSubmitted = true;
    this.showTable = true;
    // if (this.assetMasterForm.valid) {
    //   this.isSubmitted = false;
    // }
  }

  create() {
    this.router.navigate(['/admin/asset-create'])
  }
}
