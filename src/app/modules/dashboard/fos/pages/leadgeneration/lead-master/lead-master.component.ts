import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-master',
  templateUrl: './lead-master.component.html',
  styleUrl: './lead-master.component.scss'
})
export class LeadMasterComponent {

    public leadMasterForm : FormGroup;
    public isSearched:boolean = false;
    public showLeadTable : boolean = false;

    constructor(){
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
