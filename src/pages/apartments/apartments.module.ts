import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApartmentsPage } from './apartments';

@NgModule({
  declarations: [
    ApartmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApartmentsPage),
  ],
})
export class ApartmentsPageModule {}
