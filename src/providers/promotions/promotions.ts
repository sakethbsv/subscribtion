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

  constructor(private http: HttpServiceProvider,public errorhandler:ErrorHandlerServiceProvider) {
    console.log('Hello PromotionsProvider Provider');
  }

  getAllPromotions(shops){
   return this.http.get("v2/dashboard/subscription/dataActions/location/SUBSCRIPTION?shopIds="+shops)
  }

  updatePromotion(data){
    return this.http.post("/catalogue/dataAction/add",data)
  }
}
