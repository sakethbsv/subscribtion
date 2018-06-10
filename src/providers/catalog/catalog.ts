import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { AlertProvider } from '../alert/alert';

/*
  Generated class for the CatalogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CatalogProvider {

  catalogData:any[];
  selectedShopId:number;
  productsDeleted:any[]=[];
  updatedProductList:any[]=[];

  constructor(private http: HttpServiceProvider) {
    console.log('Hello CatalogProvider Provider');
  }

  getAllProducts(shopId) {
    return this.http.get("v2/dashboard/subscription/getSubscriptionData/shop/"+shopId )
  }


  addOrUpdateSubscriptionData(shopId, product_list) {
    let formData = {
      "shopId": shopId,
      "subscriptionProducts": product_list
    }
    console.log(formData);
    return this.http.post('v2/dashboard/subscription/addOrUpdateSubscriptionData', formData)
  }

  

 
  removeProduct(array,element){
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }

    return array;
  }
}
