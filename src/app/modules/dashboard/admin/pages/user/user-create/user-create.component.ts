import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {

    public userManagementForm:FormGroup;
    public userPersonalDetails:FormGroup;
    public isSubmitted:boolean = false;

    constructor(private location:Location){
      this.userManagementForm = new FormGroup({
        userId:new FormControl('',[Validators.required]),
        userName:new FormControl('',[Validators.required]),
        gender:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
        mobileNumber:new FormControl('',[Validators.required]),
        emergencyContactNumber:new FormControl('',[Validators.required]),
        emergencyContactPerson:new FormControl(''),
        joiningDate:new FormControl('',[Validators.required]),
        designation:new FormControl('',[Validators.required]),
        userLevel:new FormControl('',[Validators.required]),
        reportingNextLevel:new FormControl(''),
        userGroup:new FormControl(''),
        emailId:new FormControl('',[Validators.required]),
        dateOfBirth:new FormControl('',[Validators.required]),
        age:new FormControl('')
      });

      this.userPersonalDetails = new FormGroup({
        fatherName:new FormControl('',[Validators.required]),
        motherName:new FormControl('',[Validators.required]),
        maritalStatus:new FormControl('',[Validators.required]),
        aadharNumber:new FormControl(''),
        panNumber:new FormControl('')
      });
    }

    back(){
      this.location.back();
    }

    save(){
      this.isSubmitted = true;
      if(this.userManagementForm.valid && this.userPersonalDetails.valid){
        this.isSubmitted = false;
      }
    }
}
