import { Compiler, Component, ComponentFactoryResolver, ComponentRef, createNgModuleRef, Injector, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CalendarConfig, DataCs } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicImportService } from '@shared/service/dynamic_import/dynamic-import.service'
import { adminColorComponents, themes } from '@data/schema/admin'
import { LoadingService } from '@shared/service/loading/loading.service'
@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
})
export class ColorsComponent implements OnInit {
  public color!: string;
  @ViewChild("layoutComponent", { read: ViewContainerRef })
  layoutComponent!: ViewContainerRef;
  styles!: DataCs[];
  config!: CalendarConfig;
  themes = themes;

  isLoaded = this.loader.loading$;
  comps = adminColorComponents
  constructor(private injector: Injector, private dataCsService: DataCsService, private modalService: NgbModal,
    private loadComponentService: DynamicImportService,
    public loader: LoadingService) {
  }

  ngOnInit() {
    this.getCalendarConfig('Component/CalendarConfiguration')
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
    this.loader.show();
    const $style = this.dataCsService.getStyles(dbUrl)
    $style.subscribe(styles => {
      this.styles = styles
    });
    var interval = setInterval(() => {
      if (this.styles) {
        this.loader.hide();
        clearInterval(interval);
      } else {
        console.log("gelmedi")
      }
    }, 1000)
  }


  getCalendarConfig(dbUrl: string){
    this.loader.show();
    const $config = this.dataCsService.getCalendarConfig(dbUrl)
    $config.subscribe(
      data => {
        this.config = data
      })
       var interval = setInterval(() => {
      if (this.config) {
        this.loader.hide();
        clearInterval(interval);
      } else {
        console.log("gelmedi")
      }
    }, 1000)
  }

  setCalendarConfig(event: any, dbUrl: string){
    let curTheme = this.themes.find(theme => theme.name === event.target.value)
    if(curTheme){
    this.config.theme = curTheme
    this.dataCsService.editCalendarConfig(this.config,dbUrl).subscribe(log => console.log(log))
    }
  }
  ngAfterViewInit() {
    this.ngOnInit();
  }

  async loadForm(layout: string = "") {
    console.log(layout)
    if (/[Ll]ayout/.test(layout))
      setTimeout(() => this.loadComponentService.loadComponent(layout, this.layoutComponent), 250);
    else
      setTimeout(() => this.loadComponentService.loadComponent(layout), 250);
  }

  isValid(obj: any) {
    return typeof obj !== 'undefined'
  }

  changeThemes(event: any) {

  }

  getIndexOfThemes(){
    return this.themes.indexOf(this.config.theme)
  }
}
