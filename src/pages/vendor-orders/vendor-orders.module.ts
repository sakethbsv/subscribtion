import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorOrdersPage } from './vendor-orders';

@NgModule({
  declarations: [
    VendorOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorOrdersPage),
  ],
})
export class VendorOrdersPageModule {}
