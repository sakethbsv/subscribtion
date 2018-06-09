import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CatalogProvider } from '../../providers/catalog/catalog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
import { ModalProvider } from '../../providers/modal/modal';

/**
 * Generated class for the CatalogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalog',
  templateUrl: 'catalog.html',
})
export class CatalogPage {
  shopList: any[] = [];
  settings: any;
  productList: any[] = [];
  productUpdateList :any[] =[];
  productListToBeDeleted : any[] = [];
  shopSelected:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, public catalogService: CatalogProvider,private loader:LoaderProvider,private alert:AlertProvider,public modal:ModalProvider) {
    this.settings = {
      delete: {
        confirmDelete: true,
      },
      add: {
        confirmCreate: true,
      },
      edit: {
        confirmSave: true,
      },
  
      columns: {
        sku: {
          title: 'Sku'
        },
        barcodeId: {
          title: 'Barcode Id'
        },
        image: {
          title: 'Image'
        },
        category: {
          title: 'Category'
        },
        categoryImage: {
          title: 'Category Image'
        },
        subCategory: {
          title: 'Sub Category'
        },
        amount: {
          title: 'Shop Price'
        }
      },

    };
    this.productList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogPage');
    this.getAllShops();
  }

  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
    })
  }

  viewProduct(shopId) {
   this.catalogService.getAllProducts(shopId).subscribe((data:any)=>{
    this.productList = data.subscriptionProducts;

    console.log(this.productList);
  },(err:HttpErrorResponse)=>{
    console.log(err.error);
    this.loader.hide();
  },()=>{
    this.loader.hide();
   })
  }

  save(){
    this.updateProductList()
  }

  updateProductList() {
   
    this.catalogService.addOrUpdateSubscriptionData(this.shopSelected,this.productUpdateList).subscribe((data:any)=>{
      console.log(data)
      
      console.log(this.productList);
    },(err:HttpErrorResponse)=>{
      console.log(err);
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event.data);
      event.data.delete = true;
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    this.productUpdateList.push(event.data);
  }

  onSaveConfirm(event) {
    event.confirm.resolve(event.newData);
    this.productUpdateList.push(event.newData);
    console.log(event.newData);

  }

  onCreateConfirm(event) {
  
    event.confirm.resolve(event.newData);
    this.productUpdateList.push(event.newData);
    console.log(event.newData);
  }

  uploadCatalog(){
    this.catalogService.selectedShopId = this.shopSelected;
    this.modal.showFileUploadModal(this.shopSelected);
  }

  delete(){
    this.alert.deleteConfirmation(this.shopSelected,this.productList);
    
  }

}
