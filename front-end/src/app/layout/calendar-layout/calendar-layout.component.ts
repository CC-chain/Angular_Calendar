import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemeService } from '@app/core/service/theme.service';
import { CustomCs, DataCs, User } from '@app/data/schema/data';
import { default_authLayout } from '@app/data/schema/defaultData';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Font } from '@lib/font-picker/src/public-api';
import { isObservable, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-calendar-layout',
  templateUrl: './calendar-layout.component.html',
  styleUrls: ['./calendar-layout.component.scss']
})
export class CalendarLayoutComponent implements OnInit {
  @ViewChild("calendarComponent", { read: ViewContainerRef })
  public calendarComponent!: ViewContainerRef;
  styles: Observable<DataCs[]> = of(default_authLayout);
  customs!: Observable<CustomCs[]>;
  sites!: Observable<CustomCs[]>
  user!: Observable<User>;
  constructor(private dataCsService : DataCsService){}

  ngOnInit(): void {
    this.getUser();
    this.getStyles();
    this.getCustoms();
  }

  private getStyles() {
    this.styles = this.dataCsService.getStyles('Component/CalendarLayout')
    this.styles.subscribe(styles => {
      console.log(styles)
    });
  }

    getUser(){
    let id = localStorage.getItem('id_user');
    if(id)
    this.user = this.dataCsService.getUser(Number(id),"User/Get")
  }


  getFirst(dataCs: any) {
    if (dataCs)
      return dataCs[0];
    else return;
  }

  getWebSites(){
    this.sites = this.dataCsService.getCustoms('Component/WebPage');
    this.sites.subscribe(data  => console.log(data));
  }

  getCustoms(){
    this.customs = this.dataCsService.getCustoms('Component/Custom');
    this.customs.subscribe(data => console.log(data));
  }
}
