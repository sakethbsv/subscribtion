import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';
import { ViewCell } from '../../../node_modules/ng2-smart-table';
import { ButtonViewPage } from '../button-view/button-view';
import { SubscribtiondetailPage } from '../subscribtiondetail/subscribtiondetail';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { HttpErrorResponse } from '@angular/common/http';
import { ScrollProvider } from '../../providers/scroll/scroll';


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
  @ViewChild(DaterangePickerComponent)

  private picker: DaterangePickerComponent;

  daterange: any = {
    start: moment(),
    end: moment(),
    label: ''
  };




  shopList: any[];
  fulfillmentData: any;
  searchItem: any;
  settings: any;
  selectedShopId: number;
  showfilter: boolean = false;
  shopIds:any[]=[];
  selectedShopIds:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider, private orders: FulfillmentDetailsProvider, private loader: LoaderProvider, private scroll: ScrollProvider) {
    this.settings = {
      columns: {
        shopId: {
          title: 'Shop Id'
        },
        subscriptionId: {
          title: 'Subscribtion Id',
          type: 'custom',
          renderComponent: SubscribtiondetailPage,
          onComponentInitFunction(instance) {
            instance.save.subscribe(row => {
              console.log(row);
            });
          }
        },
        customerId: {
          title: 'Customer Id'
        },
        customerName: {
          title: 'Name'
        },
        mobileNumber: {
          title: 'Mobile No'
        },
        deliveryDate: {
          title: 'Delivery Date'
        },
        slot: {
          title: 'Slot'
        },
        city: {
          title: 'City'
        },
        status: {
          title: 'Status',
          type: 'custom',
          renderComponent: ButtonViewPage,
          onComponentInitFunction(instance) {
            instance.save.subscribe(row => {
              console.log(row);
            });
          }
        }
      },
      actions: false
    };

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
      this.shopList.forEach(shop => {
        this.shopIds.push(shop.shopId);
      });
      this.selectedShopIds = this.shopIds;
      this.search(this.shopIds);
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
    this.orders.getFulfillmentDetails(obj).subscribe((data: any) => {
      this.fulfillmentData = this.orders.generateFulfillmentTableData(data);
      console.log(this.fulfillmentData);
      this.scroll.scrollTo('#order-detail');
      
    }, (err: HttpErrorResponse) => {
      alert("Something went wrong !");
    }, () => {
      this.loader.hide();
    })



  }
  public selectedDate(value: any) {
    // this is the date the iser selected
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
      "toDate": moment(this.daterange.end.toDate()).format("YYYY-MM-DD"),
      "status": "PENDING"
    }

    this.orders.downloadFullfillmentReport(formData).subscribe((data:any)=>{
      let csv = 'Name,Title\n';
      data.forEach(function(row) {
              csv += row.join(',');
              csv += "\n";
      });
   
      console.log(csv);
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'people.csv';
      hiddenElement.click();

    },(err:HttpErrorResponse)=>{
      console.log(err.error);
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
  }

}
