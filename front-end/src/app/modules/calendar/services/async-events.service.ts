import { Injectable, TemplateRef } from '@angular/core';
import { DataCsService } from '@app/data/service/data-cs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { map, Observable } from 'rxjs';


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

  modalEdit! : TemplateRef<any>;
  modalRemove!: TemplateRef<any>;
  modalAdd! : TemplateRef<any>;

  modalData! : {
    action : string,
    event: CalendarEvent,
  }


  constructor(private dataService : DataCsService, private modal : NgbModal) { }

  handleEvent(action: string, event : any){
    if(action == "Edit"){
      console.log(event)
    this.modalData = {action, event  };
    this.modal.open(this.modalEdit, { size:'xl' });
    }
    if(action == "Delete"){
    this.modalData = {action, event  };
    this.modal.open(this.modalRemove, { size:'sm' });
    }
     if(action == "Add"){
    let newEvent: CalendarEvent = {
      start : new Date(event),
      end : new Date(event),
      title : '',
      draggable: false,
      resizable : {
        afterEnd : false,
        beforeStart : false
      },
      color : {
        primary : '#ad2121',
        secondary : '#ad2121'
      },
      id: 0,
    }
    event = newEvent
    this.modalData = {action, event };
    this.modal.open(this.modalAdd, { size:'xl' });
    }
  }

  fetchEvents(): Observable<CalendarEvent[]> {
    let events : Observable<CalendarEvent[]>

    events = this.dataService.getCalendar('event/').pipe(
      map(events => {
        console.log(events);
        return events.map(event => {
          let colors : any  = {
            primary : event.color || '#ad2121',
            secondary : event.color || '#ad2121',
          }
          event.start = new Date(event.start);
          event.end = new Date(event.end || '');
          event.color = colors;
          event.actions = this.getActions(event.actions);
          console.log(event)
          return event;
        })
      })
    )
    console.log('123',events)
    return events;
  }

  addEvent(event : CalendarEvent, dbUrl: string = 'event/'){
    this.dataService.createCalendar(event,dbUrl);
  }

  editEvents(event : CalendarEvent, dbUrl: string = 'event/'){
    this.dataService.editCalendar(event,dbUrl);
  }

  deleteEvents(event : CalendarEvent, dbUrl: string = 'event/'){
    this.dataService.deleteCalendar(Number(event.id), 'event/');
    console.log(this.dataService.getCalendar('event/'))
  }

  private getActions(actions : any): CalendarEventAction[]{
    let calendarActions : CalendarEventAction[] = [];
    if(actions.editable){
      let action : CalendarEventAction = {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        onClick : ({event}: {event : CalendarEvent}):void => {
          this.handleEvent('Edit',event);
        }
      }
      calendarActions = [...calendarActions,action]
    }
    if(actions.deletable){
      let action : CalendarEventAction = {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        onClick : ({event}: {event : CalendarEvent}):void => {
          this.handleEvent('Delete',event);
        }
      }
      calendarActions = [...calendarActions,action]
    }
    console.log(calendarActions)
    return calendarActions;
  }

  eventTimesChanged({event,newStart,newEnd} : CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd
    console.log(event)
    this.dataService.editCalendar(event,'event/');
  }
}
