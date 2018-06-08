import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  dataToBeDeleted : any;

  constructor(public alert: AlertController) {
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

  deleteConfirmation(data){
   
    let alert = this.alert.create({
      title: 'Are you sure you want to delete ?',
      subTitle:'<ion-list><ion-item *ngFor="let item of data">{{data.name}}</ion-item></ion-list>',
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
          this.dataToBeDeleted = data;
        }
      }]
    });
    alert.present();
  }

}
