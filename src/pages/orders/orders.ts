import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';
import * as moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { HttpErrorResponse } from '@angular/common/http';
import { ScrollProvider } from '../../providers/scroll/scroll';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { ModalProvider } from '../../providers/modal/modal';


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
  @ViewChild(Content) content: Content;

  daterange: any = {
    start: moment().subtract(1, 'days'),
    end: moment(),
    label: ''
  };

  options : any = {
    startDate : moment().subtract(1, 'days'),
    endDate : moment(),
  }



  shopList: any[];
  fulfillmentData: any;
  searchItem: any;
  settings: any;
  selectedShopId: number;
  showfilter: boolean = false;
  shopIds:any[]=[];
  selectedShopIds:any[]=[];
  cols:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, private orders: FulfillmentDetailsProvider, private loader: LoaderProvider, private scroll: ScrollProvider,private errorHandler:ErrorHandlerServiceProvider,private modal:ModalProvider) {
    this.fulfillmentData = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getAllShops();
  }

  getAllShops() {
    this.shopIds= [];
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      console.log(this.shopList);
      this.shopList.forEach(shop => {
        this.shopIds.push(shop.shopId);
      });
      this.selectedShopIds = this.shopIds;
      this.search(this.shopIds);
      console.log(this.daterange);
    })
  }

  search(shopId) {
    this.fulfillmentData = [];
    this.showfilter = false;
    this.selectedShopIds = [].concat(shopId);
    let obj = {
      "shopIds": shopId,
      "fromDate": moment(this.daterange.start.toDate()).format("YYYY-MM-DD"),
      "toDate": moment(this.daterange.end.toDate()).format("YYYY-MM-DD")
    }

    // disable future fulfillment
   
    this.orders.getFulfillmentDetails(obj).subscribe((data: any) => {
      this.cols = [
        { field: 'subscriptionId', header: 'ID'},
        { field: 'subscriptionOrderId',header:'Order Id'},
        { field: 'customerName', header:'Customer Name'},
        { field: 'mobileNumber', header:'Mobile Number'},
        { field: 'deliveryDate', header: 'Delivery Date'},
        { field: 'slot', header: 'Slot' },
        { field: 'paymentMethod', header: 'Payment Method'},
        { field: 'city', header: 'City'},
        { field: 'orderSentToMerchant', header:'Order Sent To Merchant'},
        { field: 'status', header: 'Status' }
        
    ];
      this.fulfillmentData = this.orders.generateFulfillmentTableData(data);
      console.log(this.fulfillmentData);
      
      
      this.scroll.scrollTo('#order-detail');
      
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
     // alert("Something went wrong !");
    }, () => {
      this.loader.hide();
    })



  }
  public selectedDate(value: any) {
    // this is the date the user selected
    console.log(value);

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    console.log('daterange', moment(this.daterange.start.toDate()).format("YYYY-MM-DD"));

  }

  reset() {
    this.fulfillmentData = [];
  }

  filter(){
    this.showfilter = true;
  }

  downloadReport(shopIds){
    let formData = {
      "shopIds": shopIds,
      "fromDate": moment(this.daterange.start.toDate()).format("YYYY-MM-DD"),
      "toDate": moment(this.daterange.end.toDate()).format("YYYY-MM-DD")
    }

    this.orders.downloadFullfillmentReport(formData).subscribe((data:any)=>{
      let csv = data;
      console.log(csv);
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'Subscription-Fulfillment.csv';
      hiddenElement.click();

    },(err:HttpErrorResponse)=>{
      console.log(err.error);
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
  }


  onClick(fulfillment) {
    console.log('...',fulfillment);
    if(fulfillment.status=="PENDING"){
      fulfillment.status="FULFILLED";
     
    }
    
    this.orders.updateFulfillmentStatus(fulfillment).subscribe(data=>{  
      console.log(data);
      fulfillment.status="FULFILLED";
    },(err:HttpErrorResponse)=>{
      this.errorHandler.error(err);
      console.log('err');
      if(err.status==200){
        console.log(err);
        
      }else{
        fulfillment.status ='PENDING';
      }
     
      this.loader.hide();
    },()=>{
      console.log('Completed');
      this.loader.hide();
    })
    
  }

  onRowSelect(data){
    console.log(data)
   this.modal.showSubscriptionDetails(data);
  }

}
