import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-events-remove',
  templateUrl: './calendar-events-remove.component.html',
  styleUrls: ['./calendar-events-remove.component.scss']
})
export class CalendarEventsRemoveComponent implements OnInit {
  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
