
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OrdersPage } from '../pages/orders/orders';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FulfillmentDetailsProvider } from '../providers/fulfillment-details/fulfillment-details';
import { ErrorHandlerServiceProvider } from '../providers/error-handler-service/error-handler-service';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { StorageProvider } from '../providers/storage/storage';
import { Ng2SmartTableModule } from 'ng2-smart-table/ng2-smart-table.module';
import { CatalogPage } from '../pages/catalog/catalog';
import { CatalogProvider } from '../providers/catalog/catalog';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    OrdersPage,
    CatalogPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage','websql', 'sqlite', 'indexeddb']
    }),
    HttpClientModule,
    Ng2SmartTableModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    OrdersPage,
    CatalogPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    FulfillmentDetailsProvider,
    LoginServiceProvider,
    ErrorHandlerServiceProvider,
    NativeStorage,
    StorageProvider,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorProvider,
      multi:true
    },
    CatalogProvider
    
  ]
})
export class AppModule {}
