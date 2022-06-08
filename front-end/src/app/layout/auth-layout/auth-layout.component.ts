import { ChangeDetectionStrategy, Component, createNgModuleRef, ElementRef, Injector, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DataCs } from '@data/schema/data';
import { DataCsService } from '@data/service/data-cs.service';
import { isObservable } from 'rxjs';


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent implements OnInit {
  @ViewChild("contentComponent", { read: ViewContainerRef })
  public contentComponent!: ViewContainerRef;
  styles!: DataCs[];
  constructor(private injector: Injector, private dataCsService : DataCsService) {
  }

  ngOnInit(): void {
    this.getStyles();
  }

  private getStyles() {
    this.dataCsService.getStyles('Component/AuthLayout').subscribe(styles => {
      if(styles)
      this.styles = styles
  });
}

  getStyleWithName(name : string){
    if(this.styles && !isObservable(this.styles)){
    let styleObj = this.styles.filter(style => style.name == name)[0];
    if(styleObj)
    return styleObj
    }
    return {}
  }



}
