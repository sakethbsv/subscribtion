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

  options : any = {
    startDate : moment().subtract(1, 'days'),
    endDate : moment(),
  }

  shopList:any[]=[];
  settings:any;
  source:any;
  inventoryList:any[]=[];
  rows:any[]=[];
  cols:any[]=[];
  shopSelected : any;
  viewInventoryFlag : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:StorageProvider,public inventoryProvider:InventoryProvider,private loader:LoaderProvider,private errorHandler:ErrorHandlerServiceProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.getAllShops();
  }

  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      if(this.shopList != undefined && this.shopList != null && this.shopList.length > 0){
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

  viewInventory(shopId){
    console.log('shopid...')
    let from = moment(this.daterange.start.toDate()).format("YYYY-MM-DD");
    let to = moment(this.daterange.end.toDate()).format("YYYY-MM-DD");
    let page = 1;
    this.inventoryProvider.getInventory(shopId,from,to).subscribe((data:any)=>{
      this.cols = [
        { field: 'barcodeId', header: 'Barcode ID'},
        { field: 'sku', header:'SKU'},
        { field: 'name', header:'Product Name'},
        { field: 'category', header: 'Category' },
        { field: 'subCategory', header: 'Subcataegory'},
        { field: 'quantity', header: 'Quantity'}
        
    ];
      this.inventoryList = data;
      console.log(data);
      this.loader.hide();
    },(err:HttpErrorResponse)=>{
      this.errorHandler.error(err);
      this.loader.hide();
    })
  }

}
