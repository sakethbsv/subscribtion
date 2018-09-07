import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Platform } from 'ionic-angular';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
admin:any;
clientType:any;
  constructor(public localStorage:Storage,public platform:Platform) {
    console.log('Hello StorageProvider Provider');
  }

  

  setItem(key,value){
   
      this.localStorage.set(key,value);
        
  }

   async getItem(key){
   
        return await this.localStorage.get(key).then((val:string)=>{
            this.admin = val;
          return val
        });


   
  }

 async getValue(key){

    let promise = new Promise((resolve,reject)=>{

        return this.localStorage.get(key).then((val:string)=>{
            resolve(val)
        },(err:any)=>{
            reject(err)
        });
    })
    
return await promise;


}

getAdmin(){
    return this.getValue('admin').then((data:any)=>{
        return data;
    })
}

  clearItem(){
    
      this.localStorage.clear();
   

    
  }
  
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
}
