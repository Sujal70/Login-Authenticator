import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { endpoints } from '../endpoints/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseApiUrl = environment.baseApiUrl;
  loginUser(params: HttpParams): Observable<any> {
    console.log(params);
    return this.http.get<any>(this.baseApiUrl + endpoints.getUser, { params });
  }
  AddUser(val:any):Observable<any>{
    try{      
      console.log(val);      
      return this.http.post<any>(this.baseApiUrl + endpoints.postUser,val);
    }
    catch (error) {
      throw new Error();
    }
  }
}
