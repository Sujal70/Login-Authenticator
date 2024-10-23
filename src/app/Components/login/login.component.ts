import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiService } from './../../services/api.service';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  submitted: boolean = false;
  captchaResponse: string | null = '';
  siteKey = environment.sitekey;
  showCaptcha: boolean = false;

  protected _onDestroy = new Subject<void>();
  constructor(private apiService: ApiService, private route: Router) {}

  handleLogin() {
    this.submitted = true;
    if (this.username === '' || this.password === '') {
      alert('Please fill in all details.');
      return;
    }

    if (this.showCaptcha && !this.captchaResponse) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    this.authenticateUser(this.username, this.password);
  }
  authenticateUser(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    // if (this.showCaptcha && this.captchaResponse) {
    //   params = params.set('captchaResponse', this.captchaResponse);
    // }
    this.apiService
      .loginUser(params)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          console.log(res, 'is a valid user')
          localStorage.setItem('authToken', res.token);
          console.log(res.token);
          this.route.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          // Check if the response suggests CAPTCHA is needed
          if (err.error?.showCaptcha) {
            this.showCaptcha = true;
            alert('Too many failed attempts. Please complete the CAPTCHA.');
          } else {
            alert(err.error?.message || 'Invalid login attempt.');
          }
        },
      });
  }
  SignUp() {
    this.route.navigate(['/signup']);
  }
  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResponse = captchaResponse;
  }
}
