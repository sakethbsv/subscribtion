import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

/*
  Generated class for the ScrollProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScrollProvider {

  constructor(private scroll:ScrollToService) {
    console.log('Hello ScrollProvider Provider');
  }

  public scrollTo(destination) {
    
    const config: ScrollToConfigOptions = {
      target: destination
    };
 
      this.scroll.scrollTo(config);
  }

}
