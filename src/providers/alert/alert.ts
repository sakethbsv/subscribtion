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
   let delete_successful=false;
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
          console.log(data);
          list.forEach(item => {
            item.delete = true
          });
         
          this.catalog.addOrUpdateSubscriptionData(shopId,list).subscribe((data:any)=>{
            delete_successful = true;
          },(err:HttpErrorResponse)=>{
            if(err.status==200){
              delete_successful = true;
            }else{
              delete_successful = false;
            }
            this.laoder.hide()
          },()=>{
            this.laoder.hide()
            return delete_successful;
          })
        }
      }]
    });
    alert.present();

   
  }

}
