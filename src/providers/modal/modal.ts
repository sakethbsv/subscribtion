import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CsvmodalPage } from '../../pages/csvmodal/csvmodal';
import { DeleteconfirmationPage } from '../../pages/deleteconfirmation/deleteconfirmation';
import { CatalogProvider } from '../catalog/catalog';
import { FulfillmentDetailPage } from '../../pages/fulfillment-detail/fulfillment-detail';
import { ErrorPage } from '../../pages/error/error';
import { PrintChallanPage } from '../../pages/print-challan/print-challan';

/*
  Generated class for the ModalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModalProvider {

  deleteModal:any;

  constructor(public modal: ModalController,public catalogProvider:CatalogProvider) {
    console.log('Hello ModalProvider Provider');
  }

  showFileUploadModal(shopId){
    let profileModal = this.modal.create(CsvmodalPage,{'shopId':shopId});
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  deleteConfirmationModal(data){
    this.deleteModal = this.modal.create(DeleteconfirmationPage,{'data':data});
    this.deleteModal.onDidDismiss(() => {
    });
    this.deleteModal.present();
   
  }

  dismissDeleteModal(){
    this.deleteModal.dismiss();
  }
  
  showSubscriptionDetails(data){
    console.log(data);
    let subscriptionModal = this.modal.create(FulfillmentDetailPage,{'fulfillmentDetail':data});
    subscriptionModal.onDidDismiss(() => {
    })

    subscriptionModal.present();
  }

  showCatalogUploadErr(data){
    console.log(data);
    let subscriptionModal = this.modal.create(ErrorPage,{'catalogErr':data});
    subscriptionModal.onDidDismiss(() => {
    })

    subscriptionModal.present();
  }

  // Print Challan
  showPrintChallan(orderId){
    let challanModal = this.modal.create(PrintChallanPage,{'orderId':orderId});
    challanModal.onDidDismiss(() => {
    })
    challanModal.present();
  }

}
