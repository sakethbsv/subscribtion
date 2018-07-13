import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FulfillmentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fulfillment-detail',
  templateUrl: 'fulfillment-detail.html',
})
export class FulfillmentDetailPage {

  subscriptionOrderItems:any;
  address:any;
  customerName:any;
  mobileNumber:any;
  settings : any;
  slot:any;
  fulfillmentId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.settings = {
      columns: {
        subscriptionId: {
          title: 'Subscription Id'
        },
        barcodeId: {
          title: 'Barcode Id'
        },
        sku: {
          title: 'SKU'
        },
        name: {
          title: 'Product Name'
        },
        quantity: {
          title: 'Quantity'
        },

        amount: {
          title: 'Amount'
        },
      },
      actions: false
    }; 
   let data = navParams.get('fulfillmentDetail');
   this.subscriptionOrderItems = data.subscriptionOrderItems;
   this.address = data.address;
   this.customerName = data.customerName;
   this.mobileNumber = data.mobileNumber;
   this.slot = data.slot;
   this.fulfillmentId = data.fulfillmentId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FulfillmentDetailPage');
  }

}
