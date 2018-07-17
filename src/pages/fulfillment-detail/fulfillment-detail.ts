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
  cols:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cols = [
      { field: 'barcodeId', header: 'Barcode Id'},
      { field: 'sku', header:'Sku'},
      { field: 'name', header:'name'},
      { field: 'quantity', header: 'quantity'},
      { field: 'amount', header: 'amount' }
  ];
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
