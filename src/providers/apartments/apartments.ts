
import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { HttpServiceProvider } from '../http-service/http-service';

/*
  Generated class for the ApartmentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApartmentsProvider {

  apartments:any[]=[]

  constructor(public http: HttpServiceProvider,private papa: PapaParseService) {
    console.log('Hello ApartmentsProvider Provider');
  }

  getApartments(shopSelected){
    // return this.apartments;
    return this.http.get("v2/dashboard/subscription/shop/"+shopSelected+"/fetchApartments");
  }

  setApartments(data){
    this.apartments=data;
  }

  addAppartment(apartments,obj):any[]{
     this.apartments=apartments;
     this.apartments.push(obj);
     return this.apartments;    
  }

  addOrUpdateAppartment(obj,shopSelected){
   return this.http.post("v2/dashboard/subscription/shop/"+shopSelected+"/addApartment",obj);
  }

  addAppartments(apartmentList,shopSelected){
    return this.http.put("v2/dashboard/subscription/shop/"+shopSelected+"/addApartments",apartmentList);
  }

  editAppartment(apartments,objToUpdate){
    this.apartments = apartments.filter(obj=>obj.apartmentId!=objToUpdate.apartmentId);
    this.apartments.push(objToUpdate);
    console.log(this.apartments);
    return this.apartments;
  }

  delete(objToDelete){
    this.apartments= this.apartments.filter(obj=>obj!==objToDelete);
    return this.apartments;
  }

  deleteSelectedApartment(apartmentList,apartmentListToDelete,shopSelected){
    return this.http.put("v2/dashboard/subscription/shop/"+shopSelected+"/deleteApartments",apartmentListToDelete);
   
  }
  removeApartments(apartmentList,apartmentListToDelete){
    this.apartments = apartmentList.filter(i=>!apartmentListToDelete.some(j=>i.apartmentId===j.apartmentId));
    return this.apartments;
  }

  deleteAll(apartmentList,shopSelected){
    return this.http.post("v2/dashboard/subscription/shop/"+shopSelected+"/addApartment",apartmentList);
  }


  convertCatalogCsvToJson(file, shopId, apartmentCatalogErrorData) {
    let data = [];
    let promise = new Promise((resolve,reject)=>{
      this.papa.parse(file, {
        complete: (results: any, file) => {
          console.log('Parsed: ', results);
          data = this.validateApartmentData(results.data, shopId, apartmentCatalogErrorData);
          console.log(data);
          if(data == null){
            reject(apartmentCatalogErrorData);
          } else {
            resolve(data);
          }
        }
      });
    })
    return promise;
  }

  validateApartmentData(jsonData,shopId, apartmentCatalogErrorData) {
    let rowNo:number=0;
    let apartmentJsonData:any[]=[];
    let postalRegex='^[1-9][0-9]{5}$';
    let latLongRegex = '^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$';

   for(var i=1;i<jsonData.length;i++){
    if (jsonData[i] == "") {
      continue;
    }
      rowNo=i;
      let row = jsonData[i];
      let obj: any = {};
      obj.apartmentDisplayName=row[0];
      obj.lat=row[1];
      obj.lng=row[2];
      obj.addressLine1=row[3];
      obj.addressLine2=row[4];
      obj.landMark=row[5];
      obj.city=row[6];
      obj.state=row[7];
      obj.country=row[8];
      obj.postalCode=row[9];
      obj.delete=false;

      if(obj.apartmentDisplayName==null || obj.apartmentDisplayName==""){
        apartmentCatalogErrorData.push("Apartment name is missing in :"+ rowNo)
      }

      if(obj.addressLine1==null || obj.addressLine1==""){
        apartmentCatalogErrorData.push('Address Line 1 is missing in :'+ rowNo)
      }

      if(obj.addressLine2==null || obj.addressLine2==""){
        apartmentCatalogErrorData.push('Address Line 1 is missing in :'+ rowNo)
      }

      if(obj.city==null || obj.city==""){
        apartmentCatalogErrorData.push('City is missing in :'+ rowNo)
      }

      if(obj.state==null || obj.state==""){
        apartmentCatalogErrorData.push('state is missing in :'+ rowNo)
      }

      if(obj.country==null || obj.country==""){
        apartmentCatalogErrorData.push('country is missing in :'+ rowNo)
      }

      if(obj.postalCode==null || obj.postalCode==""){
        apartmentCatalogErrorData.push('postal code is missing in :'+ rowNo)
      }else if(obj.postalCode  && obj.postalCode.match(postalRegex)==null){
        apartmentCatalogErrorData.push('enter a valid 6 digit postal code')
      }
      if(obj.lat && (isNaN(obj.lat))){
        apartmentCatalogErrorData.push('Enter a valid latitude :'+rowNo)
      }
      if(obj.lng && (isNaN(obj.lat))){
        apartmentCatalogErrorData.push('Enter a valid longitude :'+rowNo)
      }
      console.log(obj);
      apartmentJsonData.push(obj);
   }
   console.log(apartmentJsonData);
   if(apartmentCatalogErrorData.length>0){
     return null;
   }else{
     return apartmentJsonData;
   }
  }

  getApartmentDetails(shopId){
    return this.http.get("/v2/dashboard/subscription/shop/"+shopId+"/fetchApartments")
  }

  

}
