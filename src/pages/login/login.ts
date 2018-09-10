import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import {  HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { StorageProvider } from '../../providers/storage/storage';
import 'rxjs/add/operator/map';
import { MyApp } from '../../app/app.component';
import { SplitpaneProvider } from '../../providers/splitpane/splitpane';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersPage } from '../orders/orders';
import { InventoryPage } from '../inventory/inventory';
import { CatalogPage } from '../catalog/catalog';
import { PromotionsPage } from '../promotions/promotions';
import { LocalvendorOrdersPage } from '../localvendor-orders/localvendor-orders';
import { ApartmentsPage } from '../apartments/apartments';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  admin:any;

  constructor(public navCtrl:NavController, public loginService:LoginServiceProvider,public errorService:ErrorHandlerServiceProvider,public storage:StorageProvider,public app:MyApp,public splitPane:SplitpaneProvider,public loader:LoaderProvider,private auth:AuthProvider) {
    this.username='focus@perpule.com'
    this.password='focus';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillEnter(){
   this.splitPane.setSplitPane(false);
  }
  ionViewWillLeave(){
   this.splitPane.setSplitPane(true);
  }
  login(){
    let loginData ={
      emailId:this.username,
      password:this.password
    }
    this.loginService.login(loginData)
    .subscribe((response:any)=>{
      console.log('response',response); 
      
      response.admin.pages=this.setMenu(response.admin);
      this.storage.setItem('admin',response);
      this.navCtrl.setRoot(MyApp);
      this.app.admin = response.admin;
    },(err:HttpErrorResponse)=>{
        console.log('err',err);
        this.loader.hide();
        this.errorService.error(err);
    },()=>{
        this.loader.hide();
    })
  }

  setMenu(admin){
    if (admin.rolesMap.HO) {
      admin.pages = [
        { title: 'Dashboard', component: HomePage, icon: 'home', bg_color: 'secondary', color: 'primary' },
        { title: 'Orders', component: OrdersPage, icon: 'cart', bg_color: 'secondary', color: 'primary' },
        { title: 'Required Stock', component: InventoryPage, icon: 'cube', bg_color: 'secondary', color: 'primary' },
        { title: 'Catalog', component: CatalogPage, icon: 'list', bg_color: 'secondary', color: 'primary' },
        { title: 'Banners', component: PromotionsPage, icon: 'list', bg_color: 'secondary', color: 'primary' }
      ];
    } else if (admin.rolesMap.LS) {
      admin.pages = [
        { title: 'Dashboard', component:  HomePage, icon: 'home', bg_color: 'secondary', color: 'primary' },
        { title: 'Orders', component: LocalvendorOrdersPage, icon: 'cart', bg_color: 'secondary', color: 'primary' },
        { title: 'Required Stock', component: InventoryPage, icon: 'cube', bg_color: 'secondary', color: 'primary' },
        { title: 'Catalog', component: CatalogPage, icon: 'list', bg_color: 'secondary', color: 'primary' },
        { title: 'Apartments', component: ApartmentsPage, icon: 'home', bg_color: 'secondary', color: 'primary' }
      ];
    } else if(admin) {
      admin.pages = [
        { title: 'Dashboard', component: HomePage, icon: 'home', bg_color: 'secondary', color: 'primary' },
        { title: 'Orders', component: OrdersPage, icon: 'cart', bg_color: 'secondary', color: 'primary' },
        { title: 'Required Stock', component: InventoryPage, icon: 'cube', bg_color: 'secondary', color: 'primary' }
      ];
    }

    return admin.pages;
  }

}
