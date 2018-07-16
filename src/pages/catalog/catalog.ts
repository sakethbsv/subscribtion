import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CatalogProvider } from '../../providers/catalog/catalog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
import { ModalProvider } from '../../providers/modal/modal';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastController } from 'ionic-angular';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';

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
  editing = {};
  selected = [];
  shopList: any[] = [];
  settings: any;
  
 
  shopSelected: any;
 
  rows:any[]=[];
  
  displayDialog:boolean=false;
  product:any={}; 
  selectedProduct:any;
  newProduct:boolean=false;
  productList: any[] = [];
  productListToUpdate:any[]=[];
  cols:any[]=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, public catalogService: CatalogProvider, private loader: LoaderProvider, public modal: ModalProvider, private toast: ToastController, private errorHandler: ErrorHandlerServiceProvider) {
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
    this.catalogService.getAllProducts(shopId).subscribe((data: any) => {
      this.cols = [
        { field: 'barcodeId', header: 'BarcodeId'},
        { field: 'sku', header:'sku'},
        { field: 'name', header:'Name'},
        { field: 'image', header: 'Image' },
        { field: 'category', header: 'Category' },
        { field: 'subCategory', header: 'Sub Category'},
        { field: 'categoryImage', header: 'Category Image' },
        { field: 'amount', header: 'Amount' },
        {field:'isPerishable',header:'Persihable'}
    ];
      
      //this.dataset = data;
      this.productList = data.subscriptionProducts;
      //this.catalogService.catalogData = this.productList;
     // this.rows = this.productList;
      // this.source.load(this.productList)
      console.log(this.productList);
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      console.log(err.error);
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }

  // save() {
  //   this.updateProductList()
  // }

  updateProductList(list) {

    console.log('Products to be updates',list);

    this.catalogService.addOrUpdateSubscriptionData(this.shopSelected, list).subscribe((data: any) => {
      this.toast.create({ message: 'Updated Successfully !', duration: 3000, position: 'top',showCloseButton:true }).present();
    }, (err: HttpErrorResponse) => {
      console.log(err);

      this.errorHandler.error(err);
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }



  // onSaveConfirm(event) {
    
  //   if(this.checkData(event.newData)){
  //     event.confirm.resolve(event.newData);
  //     this.productUpdateList.push(event.newData);
  //   }else{
  //     this.toast.create({ message: 'BarcodeId,Sku,Category,Sub-Category Are Mandatory', duration: 3000, position: 'top',showCloseButton:true }).present();
  //   }
  //   console.log(event.newData);

  // }

  // onCreateConfirm(event) {

   
  //   if(this.checkData(event.newData)){
  //     event.confirm.resolve(event.newData);
  //     this.productUpdateList.push(event.newData);
  //   }else{
  //     this.toast.create({ message: 'BarcodeId,Sku,Category,Sub-Category Are Mandatory', duration: 3000, position: 'top',showCloseButton:true }).present();
  //   }
   
  //   console.log(event.newData);
  // }

  uploadCatalog() {
    this.catalogService.selectedShopId = this.shopSelected;
    this.modal.showFileUploadModal(this.shopSelected);
  }

  // delete() {
  //   this.catalogService.deleteConfirmed = false;
  //   this.modal.deleteConfirmationModal(this.source);

  //   // this.productListToBeDeleted.forEach(element => {
  //   //   this.source.remove(element);
  //   // });


  // }


checkData(element) {
 
   if(element.barcodeId!="" && element.sku!="" && element.category!="" && element.subCategory!=""){
     return true;
   }else{
     return false;
  }
}
  refresh() {
  //   this.catalogService.productsDeleted.forEach(element => {
  //     this.source.remove(element);
  //   });

  //  this.source.load(this.catalogService.catalogData);
  //  this.productList = this.catalogService.catalogData;
  }

  // userRowSelect(event) {
  //   this.productListToBeDeleted = [];
  //   console.log(event);
  //   if(event.data==null){
  //     event.isSelected = true;
  //     event.selected = this.productList;
  //   }

  //   if (event.isSelected) {
  //     event.selected.forEach(item => {
  //       item.delete = true;
  //       this.productListToBeDeleted.push(item);
  //     });
  //     this.catalogService.productsDeleted = this.productListToBeDeleted;
  //     this.catalogService.selectedShopId = this.shopSelected;
  //   }
  // }

  showDialogToAdd() {
    this.newProduct = true;
    this.product = {};
    this.displayDialog = true;
}

save() {
    let products = this.productList;
    if (this.newProduct)
        products.push(this.product);        
    else
        products[this.productList.indexOf(this.selectedProduct)] = this.product;
        this.productListToUpdate.push(this.product);
    this.productList = products;
    this.product = null;
    this.displayDialog = false;
    this.updateProductList(this.productListToUpdate);
}

delete() {
    let index = this.productList.indexOf(this.selectedProduct);
    this.productList = this.productList.filter((val, i) => i != index);
    this.product.delete = true;
    this.productListToUpdate.push(this.product);
    this.product = null;
    this.displayDialog = false;  
    
    this.updateProductList(this.productListToUpdate);
}

onRowSelect(event) {
    this.newProduct = false;
    this.product = this.cloneCar(event.data);
    this.displayDialog = true;
}

cloneCar(c: any): any {
    let product = {};
    for (let prop in c) {
        product[prop] = c[prop];
    }
    return product;
}

deleteAll(){
 this.productListToUpdate =[];
  this.productList.forEach(element => {
    element.delete = true;
    this.productListToUpdate.push(element);
  });
  this.updateProductList(this.productListToUpdate);
}

}
