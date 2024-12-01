import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrl: './asset-create.component.scss'
})
export class AssetCreateComponent {

    public assetCreateForm:FormGroup;
    public isSubmitted:boolean = false;

    constructor(){
      this.assetCreateForm = new FormGroup({
        assetCategoryType:new FormControl('', [Validators.required]),
        assetCategoryDescription:new FormControl('', [Validators.required]),
        assetCode:new FormControl(''),
      })
    }

    save(){
      this.isSubmitted = true;
      if(this.assetCreateForm.valid){
        this.isSubmitted = false;
      }
    }
}
