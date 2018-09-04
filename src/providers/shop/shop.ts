import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the ShopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopProvider {
  shopList:any[];
  constructor(public http: HttpClient,public stoarge:StorageProvider) {
    console.log('Hello ShopProvider Provider');
    this.shopList=[];
  }

//shopList
  getAdminShopList(){
    // if(window.localStorage && localStorage.length>0){
    //    this.shopList = JSON.parse(localStorage.getItem('admin')).shopList;
    //    return this.shopList;
    // }else{
    //   return [];
    // } 
   return this.stoarge.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      return this.shopList;
    },()=>{
      return [];
    })

  } 

}
