import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-events-edit',
  templateUrl: './calendar-events-edit.component.html',
  styleUrls: ['./calendar-events-edit.component.scss']
})
export class CalendarEventsEditComponent implements OnInit {
  @Input() data!: any;
  @Input() editOrAdd!: boolean;
  collapse : boolean = false;

  constructor() { }

  toggleCollapse(){
    this.collapse = !this.collapse;
  }
  ngOnInit(): void {
  }

}
