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
import { ShopProvider } from '../../providers/shop/shop';
import { writeToNodes } from 'ionic-angular/umd/components/virtual-scroll/virtual-util';
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
  inventoryListCopy:any[]=[];
  vendorList:any[]=[]
  rows:any[]=[];
  cols:any[]=[];
  shopSelected : any;
  viewInventoryFlag : boolean = false;
  cities1: any[];
    areas:any[];
    cities2: any[];
    appartments:any[];

    selectedCity1: any;
    
    selectedCity2: any;

    selectedArea:any;

    selectedAppartment:any;
  inventoryType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private shop:ShopProvider,public inventoryProvider:InventoryProvider,private loader:LoaderProvider,private errorHandler:ErrorHandlerServiceProvider,public storage:StorageProvider) {
            //SelectItem API with label-value pairs
            
          //An array of cities
         
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.getAllShops();
    this.cities1 = [
      {label:'Select City', value:null},
      {label:'Andheri', value:"andheri"},
      {label:'Bandra', value:"bandra"},
  ];
  this.areas = [
 
    {label:'Select Area', value:null},
   
];
this.appartments = [

  {label:'Select Building', value:null}
 
];
  }

  // getAllShops() {
  //   this.shopList =  this.shop.getAdminShopList();
  //   if(this.shopList.length>0){
  //     this.shopSelected = this.shopList[0].shopId;
  //   }

  // }

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
    this.inventoryType = 'vendorProduct';
    console.log('shopid...')
    let from = moment(this.daterange.start.toDate()).format("YYYY-MM-DD");
    let to = moment(this.daterange.end.toDate()).format("YYYY-MM-DD");
    let page = 1;
    this.inventoryProvider.getInventory(shopId,from,to).subscribe((data:any)=>{
      this.cols = [
        { field: 'barcodeId', header: 'Barcode ID'},
        { field: 'sku', header:'SKU'},
        { field: 'name', header:'Product Name'},
        { field: 'quantity', header: 'Quantity'},
        { field:'amount',header:'Amount'}
        
    ];
      this.inventoryList = data;
      this.inventoryListCopy = this.inventoryList;
      this.vendorList = data;
      console.log(data);
      this.loader.hide();
    },(err:HttpErrorResponse)=>{
      this.errorHandler.error(err);
      this.loader.hide();
    })
  }

  filterInventoryByCity(key){

    if(this.selectedCity1=='andheri'){
      this.appartments = [
        {label:'Select Appartment', value:null},
        {label:'Andheri Appartment 1', value:'andheri_appartment1'},
        {label:'Andheri Appartment 2', value:'andheri_appartment2'}
       
      ];
    }else{
      this.appartments = [
        {label:'Select Appartment', value:null},
        {label:'Bandra Appartment 1', value:'bandra_appartment1'}
       
      ];
    }
   
   
    console.log(key);
    console.log(this.inventoryList)
   let list = [];
      if(key){
        this.inventoryList= this.inventoryListCopy.filter(word =>  word.area==key)
      }
  }

  filterInventoryByArea(key){
   
    console.log(key);
    console.log(this.inventoryList)
   let list = [];
      if(key){
        this.inventoryList= this.inventoryListCopy.filter(word =>  word.locality==key)
      }
  }

  filterInventoryByAppartment(key){
   
    console.log(key);
    console.log(this.inventoryList)
   let list = [];
      if(key){
        this.inventoryList= this.inventoryListCopy.filter(word =>  word.appartment==key)
      }
  }
}
