import { OrdersPage } from '../../pages/orders/orders';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { CatalogPage } from '../catalog/catalog';
import { PromotionsPage } from '../promotions/promotions';
import { InventoryPage } from '../inventory/inventory';
import { ApartmentsPage } from '../apartments/apartments';
import { StorageProvider } from '../../providers/storage/storage';




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
  constructor(public navCtrl: NavController,private storage:StorageProvider) {
    storage.getItem('admin').then((data:any)=>{
      this.admin = data.admin;
    },err=>{
      console.log('unable to fetch admin')
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

  appartments(){
    this.navCtrl.push(ApartmentsPage);
  }

}
