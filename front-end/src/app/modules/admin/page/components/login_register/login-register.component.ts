import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CustomCs, DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { LoginComponent } from '@app/modules/auth/page/login/login.component';
import { CustomComponent } from '@app/modules/custom/custom/custom.component';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';
import { LoadingService } from '@app/shared/service/loading/loading.service';
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
  customs!: CustomCs[];

  constructor(private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private customCs: DataCsService,
    private dynamicImport: DynamicImportService,
    private dataCsService: DataCsService,
    public loaded: LoadingService) { }
  isLoaded = this.loaded.loading$;

  async loadForm(layout: string = "") {
    if (/[Ll]ayout/.test(layout))
      setTimeout(() => this.dynamicImport.loadComponent(layout, this.layoutComponent), 250);
    else
      setTimeout(() => this.dynamicImport.loadComponent(layout), 250);
  }



  public editStyles(styleObj: any, dbUrl: string) {
    console.log('edit', styleObj, dbUrl)
    this.styles.map((stylesObj : any) => {

      if (stylesObj.name === styleObj.name) {
        Object.keys(stylesObj).map((key) => {
          if (styleObj.hasOwnProperty(key)) {
            stylesObj[key as keyof DataCs] = styleObj[key];
          }
        })
      }
    });

  this.dataCsService.editStyles(this.styles,dbUrl).subscribe(data => console.log(data))
  }

  public getStyles(dbUrl: string) {
    this.loaded.show();
    console.log('girdi styles')
    const $style = this.dataCsService.getStyles(dbUrl)
    $style.subscribe(styles => {
      this.styles = styles
    });
    var interval = setInterval(() => {
      if (this.styles) {
        this.isAllLoaded(true, 'styles');
        clearInterval(interval);
      } else {
        console.log("gelmedi")
      }
    }, 1000)
    console.log(this.styles);
  }

  getCustoms(targetComponent: string, dbUrl?: string) {
    if (!this.customs) {
      console.log('girdi Customs')
      this.loaded.show();
      this.dataCsService.getCustoms(dbUrl ? dbUrl : 'Component/Custom').subscribe((value) => {
        this.customs = value;
        this.isAllLoaded(true, 'customs');
      });
    } else {
      this.isAllLoaded(true, 'customs')
    }
  }

    public editCustoms(customObj: any, dbUrl: string) {
    console.log('edit', customObj, dbUrl)
    this.customs.map((customsObj : any) => {

      if (customsObj.name === customObj.name) {
        Object.keys(customsObj).map((key) => {
          if (customObj.hasOwnProperty(key)) {
            customsObj[key as keyof CustomCs] = customObj[key];
          }
        })
      }
    });

  this.dataCsService.editCustoms(this.customs,dbUrl).subscribe(data => console.log(data))
  }

  addCustoms(customObj: any, dbUrl: string) {
  this.customs = [...this.customs,customObj]
  console.log(this.customs)
  this.dataCsService.editCustoms(this.customs,dbUrl).subscribe(data => console.log(data))
  }

  deleteCustom(customObj: any, dbUrl: string) {
  this.customs = this.customs.filter((item) => item.name !== customObj.name )
  console.log(this.customs)
  this.dataCsService.editCustoms(this.customs,dbUrl).subscribe(data => console.log(data))
  }

  flags = {
    customs: false,
    styles: false,
  }

  isAllLoaded(value: boolean, data: string) {
    this.flags[data as keyof typeof this.flags] = value;
    console.log(value, data, this.flags);
    if (this.flags.customs == true && this.flags.styles == true) {
      this.loaded.hide();
      this.flags.customs = false;
      this.flags.styles = false;
    }
  }

  ngOnInit(): void {
    setTimeout(() => this.dynamicImport.loadComponent('AuthLayoutComponent', this.layoutComponent), 250);
        this.loaded.show();
    setTimeout(() => this.loaded.hide(),1500);
  }


}
