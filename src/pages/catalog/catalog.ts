import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CatalogProvider } from '../../providers/catalog/catalog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
import { ModalProvider } from '../../providers/modal/modal';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { ErrorPage } from '../error/error';
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
  errorData: any[] = [];

  shopSelected: any;
  viewProductSelected: boolean = false;

  rows: any[] = [];

  displayDialog: boolean = false;
  product: any = {};
  selectedProduct: any;
  newProduct: boolean = false;
  productList: any[] = [];
  productListToUpdate: any[] = [];
  editedProduct: any = {};
  cols: any[] = [];
  msgs: any[] = [];
  rowData: any;
  uploadCatalog: boolean = false;
  activateDeleteButton:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, public catalogService: CatalogProvider, private loader: LoaderProvider, public modal: ModalProvider, private errorHandler: ErrorHandlerServiceProvider, private alert: AlertProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogPage');
    this.getAllShops();
  }

  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      // if (this.shopList != undefined && this.shopList != null && this.shopList.length > 0) {
        this.shopSelected = this.shopList[0].shopId;
      // }
    })
  }

  viewProduct(shopId) {
    this.catalogService.getAllProducts(shopId).subscribe((data: any) => {
      this.cols = [
        { field: 'barcodeId', header: 'BarcodeId' },
        { field: 'sku', header: 'sku' },
        { field: 'name', header: 'Name' },
        { field: 'image', header: 'Image' },
        { field: 'category', header: 'Category' },
        { field: 'subCategory', header: 'Sub Category' },
        { field: 'categoryImage', header: 'Category Image' },
        { field: 'amount', header: 'Amount' },
        { field: 'isPerishable', header: 'Perishable' }
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



  updateProductList(list) {

    console.log('Products to be updates', list);
    let promise = new Promise((resolve, reject) => {


      this.catalogService.addOrUpdateSubscriptionData(this.shopSelected, list).subscribe(() => {
        this.loader.hide();
        resolve();
      }, (err: HttpErrorResponse) => {
        console.log(err);

        this.errorHandler.error(err);
        this.loader.hide();
        reject(err);
      })


    })


    return promise;
  }


  checkData(element) {

    if (element.barcodeId != null && element.sku != null && element.category != null && element.subCategory != null && element.amount != null
      && (element.barcodeId + "").length != 0 && element.sku.length != 0 && element.category.length != 0 && element.subCategory.length != 0
      && (element.amount + "").length != 0) {
      return true;
    } else {
      this.alert.errorAlert('Please fill all the required details')
      return false;
    }
  }
  refresh() {
    this.viewProduct(this.shopSelected);
  }

  showDialogToAdd() {
    this.newProduct = true;
    this.product = {};
    this.displayDialog = true;
  }

  save() {
    this.productListToUpdate = [];
    this.msgs = [];
    let products = this.productList;
    if (this.newProduct) {
      if (this.checkData(this.product)) {

        this.updateProductList([this.product]).then(() => {
          products.push(this.product);
          this.displayDialog = false;
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Added !', life: 3000 });
        }, (err) => {
          console.log(err);

        })

      } else {

      }

    } else {
      this.updateProductList([this.product]).then(() => {
        console.log(this.editedProduct);
        console.log(this.product, this.productList.indexOf(this.editedProduct))
        products[this.productList.indexOf(this.editedProduct)] = this.product;
        this.displayDialog = false;
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Edited !', life: 3000 });

      }, (err) => {
        console.log(err);

      })

    }

    this.productList = products;
    console.log('productList', this.productList)
    //this.product = {};
  }

  delete() {
    this.productListToUpdate = [];
    this.msgs = [];
    let index = this.productList.indexOf(this.selectedProduct);
    this.productList = this.productList.filter((i) => i != index);
    this.product.delete = true;
    this.productListToUpdate.push(this.product);
    this.product = null;
    this.displayDialog = false;

    this.updateProductList(this.productListToUpdate).then(() => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Deleted !', life: 3000 });
    }, () => {

    })


  }

  onRowSelect(event) {
   this.activateDeleteButton=true;
  }

  cloneProduct(c: any): any {
    let product = {};
    for (let prop in c) {
      product[prop] = c[prop];
    }
    return product;
  }

  deleteAll() {
    this.productListToUpdate = [];
    this.msgs = [];
    this.productList.forEach(element => {
      element.delete = true;
      this.productListToUpdate.push(element);
    });
    this.alert.deleteConfirmation(this.shopSelected, this.productListToUpdate).then(() => {
      this.updateProductList(this.productListToUpdate).then(() => {
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Catalog Deleted !', life: 3000 });
        this.productList = [];
      })
    }, () => {

    })



  }

  deleteProduct(data) {
    this.productListToUpdate = [];
    this.msgs = [];
    data.delete = true;
    this.productListToUpdate.push(data);
    this.displayDialog = false;
    this.updateProductList(this.productListToUpdate).then(() => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Deleted !', life: 3000 });
      let index = this.productList.indexOf(data);
      this.productList = this.productList.filter((val, i) => i != index);
    }, () => {

    })
  }

  deleteSelected() {
    this.productListToUpdate = [];
    this.msgs = [];
    console.log(this.selectedProduct)
    this.selectedProduct.forEach(element => {
      element.delete = true;
      this.productListToUpdate.push(element);
    });

    this.alert.deleteConfirmation(this.shopSelected, this.productListToUpdate).then(() => {
      console.log(this.alert.productDeleted);
      if (this.alert.productDeleted) {


        // update products
        this.updateProductList(this.productListToUpdate).then(() => {
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Deleted !', life: 3000 });
          this.productListToUpdate.forEach(element => {
            let index = this.productList.indexOf(element);
            this.productList = this.productList.filter((val, i) => i != index);
          });
        }, () => {

        })


      }
    }, () => {
      console.log('Delete Cancelled');
      this.msgs.push({ severity: 'info', summary: 'Aborted', detail: 'Canceled !', life: 3000 });
    });

  }




  editProduct(rowData) {
    console.log(rowData);
    this.editedProduct = rowData;
    this.newProduct = false;
    this.product = this.cloneProduct(rowData);
    this.displayDialog = true;
    console.log('product', this.product);
  }

  myUploader(event) {
    this.msgs = [];
    console.log(event.files);

    this.errorData = [];
    this.catalogService.convertCatalogCsvToJson(event.files[0], this.shopSelected, this.errorData).then((data: any) => {
      this.updateProductList(data).then(() => {
        this.uploadCatalog = false;
        this.productList.push(data);
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Products Uploaded !', life: 3000 });
        this.viewProduct(this.shopSelected);
      }, () => {

      })
    }, (err: any) => {

      console.log(this.errorData);
      this.presentErrorModal();

    })

  }
  presentErrorModal() {
    let profileModal = this.modalCtrl.create(ErrorPage, { errors: this.errorData });
    profileModal.present();
  }



  onRowUnselect(event){
    console.log(event.data);
    console.log(this.selectedProduct)
    if(this.selectedProduct.length>0){
      this.activateDeleteButton=true;
    }else{
      this.activateDeleteButton=false;
    }
  }

}
