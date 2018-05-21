import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/*
  Generated class for the ErrorHandlerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorHandlerServiceProvider {

  constructor() {
    console.log('Hello ErrorHandlerServiceProvider Provider');
  }

  error(err:HttpErrorResponse){
    console.log(err);
    if(err.status==201){
     return alert(err.error.text);
    }else if(err.status==500){
     return alert('Internal Server Error !');
    }else if(err.status==400){
     return alert('Please check the request !');
    }else if(err.status==401){
    // return this.navCtrl.setRoot(LoginPage);
    }
   
  }
  


}
