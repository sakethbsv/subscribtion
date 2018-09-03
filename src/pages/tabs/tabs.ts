import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';
import { InventoryPage } from '../inventory/inventory';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any;
  tab2:any;
  tab3: typeof InventoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = HomePage;
    this.tab2 = OrdersPage;
    this.tab3 = InventoryPage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
