import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import * as Constants from '../../config'
/*
  Generated class for the FareyeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FareyeProvider {
  dummayData:any[]=[]

  constructor(public http: HttpServiceProvider) {
    console.log('Hello FareyeProvider Provider');
    this.dummayData=[
      {'id':'12','fulfillmentId':'1233','name':'abc','barcodeId':'1111','sku':'1111','creationTime':'','status':'','reason':'','totalQuantity':'','quantityDelivered':''},
      {'id':'1','fulfillmentId':'987','name':'hgg','barcodeId':'1101','sku':'1101','creationTime':'','status':'','reason':'','totalQuantity':'','quantityDelivered':''}
    ]
  }

  getDeliveryStatus(shopId,fromDate,toDate){
   return this.http.get("v2/dashboard/subscription/shop/"+shopId+"/failedDeliveries?from="+fromDate+"&to="+toDate)
   
  }

}
