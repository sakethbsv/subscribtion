import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PapaParseService } from 'ngx-papaparse';
import { AlertProvider } from '../../providers/alert/alert';
import { CatalogProvider } from '../../providers/catalog/catalog';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderProvider } from '../../providers/loader/loader';

/**
 * Generated class for the CsvmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-csvmodal',
  templateUrl: 'csvmodal.html',
})
export class CsvmodalPage {
  file: File;
  parsedFileData:any[];
  saveData:boolean;
  enableSave:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private papa: PapaParseService,private alert:AlertProvider,private catalog:CatalogProvider,private loader:LoaderProvider) {
    this.parsedFileData = [];
    this.saveData=false;
    this.enableSave=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CsvmodalPage');
  }

  changeListener($event){
    this.file = $event.target.files[0];
   
    console.log(this.file)
    this.papa.parse(this.file,{
      complete: (results:any, file) => {
          console.log('Parsed: ', results);
         
          this.generateProductData(results.data);
          
      }
  });
  }

  generateProductData(data){
    this.loader.showWithContent("Processing your file..");
    for(let i=1;i<data.length-1;i++){
      let row = data[i];
      let obj:any={};
      obj.sku = row[0];
      obj.barcodeId = row[1];
      obj.name = row[2];
      obj.image = row[3];
      obj.category = row[4];
      obj.categoryImage = row[5];
      obj.subCategory = row[6];
      obj.price = row[7];
      obj.delete = row[8];
      console.log(obj);
      if(obj.barcodeId!=null && obj.sku!=null && obj.category!=null && obj.subCategory!=null){
        this.parsedFileData.push(obj);
        this.saveData = true;
      }else{
        this.alert.errorAlert('Sku,Barcode,Category,Subcategory are required.Check again!')
        this.saveData = false;
        this.loader.hide();
        break;
      }
      
    }
    this.loader.hide();
    if(this.saveData){
     this.catalog.catalogData = this.parsedFileData;
     this.enableSave = true;
    }
  }

  save(){
    this.catalog.addOrUpdateSubscriptionData(this.catalog.selectedShopId,this.parsedFileData).subscribe((data:any)=>{

    },(err:HttpErrorResponse)=>{
      this.loader.hide();
      this.alert.errorAlert("Something went wrong. Check your csv file before uploading!")
    },()=>{
      this.loader.hide();
    })
  }

}
