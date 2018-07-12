import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { HttpErrorResponse } from '@angular/common/http';
import * as Handsontable from 'handsontable';
import { LocalDataSource } from 'ng2-smart-table';
import { StorageProvider } from '../../providers/storage/storage';
import { LoaderProvider } from '../../providers/loader/loader';
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
  dataset:any[]=[];
  settings : any;
  shopList:any[];
  shopSelected:any;
  source:any;
  create: boolean = false;
  edit:boolean = false;
  deactivate:boolean=false;
  promotionData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private promotionsProvider:PromotionsProvider,private storage:StorageProvider,private loader:LoaderProvider) {
    this.promotionData={};
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
    this.promotionsProvider.getAllPromotions(shops).subscribe((data:any)=>{
      console.log("data",data);
      this.dataset = data;
      this.loader.hide();
    },(err:any)=>{
      this.loader.hide();
    })

    
  }

  updatePromotions(data){
    console.log('Promotion To Update',data);
   
    this.promotionsProvider.updatePromotion(data).subscribe((promotionData:any)=>{
      console.log('data',promotionData);
      this.viewPromotions(this.shopSelected);
      this.create = false;
      this.edit = false;
      this.deactivate = false;
      this.loader.hide();
    },(err:HttpErrorResponse)=>{
      this.loader.hide();
    })
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

  editPromotion(promotion){
    this.edit = true;
    this.create = false;
    this.promotionData = promotion;
    
  }

  deactivatePromotion(promotion){
    promotion.active = false;
    this.deactivate = true;
    this.updatePromotions(promotion);
  }

  save(promotionData,shops){
    if(this.create){
      this.createPromotion(promotionData,shops)
    }else if(this.edit){
      this.updatePromotions(promotionData);
    }
    
  }


  createPromotion(promotionData,shops){
    promotionData.dataId="SUBSCRIPTIONPROMODUMMY_"+new Date();
    promotionData.datatype="NONE";
    promotionData.type="SUBSCRIPTION";
    promotionData.accessibleLocations=[shops];
    promotionData.active=true;
    this.updatePromotions(promotionData);
  }








}
