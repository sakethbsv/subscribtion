import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';
import * as moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { HttpErrorResponse } from '@angular/common/http';
import { ScrollProvider } from '../../providers/scroll/scroll';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { ModalProvider } from '../../providers/modal/modal';
import { ShopProvider } from '../../providers/shop/shop';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileTransferError } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
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

  options: any = {
    startDate: moment().subtract(1, 'days'),
    endDate: moment(),
  }



  shopList: any[];
  fulfillmentData: any;
  searchItem: any;
  settings: any;
  selectedShopId: number;
  showfilter: boolean = false;
  shopIds: any[] = [];
  selectedShopIds: any[] = [];
  cols: any[] = [];
  admin: any;
  storageDirectory: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public shop: ShopProvider, private orders: FulfillmentDetailsProvider, private loader: LoaderProvider, private scroll: ScrollProvider, private errorHandler: ErrorHandlerServiceProvider, private modal: ModalProvider, private storage: StorageProvider,public platform: Platform, private transfer: FileTransfer, private file: File) {
    this.fulfillmentData = [];
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getAllShops();
  }

  getAllShops() {
    this.shopIds = [];
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      this.admin = data.admin;
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
        { field: 'print', header: 'Bill' },
        { field: 'shopId', header: 'Shop Id' },
        { field: 'originalStoreCode', header: 'Store Code' },
        { field: 'fulfillmentId', header: 'FarEye ID' },
        { field: 'subscriptionOrderId', header: 'Subscription Order Id' },
        { field: 'actualOrderId', header: 'Fulfillment Order Id' },
        { field: 'totalOrderAmount', header: 'Order Amount' },
        { field: 'customerName', header: 'Customer Name' },
        { field: 'mobileNumber', header: 'Mobile Number' },
        { field: 'deliveryDate', header: 'Delivery Date' },
        { field: 'slot', header: 'Slot' },
        { field: 'paymentMethod', header: 'Payment Method' },
        { field: 'paymentDone', header: 'Payment Status' },
        { field: 'city', header: 'City' },
        { field: 'orderSentToMerchant', header: 'Order Sent To Merchant' },
        { field: 'status', header: 'Status' },
        { field: 'detail', header: 'Detail' },
        { field: 'confirmed', header: 'Confirmation Status' },
        { field: 'confirmationLink', header: 'Confirmation Link' },
      ];
      this.fulfillmentData = this.orders.generateFulfillmentTableData(data);
      console.log(this.fulfillmentData);


      this.scroll.scrollTo('#order-detail');

    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.loader.hide();
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

  filter() {
    this.showfilter = true;
  }

  downloadReport(shopIds) {
    let formData = {
      "shopIds": shopIds,
      "fromDate": moment(this.daterange.start.toDate()).format("YYYY-MM-DD"),
      "toDate": moment(this.daterange.end.toDate()).format("YYYY-MM-DD")
    }

    this.orders.downloadFullfillmentReport(formData).subscribe((data: any) => {
      let csv = data;
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      console.log(csv);
      if(this.platform.is('android')){
       this.downloadReportInDevice(hiddenElement.href)
        // external url
        var ref = window.open(hiddenElement.href, '_blank', 'location=yes');
        // relative document
       // ref = window.open('Subscription-Fulfillment.csv', '_self');
      }else{
      
      hiddenElement.target = '_blank';
      hiddenElement.download = 'Subscription-Fulfillment.csv';
      hiddenElement.click();
      }
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }


  updateFulfillmentStatus(fulfillment) {
    console.log('...', fulfillment);
    if (fulfillment.status == "PENDING") {
      fulfillment.status = "FULFILLED";

    }

    this.orders.updateFulfillmentStatus(fulfillment).subscribe(data => {
      console.log(data);
      fulfillment.status = "FULFILLED";
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      console.log('err');
      if (err.status == 200) {
        console.log(err);

      } else {
        fulfillment.status = 'PENDING';
      }

      this.loader.hide();
    }, () => {
      console.log('Completed');
      this.loader.hide();
    })

  }

  viewDetail(data) {
    console.log(data)
    this.modal.showSubscriptionDetails(data);
  }

  downloadReportInDevice(data) {
    this.platform.ready().then(() => {
     // create dir

      let perc=0; 
      let targetPath = this.file.documentsDirectory;
      //const data = "https://www.treesaregood.org/portals/0/docs/treecare/benefits_trees.pdf";
      this.file.createDir(targetPath,'document',true)
      .then((res) => console.log('createDir video res',res))
      .catch((err) => console.log('createDir video err',err));

      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.onProgress((progressEvent)=>{
        perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
	      
      })
        

      fileTransfer.download(data, this.file.externalDataDirectory+"document/" + "data.csv", true).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        
        alert('download completed: ' + entry.toURL());  
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  
        alert('download failed: ' + error);  
    });  

    });
  }



}
