import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lead-master',
  templateUrl: './lead-master.component.html',
  styleUrl: './lead-master.component.scss'
})
export class LeadMasterComponent implements AfterViewInit {

    public leadMasterForm : FormGroup;
    public isSearched:boolean = false;
    public showLeadTable : boolean = false;
    public displayedColumns: string[] = ['leadNumber', 'date', 'status', 'view', 'modify'];
    public dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(){

      let obj:any[] =
       [
        {
          'leadNumber':'FOSLDN011',
            'date':'22/11/2024',
            'status':'Pending'
        },
        {
          'leadNumber':'FOSLDN012',
            'date':'23/11/2024',
            'status':'Approved'
        },
        {
          'leadNumber':'FOSLDN014',
            'date':'30/11/2024',
            'status':'Completed'
        }
      ]

      this.dataSource = new MatTableDataSource(obj)

      this.leadMasterForm = new FormGroup({
        leadNumber: new FormControl('', [Validators.required]),
        vehicleNumber: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required])
      })
    }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    searchLead(){
      this.isSearched = true;
      if(this.leadMasterForm.valid){
        this.isSearched = false;
        this.showLeadTable = true;
      }
      else{
        this.showLeadTable = false;
      }
    }
}
