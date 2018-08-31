import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { HttpClient } from '@angular/common/http';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the InventoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryProvider {

  constructor(private http: HttpServiceProvider,public https: HttpClient,private storage:StorageProvider) {
    console.log('Hello InventoryProvider Provider');
  }

  getInventory(shopId,from,to,admin){
    console.log(admin)
    if(admin && admin.rolesMap.LS){
      return this.http.get("v2/dashboard/subscription/shop/"+shopId+"/inventoryRequired?from="+from+"&to="+to+"&page=1&apartment="+true,null)
    }else{
      return this.http.get("v2/dashboard/subscription/shop/"+shopId+"/inventoryRequired?from="+from+"&to="+to+"&page=1&apartment="+true,null)
    }
   
   
    
  }

  getListOfCategory(list){
    var category=[];
     list.map(item => item.category)
  .filter((value, index, self) => {if(self.indexOf(value) === index){let obj:any={};obj.label=value;obj.value=value;category.push(obj)}})

     return category;
  }

  getListOfApartment(list){
    var apartment=[];
    list.map(item => item.apartmentName)
 .filter((value, index, self) => {if(self.indexOf(value) === index){let obj:any={};obj.label=value;obj.value=value;apartment.push(obj)}})

    return apartment;
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

}
