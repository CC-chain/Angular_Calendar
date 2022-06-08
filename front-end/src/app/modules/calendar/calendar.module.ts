import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './component/calendar/calendar.component';
import { CalendarRoutingModule } from './calendar.routing';
import { AppSharedModule } from '@app/shared/shared.module';
import { CalendarHeaderComponent } from './component/calendar-header/calendar-header.component';
import { CalendarEditComponent } from './component/calendar-edit/calendar-edit.component';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker'
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import localeFr from '@angular/common/locales/fr';
import localTr from '@angular/common/locales/tr';
import localRu from '@angular/common/locales/ru';
import localDe from '@angular/common/locales/de';
import localUk from '@angular/common/locales/uk';
import { registerLocaleData } from '@angular/common';
import { GetFontPipe } from '../admin/page/themes/pipe/get-font.pipe';

registerLocaleData(localeFr);
registerLocaleData(localTr);
registerLocaleData(localRu);
registerLocaleData(localRu);
registerLocaleData(localDe);
registerLocaleData(localUk);

@NgModule({
  exports: [CalendarComponent],
  declarations: [CalendarComponent, CalendarHeaderComponent, CalendarEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    ContextMenuModule.forRoot({
      useBootstrap4 : true
    }),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CalendarRoutingModule,
    AppSharedModule
  ]
})
export class CalendarLayoutModule { }
