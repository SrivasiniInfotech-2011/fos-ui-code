import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-collection-master',
  templateUrl: './document-collection-master.component.html',
  styleUrl: './document-collection-master.component.scss'
})
export class DocumentCollectionMasterComponent {


  public documentCollectionForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(private toastr:ToastrService){
    this. documentCollectionForm = new FormGroup({
      leadNumber:new FormControl('', [Validators.required]),
      vehicleNumber:new FormControl('', [Validators.required])
    })
  }

  go(){
    this.isSubmitted = true;
    if(this.documentCollectionForm.get('leadNumber')?.valid || this.documentCollectionForm.get('vehicleNumber')?.valid){
      this.isSubmitted = false;
    }
    else{
      this.toastr.error('Enter either lead number or vehicle number', 'Error')
    }
  }
}
