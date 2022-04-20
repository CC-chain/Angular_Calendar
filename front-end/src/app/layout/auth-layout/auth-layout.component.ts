import { Component, createNgModuleRef, ElementRef, Injector, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  @Input() _content!: boolean;
  @ViewChild("contentComponent", { read: ViewContainerRef })
  contentComponent!: ViewContainerRef;

  constructor(private injector: Injector) {
  }

  async loadForm() {
    if(this._content == true){
    const { LoginComponent } = await import("@modules/auth/page/login/login.component");
    this.contentComponent.clear();
    const {instance } = this.contentComponent.createComponent(LoginComponent);
    instance._disable=true

    }
  }

  ngOnInit(): void {
    console.log(this._content)
    this.loadForm();
  }


}
