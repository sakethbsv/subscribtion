import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { HttpErrorResponse } from '@angular/common/http';
import * as Handsontable from 'handsontable';
import { LocalDataSource } from 'ng2-smart-table';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  dataset:any[];
  settings : any;
  shopList:any[];
  source:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private promotionsProvider:PromotionsProvider,private storage:StorageProvider) {
    this.settings = {
      selectMode: 'multi',
      actions: {add:true},
      add: {
        confirmCreate: true,
      },
      confirmCreate:{
        confirmCreate:false
      },
      edit: {
        confirmSave: true,
      },
      delete:{
        confirmDelete:true,
      },
      columns: {
        dataId: {
          title: 'Data Id'
        },
        datatype: {
          title: 'Data Type'
        },
        imageUrl: {
          title: 'Image Url'
        },
        accessibleLocations: {
          title: 'Locations'
        },
        active: {
          title: 'Active'
        },
        text: {
          title: 'Title'
        },

        subText: {
          title: 'Content'
        },
      },
    }; 
    this.source = new LocalDataSource(this.dataset);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PromotionsPage');
    this.getAllShops();
    
  }

  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
    })
  
  }



  viewPromotions(shops){

    this.dataset =[{
      dataId: "SUBSCRIPTIONPROMODUMMY",
      datatype: "PROMOTION",
      type: "SUBSCRIPTION_PROMOTION",
      imageUrl: "https://storage.googleapis.com/perpule-1248.appspot.com/Offers/BLR_Banner.png",
      accessibleLocations: [
      "44",
      "22"
      ],
      active: true,
      text: "Rs.100 CASHBACK paid via Paytm",
      subText: "On Subscription of Rs.1000 or above on payment via Paytm. Valid twice for new user."
      }]
     
    // this.promotionsProvider.getAllPromotions(shops).subscribe((data:any)=>{
    //   console.log("data",data);
    //   this.dataset = data;
    // },(err:any)=>{

    // })

    this.source.load(this.dataset)
  }

  updatePromotions(data){
   
    this.promotionsProvider.updatePromotion(data).subscribe((data:any)=>{
      console.log('data',data);
    },(err:HttpErrorResponse)=>{

    })
  }

  onSaveConfirm(event) {
    event.confirm.resolve(event.newData);
    this.dataset.push(event.newData);
    console.log(event.newData);

  }

  onDeleteConfirm(event){
    console.log(event);
    let index: number = this.dataset.indexOf(event.data);
    if (index !== -1) {
        this.dataset.splice(index, 1);
    }
    console.log(this.dataset);
    this.source.load(this.dataset); 
  }

  onCreateConfirm(event) {

    event.confirm.resolve(event.newData);
    this.dataset.push(event.newData);
    console.log(event.newData);
  }









}
