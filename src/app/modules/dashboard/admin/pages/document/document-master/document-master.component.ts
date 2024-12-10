import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrl: './document-master.component.scss'
})
export class DocumentMasterComponent {

  public documentMasterForm:FormGroup;
  public displayedColumns: string[]=['serialNo', 'categoryDesc', 'active', 'view', 'modify']
  public dataSource = new MatTableDataSource<any>()
  public showTable:boolean = false;

  constructor(private router:Router){
    this.documentMasterForm = new FormGroup({
      categoryDescription:new FormControl('', [Validators.required]),
    });

    let obj = [
      {
        'srNo':1,
        'categoryDescription':'Individual Corporate Employee'
      },
      {
        'srNo':2,
        'categoryDescription':'Individual Corporate Employee'
      },
      {
        'srNo':3,
        'categoryDescription':'Individual Corporate Employee'
      },
      {
        'srNo':4,
        'categoryDescription':'Individual Corporate Employee'
      },
      {
        'srNo':5,
        'categoryDescription':'Individual Corporate Employee'
      }
    ];
    this.dataSource = new MatTableDataSource(obj)
  }

  create(){
    this.router.navigate(['/admin/document-create'])
  }

  search(){
    this.showTable = true;
  }

  clear(){
    this.documentMasterForm.reset();
    this.showTable = false;
  }
}
