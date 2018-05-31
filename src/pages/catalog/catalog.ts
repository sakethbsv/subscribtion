import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CatalogProvider } from '../../providers/catalog/catalog';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: StorageProvider, private catalogService: CatalogProvider) {
    this.settings = {
      columns: {
        productName: {
          title: 'Product Name'
        },
        productDesc: {
          title: 'Product Description'
        },
        category: {
          title: 'Catagory'
        },
        sku: {
          title: 'Sku'
        },
        barcodeId: {
          title: 'BarcodeId'
        },
        productMrp: {
          title: 'MRP'
        },
        shopPrice: {
          title: 'Shop Price'
        },
        hsn: {
          title: 'HSN'
        },
        cgst: {
          title: 'CGST'
        },
        sgst: {
          title: 'SGST'
        }
      },

    };

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

  viewProduct() {
    console.log('product call:');
    this.catalogService.getAllProducts(4).subscribe((data: any) => {
      console.log('product :', data);
      this.productList = data.qsrDataRow;
    }, err => {
      console.log(err);
    })
  }

  uploadCatalog() {

  }

}
