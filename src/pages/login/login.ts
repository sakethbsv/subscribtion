import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import {  HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerServiceProvider } from '../../providers/error-handler-service/error-handler-service';
import { StorageProvider } from '../../providers/storage/storage';
import 'rxjs/add/operator/map';
import { MyApp } from '../../app/app.component';

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

  constructor(public navCtrl:NavController, public loginService:LoginServiceProvider,public errorService:ErrorHandlerServiceProvider,public storage:StorageProvider,public app:MyApp) {
    this.username = 'focus@perpule.com';
    this.password = 'focus';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
        this.errorService.error(err);
    })
  }

}
