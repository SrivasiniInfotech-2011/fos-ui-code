import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private router:Router) {
    this.loginForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    )
  }


  ngOnInit(): void {

  }

  login() {
    this.isSubmitted = true;
    if(this.loginForm.valid){
      this.isSubmitted = false;
      this.router.navigate(['/dashboard'])
    }
  }

}
