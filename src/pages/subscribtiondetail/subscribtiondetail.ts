import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { ViewCell } from 'ng2-smart-table';
import { FulfillmentDetailPage } from '../fulfillment-detail/fulfillment-detail';

/**
 * Generated class for the SubscribtiondetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscribtiondetail',
  templateUrl: 'subscribtiondetail.html',
})
export class SubscribtiondetailPage implements ViewCell,OnInit{
  renderValue: string;

  @Input() value: string ;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private modal:ModalController){

  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    console.log(this.rowData);
    
    this.modal.create(FulfillmentDetailPage,{'fulfillmentDetail':this.rowData}).present();
    this.save.emit(this.rowData);
  }


}
