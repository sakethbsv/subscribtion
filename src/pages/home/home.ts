import { OrdersPage } from '../../pages/orders/orders';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { CatalogPage } from '../catalog/catalog';
import { PromotionsPage } from '../promotions/promotions';
import { InventoryPage } from '../inventory/inventory';
import { StorageProvider } from '../../providers/storage/storage';
import { FareyeDeliveriesPage } from '../fareye-deliveries/fareye-deliveries';
import { InAppBrowser } from '@ionic-native/in-app-browser';



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
  
  constructor(public navCtrl: NavController,public storage:StorageProvider,private iab:InAppBrowser) {
 
  }

  ionViewDidLoad() {
    this.setAdmin().then((data:any)=>{
      this.admin = data;
     
    },(err:any)=>{
  
    })
  }

  getOrderDetails(){
     
    this.navCtrl.push(OrdersPage);
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

  deliveryStatus(){
    this.navCtrl.push(FareyeDeliveriesPage);
  }

  setAdmin(){
   return this.storage.getItem('admin').then((data:any)=>{
      return this.admin = data.admin;
    },err=>{
      return null
    })
  }

}
