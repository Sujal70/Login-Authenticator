import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username:string="";
  password:string="";
  submitted:boolean=false;
  constructor(private apiService:ApiService,private route:Router){}
  handleSignup(){
    this.submitted=true;
    if(!this.username || !this.password){
      alert("please fill details!!");
    }
    else{
      this.addUser(this.username,this.password);
    }
  }
  addUser(username:string,password:string){
   
    // const params=new HttpParams()
    // .set('userName',username)
    // .set('password',password);

    
    const params = {
      userName: this.username,
      password: this.password
    }
    this.apiService.AddUser(params).subscribe({
      
      next:(res:any)=>{
        console.log(res," user added successfully!!");
        this.route.navigate(['/home']);
      },
      error(err:HttpErrorResponse){
        console.log(err);
      }
    });
  }
}
