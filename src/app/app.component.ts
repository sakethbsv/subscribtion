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
import { FareyeDeliveriesPage } from '../pages/fareye-deliveries/fareye-deliveries';
import { AuthProvider } from '../providers/auth/auth';

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
  pages:any[]=[]
  

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: StorageProvider, public splitPane: SplitpaneProvider, private daterangepickerOptions: DaterangepickerConfig, private app: App, private menuCtrl: MenuController,private auth:AuthProvider) {
    
    this.admin = {};
    this.navCtrl = app.getActiveNav();
    this.storage.getValue('admin').then((data: any) => {
      console.log(data);
      if (data != null) {
        this.admin = data.admin;
        
        this.adminRoles = data.authenticationDetails.roles;
        this.rootPage = HomePage;
        this.splitPane.setSplitPane(true);
        // set navigation based on admin roles



      } else {
        this.rootPage = LoginPage;
      }
    }, () => {
      console.log('data');
      this.rootPage = LoginPage;
    })

   

    // used for an example of ngFor and navigation

    // configuring date range
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      ranges: {
        'Today': [moment().startOf('day'), moment().startOf('day')],
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
      console.log('i am called first');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

setMenu(admin){
  console.log(admin)
  console.log(admin.rolesMap.LS)
  console.log(admin.pages)
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

  deliveryStatus(){
    this.nav.setRoot(FareyeDeliveriesPage);
  }



  logout() {
    this.storage.clearItem();
    this.menuCtrl.close();
    this.app.getRootNav().setRoot(LoginPage)

  }


}
