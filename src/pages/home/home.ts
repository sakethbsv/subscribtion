import { OrdersPage } from '../../pages/orders/orders';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  ordersList : any[];

  constructor(public navCtrl: NavController) {

  }

  getOrderDetails(){
     
    this.navCtrl.push(OrdersPage);
  }

}
