import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asset-master',
  templateUrl: './asset-master.component.html',
  styleUrl: './asset-master.component.scss'
})
export class AssetMasterComponent {

  public assetMasterForm:FormGroup;
  public isSubmitted:boolean = false;

  constructor(){
    this.assetMasterForm = new FormGroup({
      assetCategoryType:new FormControl('', [Validators.required]),
      assetCodeDescription:new FormControl('')
    });
  }

  search(){
    this.isSubmitted = true;
    if(this.assetMasterForm.valid){
      this.isSubmitted = false;
    }
  }
}
