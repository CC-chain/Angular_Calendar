import { Injectable, TemplateRef } from '@angular/core';
import { CalendarConfig, CustomMetaInterface } from '@app/data/schema/data';
import { DataCsService } from '@app/data/service/data-cs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isObservable, map, Observable } from 'rxjs';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Injectable({
  providedIn: 'root'
})
export class AsyncEventsService {

  modalEdit!: TemplateRef<any>;
  modalRemove!: TemplateRef<any>;
  modalAdd!: TemplateRef<any>;

  modalData!: {
    action: string,
    event: CalendarEvent<CustomMetaInterface>,
  }


  constructor(private dataService: DataCsService, private modal: NgbModal) { }

  handleEvent(action: string, event: any) {
    if (action == "Edit") {
      console.log(event)
      this.modalData = { action, event };
      this.modal.open(this.modalEdit, { size: 'xl' });
    }
    if (action == "Delete") {
      this.modalData = { action, event };
      this.modal.open(this.modalRemove, { size: 'sm' });
    }
    if (action == "Add") {
      let newEvent: CalendarEvent<CustomMetaInterface> = {
        start: new Date(event),
        end: new Date(event),
        title: '',
        allDay: false,
        cssClass: '',
        draggable: false,
        resizable: {
          afterEnd: false,
          beforeStart: false
        },
        actions: this.getActions({ editable: true, deletable: true }),
        color: {
          primary: '#ad2121',
          secondary: '#ad2121'
        },
        meta: {
          siteServiceId: Number(localStorage.getItem("id_site")),
          userId: Number(localStorage.getItem("id_user")),
          userMessage: ''
        }
      }
      event = newEvent
      this.modalData = { action, event };
      this.modal.open(this.modalAdd, { size: 'xl' });
    }
  }

  fetchEvents(): Observable<CalendarEvent<CustomMetaInterface>[]> {
    let events: Observable<CalendarEvent<CustomMetaInterface>[]>

    events = this.dataService.getCalendar('Reservation/List').pipe(
      map(events => {
        if (events.length >= 1) {
          return events.map(event => {
            let colors: any = {
              primary: event.color || '#ad2121',
              secondary: event.color || '#ad2121',
            }
            event.start = new Date(event.start);
            event.end = new Date(event.end || '');
            event.color = colors;
            event.actions = this.getActions(event.actions);
            console.log(event)
            return event;
          })
        }
        else {
          return [{
            id: '1',
            start: new Date('2022-05-20 18:30:00'),
            end: new Date('2022-05-20 20:00:00'),
            title: 'ilk deneme',
            allDay: false,
            cssClass: '',
            actions: this.getActions({ editable: true, deletable: true }),
            color: {
              primary: "#ad2121",
              secondary: "#ad2121"
            },
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            draggable: true,
          }]
        }
      })
    )
    return events;
  }

  fetchCalendarConfig(): Observable<CalendarConfig> {
    return this.dataService.getCalendarConfig('Component/CalendarConfiguration').pipe(
      map(data => {
        if (isObservable(data)) {
          return {
            "id": "1",
            "hourDuration": 20,
            "hourSegmentHeight": 5,
            "precision": "minutes",
            "locale": "tr",
            "monthViewColumnHeader": "string",
            "monthViewDayNumber": "string",
            "monthViewTitle": "string",
            "weekViewColumnHeader": "string",
            "weekViewColumnSubHeader": "string",
            "weekViewHour": "string",
            "dayViewHour": "string",
            "dayViewTitle": "string",
            "excludeDays": [0],
            "weekendDays": [
              0, 6
            ],
            "theme": {
              "name": "dark-theme",
              "primary": "#1f262d",
              "secondary": "#394046"
            },
            "dayStartHour": 1,
            "dayStartMinute": 30,
            "dayEndHour": 23,
            "dayEndMinute": 45,
            "font": "italic small-caps 700 12px Rochester"
          }
        }
        else
          return data;
      })
    )
  }

  addEvent(event: CalendarEvent<CustomMetaInterface>, dbUrl: string = 'Reservation/Insert') {
    let modifiedEvent = {
      start : event.start,
      end : event.end,
      cssClass : event.cssClass ? event.cssClass : '',
      color : event.color!.primary,
      resizable : event.resizable,
      draggable : true,
      actions : this.getProperActions(event),
      meta : event.meta,
      allDay : event.allDay,
    }

    console.log(modifiedEvent)
    this.dataService.createCalendar(modifiedEvent, dbUrl).subscribe(data => console.log(data));
  }

  editEvents(event: CalendarEvent<CustomMetaInterface>,newStart?: any,newEnd?: any) {
     let modifiedEvent = {
      id : event.id,
      start : newStart ? newStart : event.start,
      end : newEnd ? newEnd : event.end,
      cssClass : event.cssClass ? event.cssClass : '',
      color : event.color!.primary,
      resizable : event.resizable,
      draggable : event.draggable,
      actions : this.getProperActions(event),
      meta : {
        siteServiceId : event.meta!.siteService!.id,
        userId : event.meta!.user!.id,
        userMessage : event.meta!.userMessage
      },
      allDay : event.allDay,
    }
    let dbUrl: string = 'Reservation/Update';
    console.log(modifiedEvent)
    this.dataService.editCalendar(modifiedEvent, dbUrl).subscribe(data => console.log(data));
  }

  deleteEvents(eventId : number, dbUrl: string = 'Reservation/Delete') {
    this.dataService.deleteCalendar(eventId, dbUrl).subscribe(data => console.log(data));
  }

  private getActions(actions: any): CalendarEventAction[] {
    let calendarActions: CalendarEventAction[] = [];
    if (actions.editable) {
      let action: CalendarEventAction = {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edit', event);
        }
      }
      calendarActions = [...calendarActions, action]
    }
    if (actions.deletable) {
      let action: CalendarEventAction = {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Delete', event);
        }
      }
      calendarActions = [...calendarActions, action]
    }
    console.log(calendarActions)
    return calendarActions;
  }

  private getProperActions(event : CalendarEvent<CustomMetaInterface>){
    let properAction = {
      editable: false,
      deletable: false,
    }
    event.actions!.map(event => {
      if(event.label == '<i class="fas fa-fw fa-pencil-alt"></i>'){
        properAction.editable = true;
      }
      if(event.label == '<i class="fas fa-fw fa-trash-alt"></i>'){
        properAction.deletable = true;
      }
    } )
    return properAction;
  }
}
