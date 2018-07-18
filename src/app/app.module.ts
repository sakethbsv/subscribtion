
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import {TableModule} from 'primeng/table';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
import { CatalogPage } from '../pages/catalog/catalog';
import { CatalogProvider } from '../providers/catalog/catalog';
import { ButtonViewPage } from '../pages/button-view/button-view';
import { SplitpaneProvider } from '../providers/splitpane/splitpane';
import { SubscribtiondetailPage } from '../pages/subscribtiondetail/subscribtiondetail';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FulfillmentDetailPage } from '../pages/fulfillment-detail/fulfillment-detail';
import { LoaderProvider } from '../providers/loader/loader';
import { AlertProvider } from '../providers/alert/alert';
import { CsvmodalPage } from '../pages/csvmodal/csvmodal';
import { ModalProvider } from '../providers/modal/modal';
import { PapaParseModule } from 'ngx-papaparse';
import { DeleteconfirmationPage } from '../pages/deleteconfirmation/deleteconfirmation';
import { PromotionsProvider } from '../providers/promotions/promotions';
import { PromotionsPage } from '../pages/promotions/promotions';
import { InventoryPage } from '../pages/inventory/inventory';
import { InventoryProvider } from '../providers/inventory/inventory';
import {DialogModule} from 'primeng/dialog';
import {GrowlModule} from 'primeng/growl';
import {FileUploadModule} from 'primeng/fileupload';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollProvider } from '../providers/scroll/scroll';
import { ErrorPage } from '../pages/error/error';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    OrdersPage,
    CatalogPage,
    ButtonViewPage,
    SubscribtiondetailPage,
    FulfillmentDetailPage,
    CsvmodalPage,
    DeleteconfirmationPage,
    PromotionsPage,
    InventoryPage,
    ErrorPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    Daterangepicker,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage','websql', 'sqlite', 'indexeddb']
    }),
    HttpClientModule,
    TableModule,
    PapaParseModule,
    GrowlModule,
    FileUploadModule,
    ScrollToModule.forRoot(),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    OrdersPage,
    ButtonViewPage,
    CatalogPage,
    SubscribtiondetailPage,
    FulfillmentDetailPage,
    CsvmodalPage,
    DeleteconfirmationPage,
    PromotionsPage,
    InventoryPage,
    ErrorPage

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
    CatalogProvider,
    SplitpaneProvider,
    LoaderProvider,
    ScrollProvider,
    AlertProvider,
    ModalProvider,
    PromotionsProvider,
    InventoryProvider
    
    
  ]
})
export class AppModule {}
