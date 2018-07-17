import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {ViewCell} from 'ng2-smart-table';
import { FulfillmentDetailsProvider } from '../../providers/fulfillment-details/fulfillment-details';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the ButtonViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-button-view',
  templateUrl: 'button-view.html',
})
export class ButtonViewPage implements ViewCell, OnInit{

  renderValue: string;

  @Input() value: string ;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  constructor(public fulfillmentService:FulfillmentDetailsProvider,private loader:LoaderProvider){

  }
  onClick() {
    console.log(this.rowData);
    if(this.rowData.status=="PENDING"){
      this.rowData.status="FULFILLED";
      this.value = this.rowData.status;
    }
    
    this.fulfillmentService.updateFulfillmentStatus(this.rowData).subscribe(() => {
      console.log(this.value);
      this.save.emit(this.rowData);
    },(err:HttpErrorResponse)=>{
      console.log('err');
      if(err.status==200){
        console.log(this.value);
        
      }else{
        this.value ='PENDING';
      }
      this.save.emit(this.rowData);
      this.loader.hide();
    },()=>{
      console.log('Completed');
      this.loader.hide();
    })
    
  }

}
