import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-read-only-disbursement-detail-master',
  templateUrl: './read-only-disbursement-detail-master.component.html',
  styleUrl: './read-only-disbursement-detail-master.component.scss'
})
export class ReadOnlyDisbursementDetailMasterComponent {

  public disbursementMasterForm:FormGroup;

    constructor(){
      this.disbursementMasterForm = new FormGroup({
        leadNumber:new FormControl({ value: '', disabled: true }),
        vehicleNumber:new FormControl({ value: '', disabled: true })
      })
    }
}
