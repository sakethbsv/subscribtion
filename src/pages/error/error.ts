import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  errors: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.errors = navParams.get('errors');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorPage');
  }

}
