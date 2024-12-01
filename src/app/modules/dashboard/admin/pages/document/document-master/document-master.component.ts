import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrl: './document-master.component.scss'
})
export class DocumentMasterComponent {

  public documentMasterForm:FormGroup;

  constructor(){
    this.documentMasterForm = new FormGroup({
      categoryDescription:new FormControl('', [Validators.required]),
    });
  }
}
