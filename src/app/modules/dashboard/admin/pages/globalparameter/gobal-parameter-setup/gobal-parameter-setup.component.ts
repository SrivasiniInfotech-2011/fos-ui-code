import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gobal-parameter-setup',
  templateUrl: './gobal-parameter-setup.component.html',
  styleUrl: './gobal-parameter-setup.component.scss'
})
export class GobalParameterSetupComponent {

  public globalParameterForm:FormGroup;

  constructor(private location:Location){
    this.globalParameterForm = new FormGroup({
      dateFormat: new FormControl(''),
      currencyName: new FormControl(''),
      maximumDigits: new FormControl(''),
      effectiveDate: new FormControl(''),
      disableAccess: new FormControl(''),
      minPasswordLength: new FormControl(''),
      passwordRecycleIteration: new FormControl(''),
      resetPasswordDays: new FormControl(''),
      forcePasswordChange: new FormControl(''),
      initialPasswordChange: new FormControl(''),
    });
  }

  back(){
    this.location.back();
  }
}
