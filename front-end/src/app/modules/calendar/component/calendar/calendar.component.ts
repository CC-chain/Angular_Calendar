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
  CalendarMonthViewDay,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { AsyncEventsService } from '@modules/calendar/services/async-events.service';
import { WeekViewHour, WeekViewHourColumn, WeekViewHourSegment } from 'calendar-utils';
import { addMinutes, isSameDay } from 'date-fns';
import { CustomDateFormatter } from '@modules/calendar/provider/custom-date-formatter.provider'
import { CalendarConfig, CustomMetaInterface, DataCs } from '@app/data/schema/data';
import { formatDate} from '@angular/common';
import { Font, FontPickerService } from '@lib/font-picker/src/public-api';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
        background-color: deeppink !important;
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
  ],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('modalEdit', { static: false }) modalEdit!: TemplateRef<any>;
  @ViewChild('modalRemove', { static: false }) modalRemove!: TemplateRef<any>;
  @ViewChild('modalAdd', { static: false }) modalAdd!: TemplateRef<any>;
  @Input() _disable!: boolean;

  locale = 'tr';

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$!: Observable<CalendarEvent[]>;

  events!: CalendarEvent[];

  selectedMonthViewDay!: CalendarMonthViewDay;

  selectedDayViewDate!: Date;

  hourColumns!: WeekViewHourColumn[];

  selectedDays: any = [];

  selectedHours: {
    date: Date,
    column?: WeekViewHourColumn,
    hourSegment?: WeekViewHour,
    segment?: WeekViewHourSegment,
  }[] = [];

  refresh = new Subject<void>();


  activeDayIsOpen: boolean = true;

  calendarConfig$!: Observable<CalendarConfig>;

  config!: CalendarConfig;


  constructor(public dataService: AsyncEventsService, public fontPickerService: FontPickerService,
     public translateService : TranslateService , private modal: NgbModal) {
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
      this.config = event
      console.log(event)
    })
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
      this.refresh.next();
    }
    else {
      this.refresh.next();
    }
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

  addEventContext(event: any , duration : any) {
    console.log(event)
    let newStartTime = new Date(event.item);
    let newEndTime = new Date(newStartTime.getTime() + duration * 60000)
    this.dataService.handleEvent('Add', {newStartTime,newEndTime})
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    const selectedDateTime = this.selectedDayViewDate.getTime();
    const dateIndex = this.selectedHours.findIndex(
      (selectedHour) => selectedHour.date.getTime() === selectedDateTime
    );
    if (dateIndex > -1) {
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
      console.log(result, this.selectedHours)

    }
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass(selectedHour?: any) {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedHours.some((selectedHour) =>
              segment.date.getTime() === selectedHour.date.getTime())
          ) {
            segment.cssClass = 'cal-day-selected';
            if (selectedHour) {
              selectedHour = { ...selectedHour, ['column']: column }
              selectedHour = { ...selectedHour, ['hourSegment']: hourSegment }
              selectedHour = { ...selectedHour, ['segment']: segment }
            }
          }
        });
      });
    });
    return selectedHour;
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
    let duration = 20
    console.log(this.selectedHours)
    const strictAreas = this.selectedHours.find((hour) => {
      if (newEnd) {
        return (hour.date < newStart && newStart < addMinutes(hour.date, duration) ||
          (hour.date < newEnd && newStart < addMinutes(hour.date, duration)))
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

  transformFont(value: any):Font{
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

  getDays(days : WeekDay[], locale : string): WeekDay[]{
    let tempDays = days;
    console.log(days)
    if(locale.substring(0,2) != "en"){
      console.log(locale)
      let temp = tempDays[0];
      tempDays[0] = tempDays[tempDays.length-1];
      tempDays[tempDays.length - 1] = temp;
    }
    console.log(tempDays)
    return tempDays;
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
