import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-read-only-bm-approval-master',
  templateUrl: './read-only-bm-approval-master.component.html',
  styleUrl: './read-only-bm-approval-master.component.scss'
})
export class ReadOnlyBmApprovalMasterComponent {

  public bmApprovalMasterForm: FormGroup;

  constructor() {
    this.bmApprovalMasterForm = new FormGroup({
      leadNumber: new FormControl({ value: '', disabled: true }),
      vehicleNumber: new FormControl({ value: '', disabled: true })
    })
  }
}
