import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lead-master',
  templateUrl: './lead-master.component.html',
  styleUrl: './lead-master.component.scss'
})
export class LeadMasterComponent {

    public leadMasterForm : FormGroup;
    public isSearched:boolean = false;
    public showLeadTable : boolean = false;
    public displayedColumns: string[] = ['leadNumber', 'date', 'status', 'view', 'modify'];
    public dataSource = new MatTableDataSource();

    constructor(){

      let obj:any[] =
       [
        {
          'leadNumber':'FOSLDN011',
            'date':'22/11/2024',
            'status':'Pending'
        },
        {
          'leadNumber':'FOSLDN011',
            'date':'22/11/2024',
            'status':'Pending'
        },
        {
          'leadNumber':'FOSLDN011',
            'date':'22/11/2024',
            'status':'Pending'
        }
      ]

      this.dataSource = new MatTableDataSource(obj)

      this.leadMasterForm = new FormGroup({
        leadNumber: new FormControl('', [Validators.required]),
        vehicleNumber: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required])
      })
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
