import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { ErrorHandlerServiceProvider } from '../error-handler-service/error-handler-service';

/*
  Generated class for the PromotionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionsProvider {

  constructor(public httpService:HttpServiceProvider,public errorhandler:ErrorHandlerServiceProvider) {
    console.log('Hello PromotionsProvider Provider');
  }

  getAllPromotions(){
   return this.httpService.get("http://www.mocky.io/v2/5b459d2b2f00007000420c7f")
  }

  updatePromotion(data){
    return this.httpService.post("v2/dashboard/catalogue/dataAction/add",data)
  }
}
