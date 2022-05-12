import { ChangeDetectionStrategy, Component, createNgModuleRef, ElementRef, Injector, Input, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DataCs } from '@data/schema/data';
import { DataCsService } from '@data/service/data-cs.service';


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
    this.dataCsService.getStyles('authlayout/').subscribe(styles => {
      this.styles = styles
    });
  }

  getStyleWithName(name : string){
    let styleObj = this.styles.filter(style => style.name == name)[0];
    return  styleObj;
  }



}
