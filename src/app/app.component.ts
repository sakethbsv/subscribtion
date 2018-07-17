import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  admin:any;
  color:any;
 

  pages: Array<{title: string, component: any,icon:any,bg_color:any,color:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public storage:StorageProvider,public splitPane:SplitpaneProvider,private daterangepickerOptions: DaterangepickerConfig ) {
    this.initializeApp();
    this.admin={}

    this.storage.getItem('admin').then((data:any)=>{
      if(data!=null){
        //this.openPage(HomePage)
        this.admin=data.admin;
        console.log(this.admin);
        console.log(data);
        this.rootPage=HomePage;
        this.splitPane.setSplitPane(true);
        
      }else{
        this.rootPage = LoginPage;
      }
    },() => {
        this.rootPage = LoginPage;
      })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage,icon:'home',bg_color:'secondary',color:'primary' },
      { title: 'Orders', component: OrdersPage,icon:'cart',bg_color:'secondary',color:'primary' },
      { title: 'Catalog', component: CatalogPage,icon:'list',bg_color:'secondary',color:'primary' },
      { title: 'Banners', component: PromotionsPage,icon:'list',bg_color:'secondary',color:'primary' },
      { title: 'Required Stock', component: InventoryPage,icon:'cube',bg_color:'secondary',color:'primary' }
    ];


    // configuring date range
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false
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
    
      if(p.title==page.title)
      {
        p.color='secondary';
      }
      else
      {
        p.color='primary';
      }
      
      }
  }



  logout(){
    this.storage.clearItem();
    this.nav.setRoot(LoginPage);
  }
}
