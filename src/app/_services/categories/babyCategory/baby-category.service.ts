import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

const AUTH_API_PROTECTED = 'http://localhost:8080/shopping/api/flying/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class BabyCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }


  getBabyCategoryListService(): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getBabyCategoryList', httpOptions);
  }

  deletebabyCategoryByIdService(babyCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'deleteBabyCategoryById/'+babyCategoryId, httpOptions);
  }

  saveBabyCategoryService(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'saveBabyCategory',data, httpOptions);
  }

  updatebabyCategory(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'updateBabyCategory',data, httpOptions);
  }

  getBabyCategoryByIdService(babyCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getBabyCategoryById/'+babyCategoryId, httpOptions);
  }


  //Update File Parent
  updateBabyFile(file:any,babyCategoryId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(AUTH_API_PROTECTED+"updateBabyCategoryFile/"+ babyCategoryId,formData);
  }

}