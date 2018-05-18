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

  constructor(public localStorage:Storage,public platform:Platform) {
    console.log('Hello StorageProvider Provider');
  }

  setItem(key,value){
   
      this.localStorage.set(key,value);
        
  }

  getItem(key){

    
        return this.localStorage.get(key).then((val:string)=>{
          return val
        });


   
  }

  clearItem(){
    
      this.localStorage.clear();
   

    
  }
}
