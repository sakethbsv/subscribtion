import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopProvider } from '../../providers/shop/shop';
import { ApartmentsProvider } from '../../providers/apartments/apartments';
import { ModalProvider } from '../../providers/modal/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { LoaderProvider } from '../../providers/loader/loader';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the ApartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apartments',
  templateUrl: 'apartments.html',
})
export class ApartmentsPage {

  shopList:any[]=[];
  shopSelected:any;
  apartments:any[]=[];
  cols:any[]=[];
  displayDialog: boolean=false;
  apartment:any={};
  newApartment: boolean=false;
  editedApartment: any;
  msgs:any[]=[];
  formError:any={};
  todo:any;
  apartmentCatalogErrorData: any[];
  selectedApartments:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private shopProvider:ShopProvider,private apartmentProvider:ApartmentsProvider,private modalProvider:ModalProvider,private errorHandler:ErrorHandlerServiceProvider,private loader:LoaderProvider,private alert:AlertProvider) {
    this.cols = [
      { field: 'apartmentId', header: 'Apartment Id' },
      { field: 'apartmentDisplayName', header: 'Apartment Name' },
      { field: 'lat', header: 'Latitude' },
      { field: 'lng', header: 'Longitude' },
      { field: 'addressLine1', header: 'Address Line 1' },
      { field: 'addressLine2', header: 'Address Line 2' },
      { field: 'landMark', header: 'Landmark' },
      { field: 'city', header: 'city' },
      { field: 'postalCode', header: 'postal code' },
      { field: 'state', header: 'state' },
      { field: 'country', header: 'country' }
  ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApartmentsPage');
    this.shopProvider.getAdminShopList().then((data:any)=>{
      this.shopList = data;
    },(err:any)=>{
      console.log('Error while fetching the shoplist',err);
    })
  }

  /* 
  * Fetch all apartment details */
 viewApartment(shopSelected){
    this.apartmentProvider.getApartments(shopSelected).subscribe((data:any)=>{
      this.apartments = data;
      this.apartmentProvider.setApartments(data);
    },(err:HttpErrorResponse)=>{
      this.errorHandler.error(err);
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
 }

 /* Add new apartment */
 showDialog(){
   this.newApartment=true;
   this.displayDialog=true; 
   this.apartment={}
 }

 /* Edit */
 editApartment(rowData){
  console.log(rowData);
    this.editedApartment = rowData;
    this.newApartment = false;
    this.apartment = this.cloneApartment(rowData);
    this.displayDialog = true;
 }

 save(){
  if(this.validateApartmentData(this.apartment)){
    this.addOrUpdateApartment();
  }
 }

 validateApartmentData(apartmentObj){
   console.log(apartmentObj)
    if(apartmentObj.apartmentDisplayName!=null && apartmentObj.apartmentDisplayName!="" 
      && apartmentObj.postalCode!=null && apartmentObj.postalCode!="" && apartmentObj.addressLine1!=null && apartmentObj.addressLine1!=""
      && apartmentObj.landMark!=null && apartmentObj.landMark!="" && apartmentObj.city!=null && apartmentObj.city!="" && apartmentObj.state!=null && apartmentObj.state!=""
      && apartmentObj.country!=null && apartmentObj.country!=""){
    return true;
  }else{
    this.alert.errorAlert("Please fill the required fields !");
    return false;
  }
 }

 addOrUpdateApartment(){
   this.msgs = [];
   this.apartmentProvider.addOrUpdateAppartment(this.apartment,this.shopSelected).subscribe((data:any)=>{
   
    this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Apartment Added !. Refresh the table to view updated products', life: 4000 });
    this.loader.hide();
       if(this.newApartment){
    this.apartments=this.apartmentProvider.addAppartment(this.apartments,data);
   }else{
     this.apartments = this.apartmentProvider.editAppartment(this.apartments,data);
     
   }
   console.log(this.apartments);
  },(err:any)=>{
    this.loader.hide();
    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to add apartment!', life: 4000 });
  
  },()=>{
     this.loader.hide();
   })

   this.displayDialog=false;
 
 }

 /* Delete All*/
 deleteAllApartments(){
   this.msgs =[];
   let apartmentToBeDeleted=[];
   this.apartments.forEach(apartment => {
     apartment.delete=true;
     apartmentToBeDeleted.push(apartment);
   });
 this.apartmentProvider.deleteAll(apartmentToBeDeleted,this.shopSelected).subscribe((data:any)=>{
  this.apartments = [];
  this.msgs.push({ severity: 'success', summary: 'Success', detail: 'All apartments deleted !', life: 4000 });
 },(err:HttpErrorResponse)=>{
  this.errorHandler.error(err);
  this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to delete apartments', life: 4000 });
  this.loader.hide();
},()=>{
  this.loader.hide();
 })
 }

 deleteApartment(apartment){
   let apartmentToDelete={}= apartment;
   apartmentToDelete.delete=true;
  this.msgs=[];
  this.apartmentProvider.addOrUpdateAppartment(apartmentToDelete,this.shopSelected).subscribe((data:any)=>{
   this.apartments = this.apartmentProvider.delete(apartment);
    this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Apartment deleted successfuly !', life: 4000 });
  },(err:HttpErrorResponse)=>{
    this.errorHandler.error(err);
    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to delete apartment!', life: 4000 });
    this.loader.hide();
  },()=>{
    this.loader.hide();
  })
 }

 deleteApartments(){
   this.msgs=[];
   this.selectedApartments.forEach(element => {
     element.delete=true;
   });
   this.apartmentProvider.deleteSelectedApartment(this.apartments,this.selectedApartments,this.shopSelected).subscribe((data:any)=>{
    this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Selected apartments deleted !', life: 4000 });
    this.apartments = this.apartmentProvider.removeApartments(this.apartments,this.selectedApartments)
  },(err:HttpErrorResponse)=>{
    this.errorHandler.error(err);
    this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to delete selected apartments', life: 4000 });
    this.loader.hide();
  },()=>{
    this.loader.hide();
   })
 }
 

 uploadApartment(){
   
 }

 bulkUploadApartment(event){
  console.log(event.files[0]);
  this.apartmentCatalogErrorData=[];
  this.apartmentProvider.convertCatalogCsvToJson(event.files[0],this.shopSelected,this.apartmentCatalogErrorData).then((data:any)=>{
    console.log(data);
    this.apartmentProvider.addAppartments(data,this.shopSelected).subscribe((data:any)=>{

    },(err:HttpErrorResponse)=>{
      this.errorHandler.error(err);
      this.loader.hide();
    },()=>{
      this.loader.hide();
    })
  },(err:any)=>{
    this.modalProvider.showCatalogUploadErr(err);
  })
 }

 cloneApartment(c: any): any {
  let apartment = {};
  for (let prop in c) {
    apartment[prop] = c[prop];
  }
  return apartment;
}


}
