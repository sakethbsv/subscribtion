import {  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { ErrorHandlerServiceProvider } from '../error-handler-service/error-handler-service';
import 'rxjs/add/operator/map';




/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {


  constructor(public httpService:HttpServiceProvider,public errorhandler:ErrorHandlerServiceProvider) {
    console.log('Hello LoginServiceProvider Provider');
    
  }

  // login and save details in local storage
  login(loginData){

    var data = new HttpParams().set('emailId',loginData.emailId).set('password',loginData.password);
   



    
    
    return this.httpService.post("v2/dashboard/admin/login",data)
  
      
  }

}
