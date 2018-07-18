import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {

  loading: any;
  isLoaderPresent: boolean = false;
  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');

  }


  show() {
    if (!this.isLoaderPresent) {
      this.loading = this.loadingCtrl.create({
        content: "Please wait...",
        enableBackdropDismiss: false
      });
      this.loading.present();
      this.isLoaderPresent = true;
    }
  }

  showWithContent(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
    });
    this.loading.present();
    this.isLoaderPresent = true;
  }

  hide() {
    if (this.isLoaderPresent) {
      this.loading.dismiss();
      this.isLoaderPresent = false;
    }
  }

  checkIfPresent() {
    return this.loading.present();
  }

}
