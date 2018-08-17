import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import * as moment from 'moment';
import { ShopProvider } from '../../providers/shop/shop';
import { LoaderProvider } from '../../providers/loader/loader';
import { ScrollProvider } from '../../providers/scroll/scroll';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { StorageProvider } from '../../providers/storage/storage';
import { FareyeProvider } from '../../providers/fareye/fareye';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Generated class for the FareyeDeliveriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fareye-deliveries',
  templateUrl: 'fareye-deliveries.html',
})
export class FareyeDeliveriesPage {
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
  failedDeliveryData: any=[];
  searchItem: any;
  settings: any;
  selectedShopId: number;
  showfilter: boolean = false;
  shopIds:any[]=[];
  selectedShopIds:any[]=[];
  cols:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shop: ShopProvider, private loader: LoaderProvider, private scroll: ScrollProvider,private errorHandler:ErrorHandlerServiceProvider,private fareyeProvider:FareyeProvider) {
    this.cols =[
      { field: 'fulfillmentId', header: 'FarEye ID' },
      { field: 'name', header: 'Name' },
      { field: 'creationTime', header: 'Date' },
      { field: 'status', header: 'Status' },
      { field: 'reason', header: 'Reason' },
      { field: 'totalQuantity', header: 'Total Quantity' },
      { field: 'quantityDelivered', header: 'Quantity' }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FareyeDeliveriesPage');
    this.getAllShops();
  }

  getAllShops(){
    this.shop.getAdminShopList().then((data:any)=>{
      this.shopList = data;
      
    },(err:any)=>{

    })
  }

  // Fetch today's delivery status
  fetchDeliveryStatus(){
    this.fareyeProvider.getDeliveryStatus(this.selectedShopId,moment(this.daterange.start.toDate()).format("YYYY-MM-DD"),moment(this.daterange.end.toDate()).format("YYYY-MM-DD")).subscribe((data:any)=>{
      this.failedDeliveryData = data;

    },(err:HttpErrorResponse)=>{
      this.loader.hide();
    },()=>{
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
   

}
