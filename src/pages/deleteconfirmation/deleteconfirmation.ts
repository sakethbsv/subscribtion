import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CatalogProvider } from '../../providers/catalog/catalog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the DeleteconfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deleteconfirmation',
  templateUrl: 'deleteconfirmation.html',
})
export class DeleteconfirmationPage {

  products_to_delete: any[] = [];
  shopId: number;
  catalogData: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public catalogProvider: CatalogProvider, public loader: LoaderProvider,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteconfirmationPage');
    this.products_to_delete = this.catalogProvider.productsDeleted;
    this.shopId = this.catalogProvider.selectedShopId;
    this.catalogData = this.catalogProvider.catalogData;
    console.log(this.products_to_delete);
    console.log(this.catalogProvider.selectedShopId)
    console.log(this.catalogData);
  }

  delete() {
    this.catalogProvider.addOrUpdateSubscriptionData(this.shopId, this.products_to_delete).subscribe((data: any) => {

    }, (err: HttpErrorResponse) => {
      if (err.status == 200) {
        for (let i = this.products_to_delete.length; i >=0; i--) {
          const element = this.products_to_delete[i];
         this.catalogProvider.catalogData = this.catalogProvider.removeProduct(this.catalogData,element);
          
        }
        this.catalogProvider.deleteConfirmed=true;
      }
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }

 close(){
   this.viewCtrl.dismiss({})
 }



 



}
