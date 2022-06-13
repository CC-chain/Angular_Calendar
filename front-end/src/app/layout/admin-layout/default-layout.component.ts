import { Component } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultAdminLayoutComponent {
  public navItems = navItems;
  siteId! : string;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  }

  constructor() {
    let siteId = localStorage.getItem("id_site");
    if(siteId != null){
      this.siteId = siteId;
    }
  }
}
