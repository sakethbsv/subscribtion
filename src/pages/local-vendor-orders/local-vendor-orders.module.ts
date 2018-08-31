import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalVendorOrdersPage } from './local-vendor-orders';

@NgModule({
  declarations: [
    LocalVendorOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalVendorOrdersPage),
  ],
})
export class LocalVendorOrdersPageModule {}
