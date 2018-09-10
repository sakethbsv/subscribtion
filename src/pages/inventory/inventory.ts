import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { LoaderProvider } from '../../providers/loader/loader';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import 'rxjs/add/observable/fromEvent';
import { File } from '@ionic-native/file';
import { PapaParseService } from 'ngx-papaparse';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { ApartmentsProvider } from '../../providers/apartments/apartments';
/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
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

  showApartmentFilter:boolean=false;
  shopMap:any={};

  selectedApartment: any;
  selectedCategory: any;
  
  storageDirectory: string = '';
  storageDirectory1: any;
  storageDirectory2: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public inventoryProvider: InventoryProvider, private loader: LoaderProvider, private errorHandler: ErrorHandlerServiceProvider, public storage: StorageProvider, private transfer: FileTransfer, private file: File, private papa: PapaParseService,public platform:Platform,private apartmentProvider:ApartmentsProvider) {

    this.category = [{ label: 'All Category', value: null }];
    this.groupByApartment = [{ label: 'All Apartments', value: null }]
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.externalDataDirectory;
        
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
    this.getAllShops();
    this.setApartmentDropDown(1);

  }

  setApartmentDropDown(shopId){
    
    this.apartmentProvider.getApartmentDetails(1).subscribe((data: any) => {
    console.log(data);
    data.forEach(element => {
      let apartmentMap:any ={};
      apartmentMap.label = element.apartmentDisplayName;
      apartmentMap.value = element.apartmentDisplayName;
      this.groupByApartment.push(apartmentMap);
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
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      this.admin = data.admin;
      if (this.shopList != undefined && this.shopList != null && this.shopList.length > 0) {
        this.shopSelected = this.shopList[0].shopId;
        
      }
      this.shopList.forEach(element => {
        this.shopMap[element.shopId]=element;
      });
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
    // Set/Reset apartment filter based on shop subscription configuration
    if(this.shopMap[shopId].subscriptionConfig && this.shopMap[shopId].subscriptionConfig.apartmentVendor){
      this.showApartmentFilter=true;
    }
    this.inventoryProvider.getInventory(shopId, from, to, this.admin).subscribe((data: any) => {
      this.cols = [
        { field: 'category', header: 'Category' },
        { field: 'subCategory', header: 'Sub Category' },
        { field: 'barcodeId', header: 'Barcode ID' },
        { field: 'sku', header: 'SKU' },
        { field: 'name', header: 'Product Name' },
        { field: 'quantity', header: 'Quantity' },
        { field:'apartmentName',header:'Apartment Name'}


      ];
      
      //this.cols = this.inventoryProvider.generateDynamicHeader(data);
      this.inventoryList = data;
      this.inventoryListCopy = this.inventoryList;
      this.vendorList = data;
      console.log(data);
      this.category = this.category.concat((this.inventoryProvider.getListOfCategory(this.inventoryList)));
     // this.groupByApartment = this.groupByApartment.concat(this.inventoryProvider.getListOfApartment(this.inventoryList))
      console.log(this.category)
      this.loader.hide();
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.loader.hide();
    })
  }

  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let csv = this.papa.unparse(this.inventoryList);
    console.log(csv);
    let date = new Date();
    let fileName: any = "Required_Stocks_"+date.getDate()+"-"+date.getMonth()+"-"+date.getMinutes()+".csv";
    let path = this.storageDirectory;
    this.writeFile(this.storageDirectory,fileName,csv)
   
   

  }

  writeFile(path,fileName,csv){
    this.file.writeFile(path, fileName, csv)
    .then(
      _ => {
        alert('Success ;-)'+fileName)
      }
    )
    .catch(
      err => {

        this.file.writeExistingFile(path, fileName, csv)
          .then(
            _ => {
              alert('Success ;-) second')
            }
          )
          .catch(
            err => {
              alert('Failure'+fileName)
            }
          )
      }
    )
  }

 
}
