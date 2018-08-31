import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';

export class User{
  name:string;
  email:string;
  role:any;
  menus:any[];
}

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

user:User;

  constructor(public storage: StorageProvider) {
    console.log('Hello AuthProvider Provider');
    this.isLoggedIn();
  }

  setUser(name,email,role){
    // this.user.name=name;
    // this.user.email=email;
    // this.user.role=role;
  }

  isLoggedIn(){
    let admin:any;

    console.log(admin)

  }

}
