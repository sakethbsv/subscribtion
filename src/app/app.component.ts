import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, App, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StorageProvider } from '../providers/storage/storage';
import { SplitpaneProvider } from '../providers/splitpane/splitpane';
import { OrdersPage } from '../pages/orders/orders';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { CatalogPage } from '../pages/catalog/catalog';
import { PromotionsPage } from '../pages/promotions/promotions';
import { InventoryPage } from '../pages/inventory/inventory';
import { MenuController } from 'ionic-angular';
import * as moment from 'moment';
import { ApartmentsPage } from '../pages/apartments/apartments';
import { LocalvendorOrdersPage } from '../pages/localvendor-orders/localvendor-orders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  admin: any;
  color: any;
  adminRoles: any;
  navCtrl: NavController
  pages: Array<{ title: string, component: any, icon: any, bg_color: any, color: any }>;
  HOpages: Array<{ title: string, component: any, icon: any, bg_color: any, color: any }>
  LSpages: Array<{ title: string, component: any, icon: any, bg_color: any, color: any }>

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: StorageProvider, public splitPane: SplitpaneProvider, private daterangepickerOptions: DaterangepickerConfig, private app: App, private menuCtrl: MenuController) {
    this.pages=[];
    this.admin = {};
    this.navCtrl = app.getActiveNav();
    this.storage.getItem('admin').then((data: any) => {
      console.log(data);
      if (data != null) {
        //this.openPage(HomePage)
        this.admin = data.admin;
        console.log(this.admin);
        console.log(data);
        this.adminRoles = data.authenticationDetails.roles;
        this.rootPage = HomePage;
        this.splitPane.setSplitPane(true);
        // set navigation based on admin roles
        if (data.admin.rolesMap.HO) {
          this.pages = [
            { title: 'Dashboard', component: HomePage, icon: 'home', bg_color: 'secondary', color: 'primary' },
            { title: 'Orders', component: OrdersPage, icon: 'cart', bg_color: 'secondary', color: 'primary' },
            { title: 'Required Stock', component: InventoryPage, icon: 'cube', bg_color: 'secondary', color: 'primary' },
            { title: 'Catalog', component: CatalogPage, icon: 'list', bg_color: 'secondary', color: 'primary' },
            { title: 'Banners', component: PromotionsPage, icon: 'list', bg_color: 'secondary', color: 'primary' }
          ];
        } else if (data.admin.rolesMap.LS) {
          this.pages = [
            { title: 'Dashboard', component: HomePage, icon: 'home', bg_color: 'secondary', color: 'primary' },
            { title: 'Orders', component: LocalvendorOrdersPage, icon: 'cart', bg_color: 'secondary', color: 'primary' },
            { title: 'Required Stock', component: InventoryPage, icon: 'cube', bg_color: 'secondary', color: 'primary' },
            { title: 'Catalog', component: CatalogPage, icon: 'list', bg_color: 'secondary', color: 'primary' },
            { title: 'Apartments', component: ApartmentsPage, icon: 'home', bg_color: 'secondary', color: 'primary' }
          ];
        } else {
          this.pages = [
            { title: 'Dashboard', component: HomePage, icon: 'home', bg_color: 'secondary', color: 'primary' },
            { title: 'Orders', component: OrdersPage, icon: 'cart', bg_color: 'secondary', color: 'primary' },
            { title: 'Required Stock', component: InventoryPage, icon: 'cube', bg_color: 'secondary', color: 'primary' }
          ];
        }

      } else {
        this.rootPage = LoginPage;
      }
    }, () => {
      console.log('data');
      this.rootPage = LoginPage;
    })

    this.initializeApp();

    // configuring date range
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      ranges: {
        'Today': [moment().startOf('day'), moment().startOf('day').add(1, 'day').subtract(1, 'minute')],
        'Yesterday': [moment().startOf('day').subtract(1, 'days'), moment().startOf('day').subtract(1, 'minute')],
        'Last 7 Days': [moment().startOf('day').subtract(6, 'days'), moment().startOf('day').add(1, 'days').subtract(1, 'minute')],
        'Last 30 Days': [moment().startOf('day').subtract(29, 'days'), moment().startOf('day').add(1, 'days').subtract(1, 'minute')],
        'This Month': [moment().startOf('day').startOf('month'), moment().startOf('day').add(1, 'day').subtract(1, 'minute')],
        'Last Month': [moment().startOf('day').subtract(1, 'month').startOf('month'), moment().startOf('day').subtract(1, 'month').endOf('month')]
      }


    };

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    for (let p of this.pages) {

      if (p.title == page.title) {
        p.color = 'secondary';
      }
      else {
        p.color = 'primary';
      }

    }
  }



  logout() {
    this.storage.clearItem();
    this.menuCtrl.close();
    this.app.getRootNav().setRoot(LoginPage)

  }
}
