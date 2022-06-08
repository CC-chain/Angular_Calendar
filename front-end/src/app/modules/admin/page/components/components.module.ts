import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { LoginRegisterComponent } from './login_register/login-register.component';
import { DynamicHooksModule,HookParserEntry } from 'ngx-dynamic-hooks';
import { AuthModule } from '@app/modules/auth/auth.module';
import {options} from '@core/configurations/dynamic-hooks'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule, GridModule,TabsModule, NavModule, CardModule, UtilitiesModule, ModalModule, FormModule, TableModule } from '@coreui/angular';
import { StyleEditorComponent } from './login_register/style-editor.component';
import { CustomEditorComponent } from './custom/custom-editor.component';
import { AppSharedModule } from '@app/shared/shared.module';
import { CustomCreatorComponent } from './custom/custom-creator.component';
import { FormsModule } from '@angular/forms';
import {  ComponentCalendar } from './calendar/calendar.component';
import { CalendarEventsEditComponent } from './calendar/calendar-events-edit/calendar-events-edit.component';
import { CalendarEventsRemoveComponent } from './calendar/calendar-events-remove/calendar-events-remove.component';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    StyleEditorComponent,
    CustomEditorComponent,
    CustomCreatorComponent,
    ComponentCalendar,
    CalendarEventsEditComponent,
    CalendarEventsRemoveComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NavModule,
    CardModule,
    ModalModule,
    FormModule,
    GridModule,
    CollapseModule,
    TableModule,
    FormsModule,
    TabsModule,
    UtilitiesModule,
    ComponentsRoutingModule,
    AppSharedModule,
    DynamicHooksModule.forRoot({
    globalOptions : options }),
    AuthModule,
  ],
})
export class ComponentsModule { }
