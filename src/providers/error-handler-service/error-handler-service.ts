import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertProvider } from '../alert/alert';

import { LoginPage } from '../../pages/login/login';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ErrorHandlerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorHandlerServiceProvider {

  constructor(private alert:AlertProvider) {
    console.log('Hello ErrorHandlerServiceProvider Provider');
  }

  error(err:HttpErrorResponse){
    console.log(err);
    let errMsg = err.error.message;
    if(err.status==201){
     return this.alert.errorAlert(err.error.text);
    }else if(err.status==500){
     return this.alert.errorAlert('Internal Server Error !');
    }else if(err.status==400){
     return this.alert.errorAlert(err.statusText);
    }else if(err.status==401){
     //return this.navCtrl.setRoot(LoginPage);
    }else if(err.status==0){
      return this.alert.errorAlert('Something went wrong !');
    }else if(err.status==400){
      return this.alert.errorAlert(errMsg);
    }
   
  }
  


}
