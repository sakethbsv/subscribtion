import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable'



/*
  Generated class for the FulfillmentDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FulfillmentDetailsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FulfillmentDetailsProvider Provider');
  }


  getFulfillmentDetails(){
    let dummy_data = [{
      fulfilmentId:11,
      subscriptionId:10098766,
      shopId:11,
      customerId :1,
      deliveryDate:'2018-05-15',
      status:'PENDING'
    },{
      fulfilmentId:11,
      subscriptionId:100,
      shopId:11,
      customerId :1,
      deliveryDate:'2018-05-15',
      status:'PENDING'
    },
    {
      fulfilmentId:11,
      subscriptionId:1050,
      shopId:11,
      customerId :1999,
      deliveryDate:'2018-05-15',
      status:'PENDING'
    }];

    return dummy_data;
  }

  filterOrdersList(searchItem,serachList){
    console.log('serach Item',searchItem)
   return  serachList.filter((item)=>{
     console.log(item);
       if(item.hasOwnProperty(searchItem)){
        console.log(item);
         return item;
       }
    })
  }

  filterOrdersList1(searchItem,serachList){
    console.log('serach Item',searchItem)
   return  serachList.filter((item)=>{
     console.log(item);
     if(item.customerId==searchItem){
       return item;
     }
    })
  }

}
