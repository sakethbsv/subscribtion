import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalvendorOrdersPage } from './localvendor-orders';

@NgModule({
  declarations: [
    LocalvendorOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalvendorOrdersPage),
  ],
})
export class LocalvendorOrdersPageModule {}
