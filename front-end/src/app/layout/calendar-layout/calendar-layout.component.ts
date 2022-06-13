import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemeService } from '@app/core/service/theme.service';
import { CustomCs, DataCs } from '@app/data/schema/data';
import { default_authLayout } from '@app/data/schema/defaultData';
import { DataCsService } from '@app/data/service/data-cs.service';
import { Font } from '@lib/font-picker/src/public-api';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-calendar-layout',
  templateUrl: './calendar-layout.component.html',
  styleUrls: ['./calendar-layout.component.scss']
})
export class CalendarLayoutComponent implements OnInit {
  @ViewChild("calendarComponent", { read: ViewContainerRef })
  public calendarComponent!: ViewContainerRef;
  styles: Observable<DataCs[]> = of(default_authLayout);
  sites!: Observable<CustomCs[]>

  constructor(private dataCsService : DataCsService){}

  ngOnInit(): void {
    this.getStyles();
    this.getWebSites();
  }

  private getStyles() {
    this.styles = this.dataCsService.getStyles('Component/CalendarLayout')
    this.styles.subscribe(styles => {
      console.log(styles)
    });
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
}
