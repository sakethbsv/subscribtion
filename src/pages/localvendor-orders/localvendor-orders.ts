import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import * as moment from 'moment';
import { ShopProvider } from '../../providers/shop/shop';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';
import { LoaderProvider } from '../../providers/loader/loader';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { ModalProvider } from '../../providers/modal/modal';
import { StorageProvider } from '../../providers/storage/storage';
import { ScrollProvider } from '../../providers/scroll/scroll';
import { HttpErrorResponse } from '@angular/common/http';
import { PapaParseService } from 'ngx-papaparse';
import { ApartmentsProvider } from '../../providers/apartments/apartments';
/**
 * Generated class for the LocalvendorOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-localvendor-orders',
  templateUrl: 'localvendor-orders.html',
})

export class LocalvendorOrdersPage {
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
  apartmentList: any[] = [];
  selectedApartmen: any;
  selectedApartment: any;
  copyOfFulfilmentData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shop: ShopProvider, private orders: FulfillmentDetailsProvider, private loader: LoaderProvider, private scroll: ScrollProvider, private errorHandler: ErrorHandlerServiceProvider, private modal: ModalProvider, private storage: StorageProvider, private papa: PapaParseService,private apartmentProvider:ApartmentsProvider) {
    this.fulfillmentData = [];
    this.apartmentList = [{ label: 'All Apartments', value: null }]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.getAllShops();
    this.setApartmentDropDown(1);
    
  }

  setApartmentDropDown(shopId){
    
    this.apartmentProvider.getApartmentDetails(1).subscribe((data: any) => {
    console.log(data);
    data.forEach(element => {
      let apartmentMap:any ={};
      apartmentMap.label = element.apartmentDisplayName;
      apartmentMap.value = element.apartmentId;
      this.apartmentList.push(apartmentMap);
    });
     

    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.loader.hide();
      // alert("Something went wrong !");
    }, () => {
      this.loader.hide();
    })
    
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
      //this.apartmentList = this.apartmentList.concat(this.orders.getListOfApartment(data));
      console.log(this.apartmentList);
      this.cols = [
        { field: 'subscriptionId', header: 'ID' },
        { field: 'subscriptionOrderId', header: 'Subscription Order Id' },
        { field: 'actualOrderId', header: 'Fulfillment Order Id' },
        { field: 'totalOrderAmount', header: 'Order Amount' },
        { field: 'customerName', header: 'Customer Name' },
        { field: 'mobileNumber', header: 'Mobile Number' },
        { field: 'deliveryDate', header: 'Delivery Date' },
        { field: 'slot', header: 'Slot' },
        { field: 'paymentMethod', header: 'Payment Method' },
        { field: 'paymentDone', header: 'Payment Status' },
        { field: 'orderSentToMerchant', header: 'Order Sent To Merchant' },
        { field: 'status', header: 'Status' },
        { field: 'detail', header: 'Detail' },
        { field: 'confirmed', header: 'Confirmation Status' },
        { field: 'confirmationLink', header: 'Confirmation Link' },
        { field: 'apartmentName', header: 'Apartment Name' },
      ];

      this.fulfillmentData = this.orders.generateFulfillmentTableData(data);
      this.copyOfFulfilmentData = this.fulfillmentData;
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
      console.log(csv);
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'Subscription-Fulfillment.csv';
      hiddenElement.click();

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }


  onClick(fulfillment) {
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

  onRowSelect(data) {
    console.log(data)
    this.modal.showSubscriptionDetails(data);
  }

 

  filterTable() {
    if (this.selectedApartment != null) {
      this.fulfillmentData = this.copyOfFulfilmentData.filter(value => { return value.apartmentId == this.selectedApartment })
    } else {
      this.fulfillmentData = this.copyOfFulfilmentData;
    }
    console.log(this.fulfillmentData, this.copyOfFulfilmentData);

  }

  download(shopIds) {
    let formData = {
      "shopIds": shopIds,
      "fromDate": moment(this.daterange.start.toDate()).format("YYYY-MM-DD"),
      "toDate": moment(this.daterange.end.toDate()).format("YYYY-MM-DD"),
      "apartmentId":this.selectedApartment
    }
    this.orders.getFulfilmentDetailsByApartments(formData).subscribe((data:any)=>{
        let csv = this.papa.unparse(this.orders.generateFulfillmentDataByApartment(data));
        var blob = new Blob([csv]);
        if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
          window.navigator.msSaveBlob(blob, "filename.csv");
        else {
          var a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = "filename.csv";
          document.body.appendChild(a);
          a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
          document.body.removeChild(a);
        }
    },(err:HttpErrorResponse)=>{
      this.errorHandler.error(err.error)
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
  
    

  }

  setDeliveryData() {

  }

}
