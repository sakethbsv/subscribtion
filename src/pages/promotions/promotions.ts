import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Handsontable from 'handsontable'
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { HttpErrorResponse } from '@angular/common/http';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private promotionsProvider:PromotionsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
    this.fetchAllPromotions();
  }

  fetchAllPromotions(){
    this.promotionsProvider.getAllPromotions().subscribe((data:any)=>{
      console.log("data",data);
      this.dataset = data;
    },(err:any)=>{

    })
  }

  updatePromotions(data){
   
    this.promotionsProvider.updatePromotion(data).subscribe((data:any)=>{
      console.log('data',data);
    },(err:HttpErrorResponse)=>{

    })
  }

}
