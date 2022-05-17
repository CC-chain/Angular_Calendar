import { Compiler, Component, ComponentFactoryResolver, ComponentRef, createNgModuleRef, Injector, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicImportService } from '@shared/service/dynamic_import/dynamic-import.service'
import { adminColorComponents } from '@data/schema/admin'
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
  comps = adminColorComponents

  constructor(private injector: Injector, private dataCsService : DataCsService, private modalService : NgbModal,
    private loadComponentService : DynamicImportService) {
  }

  ngOnInit() {
  }

  public editStyles(styleObj : any , dbUrl : string) {
    console.log('edit', styleObj ,dbUrl)
    let curStyle : any = this.styles.find(stylesObj => stylesObj.name === styleObj.name);
    if(typeof curStyle !== "undefined" ){
    Object.keys(curStyle).map(key  => {
      if(styleObj.hasOwnProperty(key)){
        curStyle[key] = styleObj[key];
      }
    })
    this.dataCsService.editStyles(curStyle , dbUrl).subscribe(res => console.log("başarılı: ",res));
    }else{
      console.log("hata");
    }
  }

  public getStyles(dbUrl : string) {
    let flag:boolean = false;
    const $style =  this.dataCsService.getStyles(dbUrl)
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

  async loadForm(layout : string = "") {
    console.log(layout)
    if(/[Ll]ayout/.test(layout))
    setTimeout(() => this.loadComponentService.loadComponent(layout, this.layoutComponent),250);
    else
    setTimeout(() => this.loadComponentService.loadComponent(layout),250);
  }

  isValid(obj : any){
    return typeof obj !== 'undefined'
  }
}
