import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {

  @Input() view!: CalendarView;

  @Input() viewDate!: Date;

  @Input() get locale(){
    return this._locale
  }

  set locale(val){
    this._locale = val;
    this.translateService.use(val);
  }

  private _locale!: string;

  @Input() theme!: string;

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;

 constructor( public translateService : TranslateService){
 }

  isInclude(theme : string){
    if(theme.includes("light")){
      return 'btn-light'
    }
    else if (theme.includes("dark")){
      return 'btn-dark'
    }
    return "btn-primary"
  }
}
