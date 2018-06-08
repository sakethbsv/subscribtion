import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import * as Constants from '../../config'
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';




/*
  Generated class for the FulfillmentDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FulfillmentDetailsProvider {
  ordersTableData:any;

  constructor(public http:HttpServiceProvider) {
    console.log('Hello FulfillmentDetailsProvider Provider');
    this.ordersTableData = []; 
  }


  getFulfillmentDetails(object){
  
   return this.http.post("v2/dashboard/subscription/fetchFulfillments",object)

    
  }

  generateFulfillmentTableData(fulfilmentList){
   
    
    fulfilmentList.forEach(data => {
      let obj:any = {};
      obj.shopId = data.fulfillment.shopId;
      obj.customerId = data.fulfillment.customerId;
      obj.customerName = data.customerName;
      obj.mobileNumber = data.mobileNumber;
      obj.status = data.fulfillment.status;
      obj.deliveryDate = data.fulfillment.deliveryDate;
      obj.slot = data.fulfillment.slotFrom +" to "+data.fulfillment.slotTo;
      obj.city = data.address.city;
      obj.subscriptionId = data.fulfillment.subscriptionId;
      obj.address = data.address;
      obj.subscriptionOrderItems = data.subscriptionOrderItems;
      obj.fulfillmentId = data.fulfillment.id;
      this.ordersTableData.push(obj);

    });

    return this.ordersTableData;
  }

  updateFulfillmentStatus(order){
    return this.http.post("v2/dashboard/subscription/fulfillment/update/"+order.fulfillmentId+"/"+order.status,{})
    // .map((res:Response)=>{
    //   return res;
    // })
    // .catch(err=>{
    //   return Observable.throw(err); 
    // })
  }

  downloadFullfillmentReport(data){
    return this.http.getCsv("v2/dashboard/subscription/fetchFulfillments/download",data)
  }





}
