import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';


/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  shopList:any[];
  orderList:any[]=[];
  searchItem:any;
  settings:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,private orders:FulfillmentDetailsProvider) {
    this.settings = {
      columns: {
        shopId: {
          title: 'Shop Id'
        },
        subscriptionId: {
          title: 'Subscribtion Id'
        },
        customerId: {
          title: 'Customer Id'
        },
        deliveryDate: {
          title: 'Delivery Date'
        },
        status:{
          title:'Status'
        }
      }
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getAllShops();
  }

  getAllShops(){
    this.storage.getItem('admin').then((data:any)=>{
      this.shopList = data.admin.shopList;
    })
  }

  search(){
   this.orderList = this.orders.getFulfillmentDetails();
  }

  back(){
    this.orderList = [];
  }

  filter(){
   this.orderList = this.orders.filterOrdersList(this.searchItem,this.orderList);
  }
  filter1(){
    this.orderList = this.orders.filterOrdersList1(this.searchItem,this.orderList);
   }

}
