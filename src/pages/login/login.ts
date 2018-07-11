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

  constructor(public navCtrl:NavController, public loginService:LoginServiceProvider,public errorService:ErrorHandlerServiceProvider,public storage:StorageProvider,public app:MyApp,public splitPane:SplitpaneProvider,public loader:LoaderProvider) {
    this.username='subscription@future.com'
    this.password='future';
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
     
      this.storage.setItem('admin',response);
      this.navCtrl.setRoot(HomePage);
      this.app.admin = response.admin;
    },(err:HttpErrorResponse)=>{
        console.log('err',err);
        this.loader.hide();
        this.errorService.error(err);
    },()=>{
        this.loader.hide();
    })
  }

}
