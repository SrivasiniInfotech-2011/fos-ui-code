import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrl: './document-create.component.scss'
})
export class DocumentCreateComponent {

  public documentCreateForm:FormGroup;
  public isSubmitted:boolean = false;
  public displayedColumns: string[] = ['documentType', 'identityNumber', 'mandatory', 'lastProgram', 'action'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private router:Router){
    this.documentCreateForm = new FormGroup({
      categoryDescription:new FormControl('', [Validators.required]),
    });
    let obj = [{}]
    this.dataSource = new MatTableDataSource(obj)
  }


  save(){
    this.isSubmitted = true;
    if(this.documentCreateForm.valid){
      this.isSubmitted = false;
    }
  }

  clear(){
    this.documentCreateForm.reset()
  }

  cancel(){
    this.router.navigate(['/admin/document-master'])
  }
}
