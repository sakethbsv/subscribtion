import { HttpClient } from '@angular/common/http';
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
    this.storage.getItem('admin').then((data:any)=>{
      this.admin = data.admin;
      if(this.admin.rolesMap.HO){
        this.navigation =[
          {'title':'Track Orders','img':'assets/imgs/track.png','action':'trackOrders'},
          {'title':'Upload Catalog','img':'assets/imgs/catalog.png','action':'uploadCatalog'},
          {'title':'Banners','img':'assets/imgs/promotion.png','action':'promotions'},
          {'title':'Required Stock','img':'assets/imgs/inventory.png','action':'inventory'},
          
        ]

      }else if(this.admin.rolesMap.LS){
        this.navigation =[
          {'title':'Track Orders','img':'assets/imgs/track.png','action':'trackOrders'},
          {'title':'Upload Catalog','img':'assets/imgs/catalog.png','action':'uploadCatalog'},
          {'title':'Banners','img':'assets/imgs/promotion.png','action':'promotions'},
          {'title':'Required Stock','img':'assets/imgs/inventory.png','action':'inventory'},
          {'title':'Apartments','img':'assets/imgs/apartment.png','action':'apartments'},
          
        ]
      }else{
        this.navigation =[
          {'title':'Track Orders','img':'assets/imgs/track.png','action':'trackOrders'},
          {'title':'Required Stock','img':'assets/imgs/inventory.png','action':'inventory'},
          
        ]
      }
    },err=>{

    })
  }

}
