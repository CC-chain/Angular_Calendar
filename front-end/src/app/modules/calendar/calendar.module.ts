import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './page/calendar/calendar/calendar.component';
import { CalendarRoutingModule } from './calendar.routing';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  exports: [CalendarComponent],
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarRoutingModule,
    SharedModule
  ]
})
export class CalendarLayoutModule { }
