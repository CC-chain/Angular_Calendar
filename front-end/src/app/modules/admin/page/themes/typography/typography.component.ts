import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { adminComponents } from '@app/data/schema/admin';
import { DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontInterface } from 'ngx-font-picker';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
})
export class TypographyComponent implements OnInit {
  public color!: string;
  public font!: FontInterface;
  @ViewChild("layoutComponent", { read: ViewContainerRef })
  layoutComponent!: ViewContainerRef;
  styles!: DataCs[];
  isLoaded : boolean = false;
  comps = adminComponents

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
