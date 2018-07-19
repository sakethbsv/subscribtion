import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Constants from '../../config'

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpServiceProvider Provider');
  }

  private setHeaders(headers:HttpHeaders | null){
    
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/csv');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
   
    return { headers:headers};

  }

  public get(url:string,headers?:HttpHeaders |null){
    const header = this.setHeaders(headers);
    return this.http.get(Constants.URL+url,header)
                    
  }

  public post(url:string,body, headers?: HttpHeaders | null){
    
    const header = this.setHeaders(headers);
    return this.http.post(Constants.URL+url, body,header);
  }

  public put(url:string,body, headers?: HttpHeaders | null){
    
    const header = this.setHeaders(headers);
    const options = {header,responseType: 'text' as 'text'}
    return this.http.post(Constants.URL+url, body,options);
  }
}
