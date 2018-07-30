import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  subscriptionOrderItems:any[]=[];
  address:any={};
  customerName:string="";
  mobileNumber:string="";
  settings : any;
  deliveryDate:string="";
  slot:string="";
  fulfillmentId:number;
  cols:any[]=[];
  totalOrderAmount:number;
  subscriptionOrderId:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FulfillmentDetailPage');
    this.cols = [
      { field: 'barcodeId', header: 'Barcode Id'},
      { field: 'sku', header:'Sku'},
      { field: 'name', header:'name'},
      { field: 'quantity', header: 'quantity'},
      { field: 'amount', header: 'amount' }
  ];
   let data = this.navParams.get('fulfillmentDetail');
   this.subscriptionOrderItems = data.subscriptionOrderItems;
   this.address = data.address;
   this.customerName = data.customerName;
   this.mobileNumber = data.mobileNumber;
   this.slot = data.slot;
   this.fulfillmentId = data.actualOrderId;
   this.deliveryDate = data.deliveryDate;
   this.totalOrderAmount = data.totalOrderAmount;
   this.subscriptionOrderId = data.subscriptionOrderId;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
