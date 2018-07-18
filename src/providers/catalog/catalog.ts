import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { PapaParseService } from 'ngx-papaparse';
import { LoaderProvider } from '../loader/loader';
import { AlertProvider } from '../alert/alert';

/*
  Generated class for the CatalogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CatalogProvider {

  catalogData: any[];
  selectedShopId: number;
  productsDeleted: any[] = [];
  updatedProductList: any[] = [];
  deleteConfirmed: boolean = false;

  constructor(private http: HttpServiceProvider, private papa: PapaParseService, private loader: LoaderProvider) {
    console.log('Hello CatalogProvider Provider');
  }

  getAllProducts(shopId) {
    return this.http.get("v2/dashboard/subscription/getSubscriptionData/shop/" + shopId)
  }


  addOrUpdateSubscriptionData(shopId, product_list) {
    let formData = {
      "shopId": shopId,
      "subscriptionProducts": product_list
    }
    console.log(formData);
    return this.http.put('v2/dashboard/subscription/addOrUpdateSubscriptionData', formData)
  }




  removeProduct(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }

    return array;
  }

  // convert csv to json
  convertCatalogCsvToJson(file, shopId) {
    let data = [];
    let promise = new Promise((resolve,reject)=>{
      this.papa.parse(file, {
        complete: (results: any, file) => {
          console.log('Parsed: ', results); 
          data = this.generateProductData(results.data, shopId);
          if(data.length>0){
            resolve(data);
          }else{
            reject("Check your csv before uploading.BarcodeId,sku,category,subcategory are mandatory!")
          }
          
        }
      });
    
    })
    return promise;
  }

  generateProductData(data, shopId) {
    console.log('inside geneerate csv')
    this.loader.showWithContent("Processing your file..");    
    let jsonData = [];
    let isIncorrectFormat:boolean=false;
    for (let i = 1; i < data.length; i++) {
      let row = data[i];
      let obj: any = {};
      obj.barcodeId = row[0];
      obj.sku = row[1];
      obj.name = row[2];
      obj.amount = row[3];
      obj.category = row[4];
      obj.categoryImage = row[5];
      obj.subCategory = row[6];
      obj.image = row[7];
      if (row[8] && row[8] != null) {
        obj.isPerishable = row[8]
      } else {
        obj.isPerishable = false;
      }
      obj.shopId = shopId;

      if(row[0]==null || row[0]==""){
       alert('Enter a valid barcode.Check row number '+(i+1));
       isIncorrectFormat=true;
       break;
      }

      else if(row[1]==null || row[1]==""){
        alert('Enter a valid sku.Check row number'+(i+1));
        isIncorrectFormat=true;
        break;
      }

      else if((row[3]!=null || row[3]!="")&& typeof(row[3])==='number'){
        alert('Enter a valid amount.Check row number'+(i+1))
        isIncorrectFormat=true;
        break;
      }

      else if((row[4]==null || row[4]=="")){
        alert('Enter a valid category.Check row number '+(i+1));
        isIncorrectFormat=true;
        break;
      }

      else if((row[6]==null || row[6]=="")){
        alert('Enter a valid sub category.Check row number '+(i+1));
        isIncorrectFormat=true;
        break;
      }
      
      console.log(isIncorrectFormat,i+1);
      jsonData.push(obj);
    }
    this.loader.hide();
    // if(this.saveData){
    //  this.enableSave = true;
    // }
    if(isIncorrectFormat){
      jsonData=[]
    }
    return jsonData;
  }
}
