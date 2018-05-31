import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
/*
  Generated class for the SplitpaneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SplitpaneProvider {
  splitPaneState: boolean;
  constructor(public platform: Platform) {
    console.log('Hello SplitpaneProvider Provider');
    this.splitPaneState = false;
  }

  setSplitPane(state: boolean) {
    if (this.platform.width() > 768) {
      this.splitPaneState = state;
    } else {
      this.splitPaneState = false;
    }
  }
  getSplitPane() {
    return this.splitPaneState;
  }

}
