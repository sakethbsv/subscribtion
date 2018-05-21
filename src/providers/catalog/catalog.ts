import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

/*
  Generated class for the CatalogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CatalogProvider {

  constructor(public http: HttpClient,private httpService:HttpServiceProvider) {
    console.log('Hello CatalogProvider Provider');
  }

  getAllProducts(shopId){
    return this.httpService.get('http://www.mocky.io/v2/5b02b57c3000002900cee2fc')
    .map(res=>{
      return res;
    })
    

  }

}
