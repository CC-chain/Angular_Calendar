import { Compiler, Component, ComponentFactoryResolver, createNgModuleRef, Injector, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
})
export class ColorsComponent  implements OnInit{
  public color!: string;
  @ViewChild("layoutComponent", { read: ViewContainerRef })
  layoutComponent!: ViewContainerRef;
  styles!: DataCs[];
  isLoaded : boolean = false;

  constructor(private injector: Injector, private dataCsService : DataCsService, private modalService : NgbModal) {
  }

  ngOnInit() {
    this.getStyles();
  }

  private   getStyles() {
    let flag:boolean = false;
    const $style =  this.dataCsService.getStyles()
    $style.subscribe(styles =>
      {
        this.styles = styles
      });
      var interval = setInterval(() => {
        if(this.styles){
          this.isLoaded = true;
          clearInterval(interval);
        }else{
        console.log("gelmedi")
        }
      }, 1000)
  }

  async loadForm() {

    const { AuthLayoutComponent } = await import("@layout/auth-layout/auth-layout.component");
    this.layoutComponent.clear();
    const ref = this.layoutComponent.createComponent(AuthLayoutComponent);
    setTimeout(() => ref.instance.loadForm(), 1000 )
    ref.changeDetectorRef.detectChanges();
  }
}
