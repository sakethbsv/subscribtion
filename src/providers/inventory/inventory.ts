import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

/*
  Generated class for the InventoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryProvider {

  constructor(private http: HttpServiceProvider) {
    console.log('Hello InventoryProvider Provider');
  }

  getInventory(shopId,from,to){
    return this.http.post("v2/dashboard/subscription/shop/"+shopId+"/inventoryRequired?from="+from+"&to="+to+"&page=1",null)
  }

}
