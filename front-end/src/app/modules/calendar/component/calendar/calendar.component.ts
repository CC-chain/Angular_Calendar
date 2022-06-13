import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarMonthViewDay,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { AsyncEventsService } from '@modules/calendar/services/async-events.service';
import { WeekViewHour, WeekViewHourColumn, WeekViewHourSegment } from 'calendar-utils';
import { addMinutes, isSameDay } from 'date-fns';
import { CustomDateFormatter } from '@modules/calendar/provider/custom-date-formatter.provider'
import { CustomEventTitleFormatter } from '@modules/calendar/provider/custom-event-title-formatter.provider'
import { CalendarConfig, CustomMetaInterface, DataCs, SiteOfTime } from '@app/data/schema/data';
import { formatDate } from '@angular/common';
import { Font, FontPickerService } from '@lib/font-picker/src/public-api';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '@app/shared/service/loading/loading.service';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }

      .cal-day-selected,
      .cal-day-selected:hover {
        background-color: #a5a0a0  !important;
      }

        .invalid-position .cal-event {
        background-color: #ad2121 !important;
        color: #fff;
      }
    `,
  ],
  templateUrl: 'calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    }
  ],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('modalEdit', { static: false }) modalEdit!: TemplateRef<any>;
  @ViewChild('modalRemove', { static: false }) modalRemove!: TemplateRef<any>;
  @ViewChild('modalAdd', { static: false }) modalAdd!: TemplateRef<any>;
  @ViewChild('modalInfo', { static: false }) modalInfo!: TemplateRef<any>;

  @Input() _disable!: boolean;

  locale = 'tr';

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$!: Observable<CalendarEvent[]>;

  events!: CalendarEvent[];

  selectedMonthViewDay!: CalendarMonthViewDay;

  selectedDayViewDate!: Date;

  hourColumns!: WeekViewHourColumn[];

  selectedDays: any = [];

  siteOfTime$!: Observable<SiteOfTime[]>

  siteOfTime!: SiteOfTime[];

  selectedHours: {
    id?: number,
    date: Date,
    column?: WeekViewHourColumn,
    hourSegment?: WeekViewHour,
    segment?: WeekViewHourSegment,
  }[] = [];

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = true;

  calendarConfig$!: Observable<CalendarConfig>;

  config!: CalendarConfig;

  isLoaded = this.loaded.loading$;


  constructor(public dataService: AsyncEventsService, public fontPickerService: FontPickerService,
    public translateService: TranslateService, private modal: NgbModal, public loaded: LoadingService,) {
  }

  ngOnInit() {
    this.fetchCalendarConfig()
    this.fetchEvents();
  }

  fetchEvents() {
    this.events$ = this.dataService.fetchEvents();
    this.events$.subscribe((events) => {
      if (events)
        this.events = events;
      else {
        this.events = [];
      }
      console.log(this.events)
    })
  }


  fetchCalendarConfig() {
    this.calendarConfig$ = this.dataService.fetchCalendarConfig();
    this.calendarConfig$.subscribe(event => {
      this.config = event;
      this.fetchSiteOfTime();
    })
  }

  fetchSiteOfTime() {
    this.siteOfTime$ = this.dataService.fetchSiteOfTime();
    this.siteOfTime$.subscribe(event => {
      console.log(event)
      this.siteOfTime = event;
    })
    this.loaded.show();
    let wait = setInterval(() => {
      if (this.siteOfTime != null && this.siteOfTime != undefined) {
        this.siteOfTime.forEach(data => {
          let newSiteOfDay = {
            id: data.id,
            date: data.date,
            column: undefined,
            hourSegment: undefined,
            segment: undefined,
          }
          this.selectedHours.push(newSiteOfDay);
        })
        this.loaded.hide();
        clearInterval(wait)
      }
      else {
        console.log("gelmedi")
      }
    }, 300);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataService.modalEdit = this.modalEdit;
      this.dataService.modalRemove = this.modalRemove;
      this.dataService.modalAdd = this.modalAdd;
    }, 1000);
  }

  eventTimesChanged(eventTimesChangedEvent: CalendarEventTimesChangedEvent) {
    let changedEvent: { event: CalendarEvent<CustomMetaInterface>, newStart: string, newEnd: string } = {
      event: eventTimesChangedEvent.event,
      newStart: formatDate(eventTimesChangedEvent.newStart, 'YYYY-MM-ddTHH:mm:ss.sss', "en-us") + "Z",
      newEnd: formatDate(eventTimesChangedEvent.newEnd!, 'YYYY-MM-ddTHH:mm:ss.sss', "en-us") + "Z",
    }
    delete eventTimesChangedEvent.event.cssClass;
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      this.events.map(event => {
        if (event.id == eventTimesChangedEvent.event.id) {
          changedEvent.event.start = eventTimesChangedEvent.newStart;
          changedEvent.event.end = eventTimesChangedEvent.newEnd;
        }
      })
      this.dataService.editEvents(changedEvent.event, changedEvent.newStart, changedEvent.newEnd)
      this.fetchEvents();
      this.refresh.next();
    }
    else {
      this.refresh.next();
    }
  }

  selectedEvent!: CalendarEvent | null;
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.selectedEvent = event;
    this.modal.open(this.modalInfo, { size: "sm" });
  }


  addEvent(event: CalendarEvent<CustomMetaInterface>) {
    this.dataService.addEvent(event)
    this.ngOnInit();
    this.refresh.next();
    this.modal.dismissAll();
  }

  editEvents(newEvent: CalendarEvent<CustomMetaInterface>) {
    this.dataService.editEvents(newEvent)
    this.ngOnInit();
    this.refresh.next()
  }

  deleteEvent(delEvent: CalendarEvent<CustomMetaInterface>) {
    let eventId = this.events.find(event => event.id === delEvent.id)!.id;
    if (eventId)
      this.dataService.deleteEvents(Number(eventId));

    this.ngOnInit();
    this.refresh.next()
    this.modal.dismissAll();
  }

  editEventContext(event: any) {
    this.dataService.handleEvent('Edit', event.item);
  }

  deleteEventContext(event: any) {
    this.dataService.handleEvent('Delete', event.item)
  }

  addEventContext(event: any, duration: any) {
    console.log(event)
    let newStartTime = new Date(event.item);
    let newEndTime = new Date(newStartTime.getTime() + duration * 60000)
    this.dataService.handleEvent('Add', { newStartTime, newEndTime })
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  addSelectedHours(data: any) {
    this.dataService.addSiteOfTime(data);
  }


  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    const selectedDateTime = this.selectedDayViewDate.getTime();
    const dateIndex = this.selectedHours.findIndex(
      (selectedHour) => selectedHour.date.getTime() === selectedDateTime
    );
    console.log(dateIndex, this.selectedHours);
    if (dateIndex > -1) {
      this.dataService.deleteSiteOfTime(this.selectedHours[dateIndex])
      this.selectedHours.splice(dateIndex, 1);
      this.addSelectedDayViewClass()
    } else {
      let selectedHour = {
        date: this.selectedDayViewDate,
        column: undefined,
        hourSegment: undefined,
        segment: undefined,
      }
      this.selectedHours.push(selectedHour);
      let result = this.addSelectedDayViewClass(selectedHour);
      let newSiteOfTime: SiteOfTime = {
        day: result.date.getDay(),
        date: formatDate(result.date, 'YYYY-MM-ddTHH:mm:ss.sss', "en-us") + "Z",
        endDate: formatDate(new Date(result.date.getTime() + this.config.hourDuration * 60000),'YYYY-MM-ddTHH:mm:ss.sss', "en-us") + "Z",
        isFullDay: false
      }
      console.log(newSiteOfTime)
      this.dataService.addSiteOfTime(newSiteOfTime);

    }
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass($selectedHour?: any) {
      this.hourColumns.forEach((column) => {
        column.hours.forEach((hourSegment) => {
          hourSegment.segments.forEach((segment) => {
            delete segment.cssClass;
            let afterDate = new Date(segment.date.getTime() + this.config.hourDuration * 60000);
            if (
              this.selectedHours.some((selectedHour) => {
                return segment.date.getTime() <= selectedHour.date.getTime()
                  && (afterDate.getTime() > selectedHour.date.getTime())
              })
            ) {
              segment.cssClass = 'cal-day-selected';
              if ($selectedHour) {
                $selectedHour = { ...$selectedHour, ['column']: column }
                $selectedHour = { ...$selectedHour, ['hourSegment']: hourSegment }
                $selectedHour = { ...$selectedHour, ['segment']: segment }
              }
            }
          });
        });
      });
      console.log("asdasd", this.selectedHours)
      return $selectedHour;
  }

  validateEventTimesChanged = (
    { event, newStart, newEnd }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ) => {
    if (event.allDay) {
      return true;
    }

    console.log(this.events)
    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent) => {
      if (otherEvent.end && newEnd)
        return (
          otherEvent !== event &&
          !otherEvent.allDay &&
          ((otherEvent.start < newStart && newStart < otherEvent.end) ||
            (otherEvent.start < newEnd && newStart < otherEvent.end))
        );
      else {
        return false
      }
    });


    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }
    let duration = this.config.hourDuration
    console.log(this.selectedHours)
    const strictAreas = this.selectedHours.find((hour) => {
      if (newEnd) {
        console.log(hour.date, newStart, newEnd,duration)
        return (hour.date <= newStart && newStart <= addMinutes(hour.date, duration) ||
          (hour.date <= newEnd && newStart < addMinutes(hour.date, duration)))
      }
      else {
        return false
      }
    })

    if (strictAreas) {
      if (addCssClass) {
        event.cssClass = 'invalid-position'
      }
      else {
        return false;
      }
    }
    return true;
  };

  transformFont(value: any): Font {
    let font!: Font
    console.log(value, font)
    if ((typeof value === 'function') || (typeof value === 'object')) {
      Object.keys(value).forEach(key => {
        if (/^[Ff]ont$/.test(key)) {
          let curValue = value[key as keyof DataCs].toString().split(" ");
          if (curValue.length == 5) {

            if (curValue[2].length < 3) {
              for (let i = curValue[2].length; i <= 3; i++) { curValue[2] += " " }
            }
            font = new Font({
              style: curValue[2] + " " + curValue[0] + " " + curValue[1],
              size: curValue[3],
              family: curValue[4],
              styles: [''],
              files: undefined
            }
            )
          } else if (curValue.length == 4) {
            if (curValue[1].length < 3) {
              for (let i = curValue[1].length; i <= 3; i++) { curValue[2] += " " }
            }
            font = new Font({
              style: curValue[2] + " " + curValue[0] + " " + curValue[1],
              size: curValue[3],
              family: curValue[4],
              styles: [''],
              files: undefined
            })
          }
        }
      })
    } else if (typeof value === 'string') {
      let curValue = value.split(" ");
      if (curValue.length == 5) {

        if (curValue[2].length < 3) {
          for (let i = curValue[2].length; i <= 3; i++) { curValue[2] += " " }
        }
        font = new Font({
          style: curValue[2] + " " + curValue[0] + " " + curValue[1],
          size: curValue[3],
          family: curValue[4],
          styles: [''],
          files: undefined
        }
        )
      } else if (curValue.length == 4) {
        if (curValue[1].length < 3) {
          for (let i = curValue[1].length; i <= 3; i++) { curValue[2] += " " }
        }
        font = new Font({
          style: curValue[2] + " " + curValue[0] + " " + curValue[1],
          size: curValue[3],
          family: curValue[4],
          styles: [''],
          files: undefined
        })
      }
    }
    return font;
  }


}


interface WeekDay {
  date: Date;
  day: number;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
  cssClass?: string;
}
