import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrl: './document-create.component.scss'
})
export class DocumentCreateComponent {

  public documentCreateForm:FormGroup;

  constructor(){
    this.documentCreateForm = new FormGroup({
      categoryDescription:new FormControl('', [Validators.required]),
    });
  }
}
