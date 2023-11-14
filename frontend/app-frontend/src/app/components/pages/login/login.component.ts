import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent {
  userLoginForm: FormGroup;
  isSubmit: boolean = false;
  readonly homePageUrl = "";
  constructor(private userService: UserService, private router: Router) {
    this.userLoginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('[^@]+@[^@]+\.[^@.]{2,}')
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%]).*[A-Za-z0-9@#$%]')
      ]),
    });
  }

  get emailControl() {
    return this.userLoginForm.get('email');
  }

  get pwdControl() {
    return this.userLoginForm.get("password");
  }
  
  submit() {
    this.isSubmit = true;
    this.userService.login({
      email: this.emailControl?.value,
      pwd: this.userService.encrytPwd(this.pwdControl?.value)
    }).subscribe(() => {
      this.router.navigateByUrl(this.homePageUrl);
    });
  }
}
