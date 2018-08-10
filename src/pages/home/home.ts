import { OrdersPage } from '../../pages/orders/orders';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { CatalogPage } from '../catalog/catalog';
import { PromotionsPage } from '../promotions/promotions';
import { InventoryPage } from '../inventory/inventory';
import { ApartmentsPage } from '../apartments/apartments';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalvendorOrdersPage } from '../localvendor-orders/localvendor-orders';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  ordersList : any[];
  settings:any;
  data:any;
  admin:any;
  navigation:any[]=[];
  constructor(public navCtrl: NavController,private storage:StorageProvider) {
   this.getNavigation();
    
  }

  getNavigation(){
    this.storage.getItem('admin').then((data:any)=>{
      this.admin = data.admin;
      this.storage.admin=data.admin;
      if(this.admin.rolesMap.HO){
        this.navigation =[
          {'title':'Track Orders','img':'assets/imgs/track.png','action':'trackOrders'},
          {'title':'Upload Catalog','img':'assets/imgs/catalog.png','action':'uploadCatalog'},
          {'title':'Banners','img':'assets/imgs/promotion.png','action':'promotions'},
          {'title':'Required Stock','img':'assets/imgs/inventory.png','action':'inventory'},
          
        ]

      }else if(this.admin.rolesMap.LS){
        this.navigation =[
          {'title':'Track Orders','img':'assets/imgs/track.png','action':'trackLocalVendorsOrders'},
          {'title':'Upload Catalog','img':'assets/imgs/catalog.png','action':'uploadCatalog'},
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

  trackOrders(){
     
    this.navCtrl.push(OrdersPage);
  }

  trackLocalVendorsOrders(){
    this.navCtrl.push(LocalvendorOrdersPage);
  }

  uploadCatalog(){
    this.navCtrl.push(CatalogPage);
  }

  promotions(){
    this.navCtrl.push(PromotionsPage);
  }

  inventory(){
    this.navCtrl.push(InventoryPage);
  }

  apartments(){
    this.navCtrl.push(ApartmentsPage);
  }

}
