import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CatalogProvider } from '../../providers/catalog/catalog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
import { ModalProvider } from '../../providers/modal/modal';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, public catalogService: CatalogProvider, private loader: LoaderProvider, public modal: ModalProvider, private errorHandler: ErrorHandlerServiceProvider, private alert: AlertProvider) {
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
        { field: 'barcodeId', header: 'BarcodeId' },
        { field: 'sku', header: 'sku' },
        { field: 'name', header: 'Name' },
        { field: 'image', header: 'Image' },
        { field: 'category', header: 'Category' },
        { field: 'subCategory', header: 'Sub Category' },
        { field: 'categoryImage', header: 'Category Image' },
        { field: 'amount', header: 'Amount' },
        { field: 'isPerishable', header: 'Persihable' }
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
    let updateSuccessful = false;
    console.log('Products to be updates', list);
    let promise = new Promise((resolve, reject) => {


      this.catalogService.addOrUpdateSubscriptionData(this.shopSelected, list).subscribe(() => {
        //this.toast.create({ message: 'Updated Successfully !', duration: 3000, position: 'top',showCloseButton:true }).present();
        updateSuccessful = true;
        this.loader.hide();
        resolve();
      }, (err: HttpErrorResponse) => {
        console.log(err);

        this.errorHandler.error(err);
        this.loader.hide();
        updateSuccessful = false;
        reject();
      })
      console.log('operation status', updateSuccessful);

    })


    return promise;
  }



  uploadCatalog() {
    this.catalogService.selectedShopId = this.shopSelected;
    this.modal.showFileUploadModal(this.shopSelected);
  }


  checkData(element) {

    if (element.barcodeId != "" && element.sku != "" && element.category != "" && element.subCategory != "" && !isNaN(element.amount)) {
      return true;
    } else {
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
    console.log(this.selectedProduct)
    this.productListToUpdate = [];
    this.msgs = [];
    let products = this.productList;
    if (this.newProduct)
      products.push(this.product);
    else
      products[this.productList.indexOf(this.editedProduct)] = this.product;
    this.productListToUpdate.push(this.product);

    this.productList = products;
    this.product = null;
    this.displayDialog = false;
    console.log(this.productList);
    this.updateProductList(this.productListToUpdate).then(() => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Updated !' });

    })
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
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Deleted !' });
    })


  }

  onRowSelect(event) {
    this.newProduct = false;
    this.product = this.cloneProduct(event.data);
    this.displayDialog = true;
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
    this.updateProductList(this.productListToUpdate).then(() => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Catalog Deleted !' });
    })


  }

  deleteProduct(data) {
    this.msgs = [];
    let index = this.productList.indexOf(data);
    this.productList = this.productList.filter((i) => i != index);
    data.delete = true;
    this.productListToUpdate.push(data);
    this.product = null;
    this.updateProductList(this.productListToUpdate).then(() => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Deleted !' });
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
        this.productListToUpdate.forEach(element => {
          let index = this.productList.indexOf(element);
          this.productList = this.productList.filter((i) => i != index);
        });

        // update products
        this.updateProductList(this.productListToUpdate).then(() => {
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Product Deleted !' });

        })


      }
    }, () => {
      console.log('Delete Cancelled');
      this.msgs.push({ severity: 'info', summary: 'Aborted', detail: 'Canceled !' });
    });

  }




  editProduct(rowData) {
    console.log(rowData);
    this.editedProduct = rowData;
    this.newProduct = false;
    this.product = this.cloneProduct(rowData);
    this.displayDialog = true;
  }

}
