import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import * as Constants from '../../config'
import * as moment from 'moment';



/*
  Generated class for the FulfillmentDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FulfillmentDetailsProvider {
  ordersTableData:any;
  disableFulfillment:boolean=false;

  constructor(public http:HttpServiceProvider, public _http : HttpClient) {
    console.log('Hello FulfillmentDetailsProvider Provider');
    this.ordersTableData = []; 
  }




  getFulfillmentDetails(object){
  
   return this.http.post("v2/dashboard/subscription/fetchFulfillments",object)
    
  }

  generateDynamicHeader(list){
 
    let headers:any[]=[];
   
    for (const key in list[0]) {
      let obj:any={};
      if (list[0].hasOwnProperty(key)) {
  
        obj.field=key;
        obj.header=key.toLocaleUpperCase();
       
      }
      headers.push(obj);
    }
    return headers;
  }

  generateFulfillmentTableData(fulfilmentList){
   
    this.ordersTableData = [];
    let now = moment();
    fulfilmentList.forEach(data => {
      let amount = 0;
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
      obj.actualOrderId = data.fulfillment.actualOrderId;
      obj.paymentMethod = data.paymentMethod;
      obj.subscriptionOrderId = data.subscriptionOrderId;
      obj.originalStoreCode = data.fulfillment.originalStoreCode;
      obj.confirmationLink = data.confirmationLink;
      obj.confirmed = data.fulfillment.confirmed;
      obj.subscriptionOrderItems.forEach(element => {
        amount += element.amount*element.quantity
      });
      obj.totalOrderAmount = amount;
      obj.paymentDone = data.fulfillment.paymentDone;
      obj.reason = data.fulfillment.reason;
      obj.apartmentName = data.apartmentName;
      obj.apartmentId = data.apartmentId;
      if(moment(data.fulfillment.deliveryDate).isAfter(now)){
        obj.disable = true;
       }else{
         obj.disable=false;
       }
       obj.orderSentToMerchant = data.fulfillment.orderSentToMerchant;
      this.ordersTableData.push(obj);

    });

    return this.ordersTableData;
  }

  updateFulfillmentStatus(order){
    return this.http.post("v2/dashboard/subscription/fulfillment/update/"+order.fulfillmentId+"/subscription/"+order.subscriptionId+"/"+order.status,{})
  }

  downloadFullfillmentReport(data){
    return this._http.post(Constants.URL+"/v2/dashboard/subscription/fetchFulfillments/download",data,{responseType: 'text'})
  }

  getFulfilmentDetailsByApartments(data){
    return this._http.post(Constants.URL+"v2/dashboard/subscription/fetchApartmentFulfillments",data,{responseType: 'json'})
  }
  
  printBill(orderId,bags){
    return this.http.get("v1/bill/generateSalesBillV2/"+orderId+"?printed=false&getBill=true&billSize=BIG&billType=HOME_DELIVERY_CHALLEN&deliveryBags="+bags);
  }

  getListOfApartment(list){
    var apartment=[];
    list.map(item => item.apartmentName)
 .filter((value, index, self) => {
   if(value && self.indexOf(value) === index)
   {
     let obj:any={};
     obj.label=value;
     obj.value=value;apartment.push(obj)
    }})

    return apartment;
 }
 generateFulfillmentDataByApartment(fulfilmentList){
   
  this.ordersTableData = [];
  console.log(fulfilmentList);
  fulfilmentList.forEach(data => {
    let amount = 0;
    let obj:any = {};
    obj.customerName = data.customerName;
    obj.mobileNumber = data.mobileNumber;
    obj.deliveryDate = data.deliveryDate;
    obj.slot = data.slotFrom +" to "+data.slotTo;
    obj.apartmentName = data.apartmentName;
    obj.flatAndBlock = data.flatAndBlock;
    obj.addressLine1 = data.addressLine1;
    obj.addressLine2 = data.addressLine2;
    obj.landMark = data.landMark;
    obj.city = data.city;
    obj.state = data.state;
    obj.paymentMethod = data.paymentMethod;
    obj.amount = data.amount;
    obj.productName = data.name;
    obj.weightOrUnit = data.weightOrUnits;
    obj.quantity = data.quantity;
  
  
    this.ordersTableData.push(obj);

  });

  return this.ordersTableData;
}
}
