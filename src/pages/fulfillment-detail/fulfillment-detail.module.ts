import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FulfillmentDetailPage } from './fulfillment-detail';

@NgModule({
  declarations: [
    FulfillmentDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FulfillmentDetailPage),
  ],
})
export class FulfillmentDetailPageModule {}
