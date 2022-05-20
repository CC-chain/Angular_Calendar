import { Injectable, TemplateRef } from '@angular/core';
import { DataCsService } from '@app/data/service/data-cs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
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

  modalContent! : TemplateRef<any>;
  modalData! : {
    action : string,
    event: CalendarEvent,
  }


  constructor(private dataService : DataCsService, private modal : NgbModal) { }

  handleEvent(action: string, event : CalendarEvent){
    console.log(action,event,this.modal,this.modalContent)
    this.modalData = {action, event  };
    this.modal.open(this.modalContent, { size:'xl' });
  }

  fetchEvents(view: CalendarView): Observable<CalendarEvent[]> {
    let events : Observable<CalendarEvent[]>

    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[view];

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
    console.log(events)
    return events;
  }

  editEvents(event : CalendarEvent, dbUrl: string = 'event/'){
    this.dataService.editCalendar(event,dbUrl);
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
}
