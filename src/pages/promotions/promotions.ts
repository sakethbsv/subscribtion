import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { StorageProvider } from '../../providers/storage/storage';
import { LoaderProvider } from '../../providers/loader/loader';
import { AlertProvider } from '../../providers/alert/alert';
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
  showEditPanel = false;
  viewPromotionsFlag : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private promotionsProvider:PromotionsProvider,private storage:StorageProvider,private loader:LoaderProvider, public alert : AlertProvider) {
   
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PromotionsPage');
    this.getAllShops();
    
  }

  getAllShops() {
    this.storage.getItem('admin').then((data: any) => {
      this.shopList = data.admin.shopList;
      if (this.shopList != undefined && this.shopList != null && this.shopList.length > 0) {
        this.shopSelected = this.shopList[0].shopId;
      }
    })
  
  }



  viewPromotions(shops){     
    this.promotionsProvider.getAllPromotions(shops).subscribe((data:any)=>{
      console.log("data",data);
      this.dataset = data;
      this.loader.hide();
    },() => {
        this.loader.hide();
      })

    
  }

  updatePromotions(data){
    console.log('Promotion To Update',data);
    let formData = {};
    formData = {
      "dataId":data.dataId,
      "datatype":data.datatype,
      "type":data.type, 
      "imageUrl":data.imageUrl,
      "accessibleLocations":data.accessibleLocations,
      "active":data.active,
      "text": data.text,
      "subText":data.subText
  }
   
    this.promotionsProvider.updatePromotion(formData).subscribe((promotionData:any)=>{
      console.log('data',promotionData);
      this.viewPromotions(this.shopSelected);
      this.create = false;
      this.edit = false;
      this.deactivate = false;
      this.loader.hide();
    },() => {
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

    this.alert.deletePromotion().then((data : any) => {
      promotion.active = false;
      this.deactivate = true;
      this.updatePromotions(promotion);
    }, (err : any) => {

    })
  }

  save(promotionData,shops){
    if(this.create){
      this.createPromotion(promotionData,shops)
    }else if(this.edit){
      this.updatePromotions(promotionData);
    }
    
  }


  createPromotion(promotionData,shops){
    promotionData.dataId="SUBSCRIPTIONPROMODUMMY_"+new Date().getTime();
    promotionData.datatype="NONE";
    promotionData.type="SUBSCRIPTION";
    promotionData.accessibleLocations=[shops];
    promotionData.active=true;
    this.updatePromotions(promotionData);
  }

  clearPromoion(promotionData){
    promotionData.text="";
    promotionData.subText="";
    promotionData.imageUrl="";
  }


addPromotion(){
  this.create = true;
  this.showEditPanel = !this.showEditPanel;
  this.promotionData={};
}



}
