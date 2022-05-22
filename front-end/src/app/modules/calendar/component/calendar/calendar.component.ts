import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
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
import {CustomDateFormatter} from '@modules/calendar/provider/custom-date-formatter.provider'

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

  locale = 'en-US';

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

  public theme = 'light-theme';

  constructor(public dataService: AsyncEventsService) {
  }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.events$ = this.dataService.fetchEvents();
    this.events$.subscribe((events) => {
      this.events = events;
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
    let changedEvent: any = {
      event: eventTimesChangedEvent.event,
      newStart: eventTimesChangedEvent.newStart,
      newEnd: eventTimesChangedEvent.newEnd,
    }
    delete eventTimesChangedEvent.event.cssClass;
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      console.log('hello')
      this.dataService.eventTimesChanged(changedEvent);
      this.refresh.next();
    }
    else {
      this.refresh.next();
    }
  }

  addEvent(event : CalendarEvent){
    console.log(event)
    this.dataService.addEvent(event)
    this.refresh.next();
  }

  editEvents(event: CalendarEvent) {
    this.dataService.editEvents(event)
    this.refresh.next();
  }

  deleteEvent(event: CalendarEvent) {
    this.dataService.deleteEvents(event);
    this.refresh.next();
  }

  editEventContext(event: any) {
    this.dataService.handleEvent('Edit', event.item);
  }

  deleteEventContext(event: any) {
    this.dataService.handleEvent('Delete', event.item)
  }

  addEventContext(event : any) {
    console.log(event)
    this.dataService.handleEvent('Add', event.item)
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
}
