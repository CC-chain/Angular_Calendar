import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CustomCs, DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoginComponent } from '@app/modules/auth/page/login/login.component';
import { CustomComponent } from '@app/modules/custom/custom/custom.component';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';
import { HookParserEntry, OutletOptions } from 'ngx-dynamic-hooks';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
 @ViewChild("layoutComponent", { read: ViewContainerRef })
  layoutComponent!: ViewContainerRef;
  styles!: DataCs[];
  customs : CustomCs[] = [];

  constructor(private _renderer2: Renderer2,
  @Inject(DOCUMENT) private _document: Document,
  private customCs : DataCsService,
  private dynamicImport : DynamicImportService,
  private dataCsService : DataCsService ) { }
  isLoaded : boolean = false;

  async loadForm(layout : string = ""){
      if(/[Ll]ayout/.test(layout))
    setTimeout(() => this.dynamicImport.loadComponent(layout, this.layoutComponent),250);
    else
    setTimeout(() => this.dynamicImport.loadComponent(layout),250);
  }

  public editCustoms(customObj : any , dbUrl : string){
    console.log('edit', customObj ,dbUrl)
    let curCustom : any = this.customs.find(customsObj => customsObj.name === customObj.name);
    if(typeof curCustom !== "undefined" ){
    Object.keys(curCustom).map(key  => {
      if(customObj.hasOwnProperty(key)){
        curCustom[key] = customObj[key];
      }
    })
    this.dataCsService.editCustoms(curCustom , dbUrl).subscribe(res => console.log("başarılı: ",res));
    }else{
      console.log("hata");
    }
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
      console.log(this.styles);
  }

    getCustoms(targetComponent : string , dbUrl?: string) {
    new Promise<void>((resolve, reject) => {
      this.dataCsService.getCustoms(dbUrl ? dbUrl : 'custom/').subscribe({
        next: (res: any) => {
          let sources : CustomCs[] = [];
          res.map((res : any) => {
            if(res.targetComponent === targetComponent)
            sources.push (new CustomCs(res.id,res.name,res.layout,res.content,res.script,res.targetComponent,res.dependentComponents));
          })
          console.log(sources);
          this.customs = sources;
          resolve();
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log("complete");
        }
      },

      )
    });
  }


  ngOnInit(): void {
    setTimeout(() => this.dynamicImport.loadComponent('AuthLayoutComponent', this.layoutComponent),250);
  }


}
