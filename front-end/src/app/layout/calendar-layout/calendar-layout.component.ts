import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemeService } from '@app/core/service/theme.service';
import { Font } from '@lib/font-picker/src/public-api';
import { map } from 'rxjs';

@Component({
  selector: 'app-calendar-layout',
  templateUrl: './calendar-layout.component.html',
  styleUrls: ['./calendar-layout.component.scss']
})
export class CalendarLayoutComponent implements OnInit {
  @ViewChild("calendarComponent", { read: ViewContainerRef })
  public calendarComponent!: ViewContainerRef;

  ngOnInit(): void {

  }

}
