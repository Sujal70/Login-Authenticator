import { HttpParams } from '@angular/common/http';
import { ApiService } from './../../services/api.service';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent{
  username: string = '';
  password: string = '';
  submitted: boolean = false;

  protected _onDestroy = new Subject<void>();
  constructor(private apiService: ApiService, private route: Router) {}
  
  handleLogin() {
    this.submitted = true;
    if(this.username == "" || this.password == ""){
      alert("please fill details");
    }
    else{
      this.authenticateUser(this.username, this.password);
      
    }
  }
  authenticateUser(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    this.apiService.loginUser(params).subscribe({
      next: (res: any) => {
        console.log(res, 'is a valid user');
        this.route.navigate(['/home']);
      },
      error: (err: any) => {
        console.log(err, 'failed to authenticate');
        alert("faled to authenticate");
        
      },
    });
  }
  SignUp(){
    this.route.navigate(['/signup']);
  }
}
