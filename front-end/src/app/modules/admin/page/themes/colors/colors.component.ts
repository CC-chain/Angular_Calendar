import { Compiler, Component, ComponentFactoryResolver, createNgModuleRef, Injector, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
})
export class ColorsComponent  {
  public color!: string;
  @ViewChild("layoutComponent", { read: ViewContainerRef })
  layoutComponent!: ViewContainerRef;
  //contentComponent!: Type<any>;
  //loaded = false;

  constructor(private injector: Injector) {
  }

  async loadForm() {
    const { AuthLayoutComponent } = await import("@layout/auth-layout/auth-layout.component");
    this.layoutComponent.clear();
    const {instance }= this.layoutComponent.createComponent(AuthLayoutComponent);
    instance._content=true;
  }
}
