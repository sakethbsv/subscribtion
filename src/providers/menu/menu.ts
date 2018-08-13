import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {
  navigation:any[]=[];
  HOnavigation:any[]=[];
  LSnavigation:any[]=[];
  admin:any;
  constructor(public storage:StorageProvider) {
    console.log('Hello MenuProvider Provider');
     this.setNavigation();
  }

  setNavigation(){
    this.storage.getValue('admin').then((data:any)=>{
      
    })
  }


}
