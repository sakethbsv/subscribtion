import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { PapaParseService } from 'ngx-papaparse';
import { LoaderProvider } from '../loader/loader';

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
  convertCatalogCsvToJson(file, shopId, errorData) {
    let data = [];
    let promise = new Promise((resolve, reject) => {
      this.papa.parse(file, {
        complete: (results: any, file) => {
          console.log('Parsed: ', results);
          data = this.generateProductData(results.data, shopId, errorData);
          console.log(data);
          console.log(errorData);
          if (data == null) {
            reject(errorData);
          } else {
            resolve(data);
          }
        }
      });
    })
    return promise;
  }

  generateProductData(data, shopId, errorData) {
    this.loader.showWithContent("Processing your file..");
    var imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    let jsonData = [];
    let rowNo = 0;

    console.log(data);
    console.log(data.length);
    for (let i = 1; i < data.length; i++) {
      if (data[i] == "") {
        continue;
      }
      let row = data[i];
      let obj: any = {};
      obj.isPerishable = false;
      obj.barcodeId = row[0];
      obj.sku = row[1];
      obj.name = row[2];
      //obj.amount = row[3];
      obj.category = row[3];
      obj.categoryImage = row[4];
      obj.subCategory = row[5];
      obj.image = row[6];
      if (row[7] && row[7] != null && row[7]!="") {
        obj.amount = Number(row[7]) ;
      }
      obj.shopId = shopId;
      rowNo = i + 1;



      if (obj.barcodeId == null || obj.barcodeId == "") {
        errorData.push("BarcodeId is missing in row number :" + (rowNo));
      }
      if (obj.barcodeId != null && (isNaN(obj.barcodeId) || obj.barcodeId < 0)) {
        errorData.push("Enter Numberic Barcode Id in row number :" + (rowNo));
      }
      if (((obj.amount) != null && obj.amount != "")) {
        if (isNaN(obj.amount) || obj.amount < 1) {
          errorData.push("Enter a valid amount in row number :" + (rowNo));
        }
      }
      if (obj.sku == null || obj.sku == "") {
        errorData.push("Sku is missing in row number :" + (rowNo));
      }
      if (obj.category == null || obj.category == "") {
        errorData.push("Category is missing in row number :" + (rowNo));
      }
      if (obj.subCategory == null || obj.subCategory == "") {
        errorData.push("Sub category is missing in row number :" + (rowNo));
      }

      if (obj.image != null && obj.image.match(imageRegex) == null) {
        errorData.push("Enter a valid image url in row number :" + (rowNo));
      }

      if (obj.categoryImage != null && obj.categoryImage.match(imageRegex) == null) {
        errorData.push("Enter a valid category image url in row number :" + (rowNo));
      }


      jsonData.push(obj);

    }
    this.loader.hide();

    if (errorData.length > 0) {
      return null;
    } else {
      return jsonData;
    }

  }
}
