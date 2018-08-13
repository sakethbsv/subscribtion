import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import 'rxjs/add/observable/fromEvent';
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
  @ViewChild(Content) content: Content;
  @ViewChild(DaterangePickerComponent)

  private picker: DaterangePickerComponent;

  daterange: any = {
    start: moment().subtract(1, 'days'),
    end: moment(),
    label: ''
  };

  options: any = {
    startDate: moment().subtract(1, 'days'),
    endDate: moment(),
  }

  shopList: any[] = [];
  settings: any;
  source: any;
  inventoryList: any[] = [];
  inventoryListCopy: any[] = [];
  vendorList: any[] = []
  rows: any[] = [];
  cols: any[] = [];
  shopSelected: any;
  viewInventoryFlag: boolean = false;
  cities1: any[];
  areas: any[];
  cities2: any[];
  appartments: any[];

  selectedCity1: any;

  selectedCity2: any;

  selectedArea: any;

  selectedAppartment: any;

  inventoryType: any;
  category: any = [];
  groupByApartment: any = [];
  apartments: any = [];
  admin: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public inventoryProvider: InventoryProvider, private loader: LoaderProvider, private errorHandler: ErrorHandlerServiceProvider, public storage: StorageProvider) {

    this.category = [{ label: 'All Category', value: null }];
    this.groupByApartment = [{ label: 'All Apartments', value: null }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.getAllShops();
  }


  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      this.admin = data.admin;
      if (this.shopList != undefined && this.shopList != null && this.shopList.length > 0) {
        this.shopSelected = this.shopList[0].shopId;
      }
    })

  }
  public selectedDate(value: any) {
    // this is the date the user selected
    console.log(value);

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    console.log('daterange', moment(this.daterange.start.toDate()).format("YYYY-MM-DD"));

  }

  viewInventory(shopId) {
    this.inventoryType = 'vendorProduct';
    console.log('shopid...')
    let from = moment(this.daterange.start.toDate()).format("YYYY-MM-DD");
    let to = moment(this.daterange.end.toDate()).format("YYYY-MM-DD");
    this.inventoryProvider.getInventory(shopId, from, to, this.admin).subscribe((data: any) => {
      //   this.cols = [
      //     { field: 'barcodeId', header: 'Barcode ID'},
      //     { field: 'sku', header:'SKU'},
      //     { field: 'name', header:'Product Name'},
      //     { field: 'quantity', header: 'Quantity'},
      //     { field:'category',header:'Category'},
      //     { field:'subCategory',header:'Sub Category'},
      //     { field:'apartmentDisplayName',header:'Apartment Name'}

      // ];
      this.cols = this.inventoryProvider.generateDynamicHeader(data);
      this.inventoryList = data;
      this.inventoryListCopy = this.inventoryList;
      this.vendorList = data;
      console.log(data);
      this.category = this.category.concat((this.inventoryProvider.getListOfCategory(this.inventoryList)));
      this.groupByApartment = this.groupByApartment.concat(this.inventoryProvider.getListOfApartment(this.inventoryList))
      console.log(this.category)
      this.loader.hide();
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.loader.hide();
    })
  }

}
