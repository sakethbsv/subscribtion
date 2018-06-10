import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
        handler: data => {
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
    let alert = this.alert.create({
      title: 'Are you sure you want to delete items ?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
          list.forEach(item => {
            item.delete = false;
          });
        }
      },
      {
        text: 'Yes',
        handler: data => {
          // this.catalog.addOrUpdateSubscriptionData(shopId, list).subscribe((data: any) => {

          // }, (err: HttpErrorResponse) => {
          //   if (err.status == 200) {
          //    list.forEach(element => {
          //      console.log(this.catalog.removeProduct(list,element))
          //    });
          //   } else {

          //   }
          //   this.loader.hide()
          // }, () => {
          //   this.loader.hide()

          // })
        }
      }]
    });
    alert.present();


  }

}
