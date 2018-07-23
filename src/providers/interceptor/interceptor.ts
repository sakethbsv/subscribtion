import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageProvider } from '../storage/storage';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { LoaderProvider } from '../loader/loader';

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorProvider implements HttpInterceptor {


  constructor(public http: HttpClient, public storage: StorageProvider, public loader: LoaderProvider) {
    console.log('Hello InterceptorProvider Provider');
  }


  getToken() {

    

    // let promise = new Promise((resolve,reject)=>{
    //   let token = this.storage.getCookie('token');
    //   if (token != null || token != "") {
    //     resolve(token)
    //   }else{
    //     reject();
    //   }
    // })

    // return promise;

    return this.storage.getItem('admin').then((res: any) => {
      console.log(res)
      return res.authenticationDetails.authToken;
    });

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.search('/v2/dashboard/admin/login') > -1) {
      this.loader.show();
      return next.handle(req);
    }
    return Observable.fromPromise(this.getToken()).mergeMap(token => {
      this.loader.show();
      console.log(token);
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      });
      console.log(authReq);
      return next.handle(authReq);

    })

  }




}
