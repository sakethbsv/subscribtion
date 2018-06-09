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

  dataToBeDeleted : any;

  constructor(public alert: AlertController,private catalog:CatalogProvider,private laoder:LoaderProvider) {
    console.log('Hello AlertProvider Provider');
  }

  errorAlert(data){
    let alert = this.alert.create({
      title: 'Error',
      subTitle: data,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  csvAlert(){
    let alert = this.alert.create({
      title: 'Upload Product',
     inputs :[{
       name:'file',
       placeholder:'Upload Product',
       type:'file'
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

  deleteConfirmation(shopId,list){
   
    let alert = this.alert.create({
      title: 'Are you sure you want to delete all the items ?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
          data.forEach(item => {
              item.delete = false;
          });
          this.dataToBeDeleted = data;
        }
      },
      {
        text: 'Yes',
        handler: data => {
          console.log(data);
          list.forEach(item => {
            list.delete = true
          });
          this.dataToBeDeleted = list;
          this.catalog.addOrUpdateSubscriptionData(shopId,this.dataToBeDeleted).subscribe((data:any)=>{

          },(err:HttpErrorResponse)=>{
            this.laoder.hide()
          },()=>{
            this.laoder.hide()
          })
        }
      }]
    });
    alert.present();
  }

}
