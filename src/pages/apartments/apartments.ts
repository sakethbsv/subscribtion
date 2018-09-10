import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopProvider } from '../../providers/shop/shop';
import { ApartmentsProvider } from '../../providers/apartments/apartments';
import { ModalProvider } from '../../providers/modal/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { LoaderProvider } from '../../providers/loader/loader';

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

  shopList: any[] = [];
  shopSelected: any;
  apartments: any[] = [];
  cols: any[] = [];
  displayDialog: boolean = false;
  apartment: any = {};
  newApartment: boolean = false;
  editedApartment: any;
  msgs: any[] = [];
  formError: any = {};
  todo: any;
  apartmentCatalogErrorData: any[];
  selectedApartments: any;
  uploadApartments: boolean = false;
  apartmentFormError: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private shopProvider: ShopProvider, private apartmentProvider: ApartmentsProvider, private modalProvider: ModalProvider, private errorHandler: ErrorHandlerServiceProvider, private loader: LoaderProvider) {
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
    this.shopProvider.getAdminShopList().then((data: any) => {
      this.shopList = data;
      this.viewApartment(44);
      this.shopSelected = 44;
    }, (err: any) => {
      console.log('Error while fetching the shoplist', err);
    })
  }

  /* 
  * Fetch all apartment details */
  viewApartment(shopSelected) {
    this.apartmentProvider.getApartments(shopSelected).subscribe((data: any) => {
      this.apartments = data;
      this.apartmentProvider.setApartments(data);
      this.uploadApartments=false;
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }

  /* Add new apartment */
  showDialog() {
    this.newApartment = true;
    this.displayDialog = true;
    this.apartment = {}
    this.apartmentFormError = {};
  }

  /* Edit */
  editApartment(rowData) {
    this.apartmentFormError = {};
    console.log(rowData);
    this.editedApartment = rowData;
    this.newApartment = false;
    this.apartment = this.cloneApartment(rowData);
    this.displayDialog = true;
  }

  save() {
    if (this.validateApartmentData(this.apartment)) {
      this.addOrUpdateApartment();
    }
  }

  validateApartmentData(apartmentObj) {
    let validForm = true;
    this.apartmentFormError = {};
    console.log(apartmentObj)
   // let latLongRegex = '^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}';
    let postalRegex = '^[1-9][0-9]{5}$';
    if (apartmentObj.apartmentDisplayName == null || apartmentObj.apartmentDisplayName == "") {
      this.apartmentFormError.apartmentDisplayName = "Apartment Name is required !";
      validForm = false;
    }
    if (apartmentObj.postalCode == null || apartmentObj.postalCode == "") {
      this.apartmentFormError.postalCode = "Postal Code is required !";
      validForm = false;
    }
    if (apartmentObj.postalCode != null && apartmentObj.postalCode.match(postalRegex) == null) {
      this.apartmentFormError.postalCode = "Enter a valid 6 digit postal code !";
      validForm = false;
    }
    if (apartmentObj.addressLine1 == null || apartmentObj.addressLine1 == "") {
      this.apartmentFormError.addressLine1 = "Address is required !";
      validForm = false;
    }
    if (apartmentObj.addressLine2 == null || apartmentObj.addressLine2 == "") {
      this.apartmentFormError.addressLine2 = "Address is required !";
      validForm = false;
    }
    /*if (apartmentObj.landMark == null || apartmentObj.landMark == "") {
      this.apartmentFormError.landMark = "Landmark is required !";
      validForm = false;
    }*/
    if (apartmentObj.city == null || apartmentObj.city == "") {
      this.apartmentFormError.city = "City is required !";
      validForm = false;
    }
    if (apartmentObj.state == null || apartmentObj.state == "") {
      this.apartmentFormError.state = "State is required !";
      validForm = false;
    }
    if (apartmentObj.country == null || apartmentObj.country == "") {
      this.apartmentFormError.country = "Country is required !";
      validForm = false;
    }

    if (apartmentObj.lat != null && (isNaN(apartmentObj.lat))) {
      this.apartmentFormError.lat = "Enter a valid latitude";
      validForm = false;
    }
    if (apartmentObj.lng != null && (isNaN(apartmentObj.lng))) {
      this.apartmentFormError.lng = "Enter a valid longitude";
      validForm = false;
    }

    return validForm;
  }

  addOrUpdateApartment() {
    this.msgs = [];
    this.apartmentProvider.addOrUpdateAppartment(this.apartment, this.shopSelected).subscribe((data: any) => {

      this.loader.hide();
      if (this.newApartment) {
        this.apartments = this.apartmentProvider.addAppartment(this.apartments, data);
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'New Apartment Added !!', life: 4000 });
      } else {
        this.apartments = this.apartmentProvider.editAppartment(this.apartments, data);
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Apartment Updated !. Refresh the table to view updated apartment', life: 4000 });
      }
      console.log(this.apartments);
    }, (err: any) => {
      this.loader.hide();
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to add/update apartment!', life: 4000 });

    }, () => {
      this.loader.hide();
    })

    this.displayDialog = false;

  }

  /* Delete All*/
  deleteAllApartments() {
    this.msgs = [];
    let apartmentToBeDeleted = [];
    this.apartments.forEach(apartment => {
      apartment.delete = true;
      apartmentToBeDeleted.push(apartment);
    });
    this.apartmentProvider.deleteAll(apartmentToBeDeleted, this.shopSelected).subscribe((data: any) => {
      this.apartments = [];
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'All apartments deleted !', life: 4000 });
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to delete apartments', life: 4000 });
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }

  deleteApartment(apartment) {
    let apartmentToDelete = {} = apartment;
    apartmentToDelete.delete = true;
    this.msgs = [];
    this.apartmentProvider.addOrUpdateAppartment(apartmentToDelete, this.shopSelected).subscribe((data: any) => {
      this.apartments = this.apartmentProvider.delete(apartment);
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Apartment deleted successfuly !', life: 4000 });
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to delete apartment!', life: 4000 });
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }

  deleteApartments() {
    this.msgs = [];
    this.selectedApartments.forEach(element => {
      element.delete = true;
    });
    this.apartmentProvider.deleteSelectedApartment(this.apartments, this.selectedApartments, this.shopSelected).subscribe((data: any) => {
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Selected apartments deleted !', life: 4000 });
      this.apartments = this.apartmentProvider.removeApartments(this.apartments, this.selectedApartments)
    }, (err: HttpErrorResponse) => {
      this.errorHandler.error(err);
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unable to delete selected apartments', life: 4000 });
      this.loader.hide();
    }, () => {
      this.loader.hide();
    })
  }


  uploadApartment() {

  }

  bulkUploadApartment(event) {
    this.msgs = [];
    console.log(event.files[0]);
    this.apartmentCatalogErrorData = [];
    this.apartmentProvider.convertCatalogCsvToJson(event.files[0], this.shopSelected, this.apartmentCatalogErrorData).then((data: any) => {
      console.log(data);
      let newApartmentData = data;
      this.apartmentProvider.addAppartments(data, this.shopSelected).subscribe((data: any) => {
        this.uploadApartments = false;
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Apartments updloaded !!. Refresh the table.  ', life: 6000 });
        
      }, (err: HttpErrorResponse) => {
        this.errorHandler.error(err);
        this.loader.hide();
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error while uploading !', life: 4000 });
      }, () => {
        this.loader.hide();
      })
    }, (err: any) => {
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

  onRowUnselect(event) {
    console.log(event.data);
    console.log(this.selectedApartments)
    if (this.selectedApartments.length > 0) {

    } else {
      this.selectedApartments = null;
    }
  }


}
