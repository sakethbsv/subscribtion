import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CatalogProvider } from '../catalog/catalog';
import { LoaderProvider } from '../loader/loader';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  dataToBeDeleted: any;
  productDeleted: boolean;

  constructor(public alert: AlertController, public catalog: CatalogProvider, public loader: LoaderProvider) {
    console.log('Hello AlertProvider Provider');
  }

  errorAlert(data) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: data,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  csvAlert() {
    let alert = this.alert.create({
      title: 'Upload Product',
      inputs: [{
        name: 'file',
        placeholder: 'Upload Product',
        type: 'file'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log(data);
        }
      }]
    });
    alert.present();
  }

  deleteConfirmation(shopId, list) {
    this.productDeleted = false;
    let promise = new Promise(((resolve, reject) => {
      let alert = this.alert.create({
        title: 'Are you sure you want to delete items ?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            reject();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(shopId, list);
            this.productDeleted = true;
            resolve();
          }
        }]
      });
      alert.present();
    }))


    return promise;
  }

  // Catalog Page - Add Product
  addNewProduct() {
    let alert = this.alert.create(
      {
        title: 'Edit',
        inputs: [
          {
            name: 'BarcodeId',
            type: 'text'
          },
          {
            name: 'Sku',
            type: 'text'
          },
          {
            name: 'Product Name',
            type: 'text'
          }, {
            name: 'Category',
            type: 'text'
          }
        ]
      }
    )

    return alert.present();
  }

  deletePromotion() {
    let promise = new Promise(((resolve, reject) => {
      let alert = this.alert.create({
        title: 'Are you sure you want to delete promotions?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            reject();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            resolve();
          }
        }]
      });
      alert.present();
    }))


    return promise;
  }
}
