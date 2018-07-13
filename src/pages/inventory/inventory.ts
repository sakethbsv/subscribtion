import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { LocalDataSource } from 'ng2-smart-table';

/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  shopList:any[]=[];
  settings:any;
  source:any;
  inventoryList:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:StorageProvider) {
    this.settings = {
      
      columns: {
        sku: {
          title: 'Sku'
        },
        barcodeId: {
          title: 'Barcode Id'
        },
        name: {
          title: 'Name'
        },
        quantity: {
          title: 'Quantity'
        }
      },
  

    };
    this.source = new LocalDataSource(this.inventoryList)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.getAllShops();
  }

  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
    })
  
  }

  viewInventory(){

  }

}
