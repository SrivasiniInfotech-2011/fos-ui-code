import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../../data/services/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted: boolean = false;
  public isLoading:boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.isSubmitted = false;
      this.isLoading = true;
      this.userService
        .authenticateUser(
          this.loginForm.value['userName'],
          this.loginForm.value['password']
        )
        .subscribe((res: any) => {
          if (res) {
            let token = res?.message?.token
            localStorage.setItem('userToken', token)
            let userInfo = res?.message?.user
            let userData = {
              userId: userInfo?.userId,
              userName: userInfo?.userName,
              companyName: userInfo?.companyName,
              companyId:userInfo?.companyId
            }
            localStorage.setItem('userDetails', JSON.stringify(userData))
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          }
        });
    }
  }
}
