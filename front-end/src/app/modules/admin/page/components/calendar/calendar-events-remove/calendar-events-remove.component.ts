import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SiteService } from '@app/data/schema/data';

@Component({
  selector: 'app-calendar-events-remove',
  templateUrl: './calendar-events-remove.component.html',
  styleUrls: ['./calendar-events-remove.component.scss']
})
export class CalendarEventsRemoveComponent implements OnInit {
  @Input() data : any;
  @Output() removedData = new EventEmitter<SiteService>();
  constructor() { }

  remove(event : any){
    this.removedData.emit(event);
  }
  ngOnInit(): void {
  }

}
