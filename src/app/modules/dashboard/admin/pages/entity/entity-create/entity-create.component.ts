import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrl: './entity-create.component.scss'
})
export class EntityCreateComponent {

    public entityMasterForm:FormGroup;
    public bankDetailsForm:FormGroup;
    public isSubmitted:boolean = false;

    constructor(){
      this.entityMasterForm = new FormGroup({
        entityCode:new FormControl('', [Validators.required]),
        entityName:new FormControl('', [Validators.required]),
        entityType:new FormControl('', [Validators.required]),
        gstNo:new FormControl('', [Validators.required]),
        address1:new FormControl('', [Validators.required]),
        address2:new FormControl(''),
        city:new FormControl('', [Validators.required]),
        state:new FormControl('', [Validators.required]),
        country:new FormControl('', [Validators.required]),
        pincode:new FormControl('', [Validators.required]),
        telephoneNumber:new FormControl(''),
        mobileNumber:new FormControl('', [Validators.required]),
        emailId:new FormControl('', [Validators.required]),
        website:new FormControl(''),
        panNumber:new FormControl(''),
      });

      this.bankDetailsForm = new FormGroup({
        accountType:new FormControl('', [Validators.required]),
        accountNumber:new FormControl('', [Validators.required]),
        ifscCode:new FormControl('', [Validators.required]),
        bankName:new FormControl('', [Validators.required]),
        branchName:new FormControl('', [Validators.required]),
        bankAddress:new FormControl('', [Validators.required]),
        activeStatus:new FormControl(''),
      });
    }

    createEntityForm(){
      this.isSubmitted = true;
      if(this.entityMasterForm.valid && this.bankDetailsForm.valid){
        this.isSubmitted = false;
      }
    }

}
