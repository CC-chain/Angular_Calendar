import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { LoginRegisterComponent } from './login_register/login-register.component';
import { DynamicHooksModule,HookParserEntry } from 'ngx-dynamic-hooks';
import { AuthModule } from '@app/modules/auth/auth.module';
import {options} from '@core/configurations/dynamic-hooks'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StyleEditorComponent } from './login_register/style-editor.component';
import { CustomEditorComponent } from './custom/custom-editor.component';
import { AppSharedModule } from '@app/shared/shared.module';
import { CustomCreatorComponent } from './custom/custom-creator.component';
import {  ComponentCalendar } from './calendar/calendar.component';
import { CalendarEventsEditComponent } from './calendar/calendar-events-edit/calendar-events-edit.component';
import { CalendarEventsRemoveComponent } from './calendar/calendar-events-remove/calendar-events-remove.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { WebPagesComponent } from './webPages/web-pages.component'
import { ThemesModule } from '../themes/themes.module';
import { HeaderFooterComponent } from './header_footer/header-footer.component';
import { CollapseModule, GridModule, TabsModule, NavModule, CardModule, UtilitiesModule, ModalModule, FormModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    StyleEditorComponent,
    CustomEditorComponent,
    CustomCreatorComponent,
    ComponentCalendar,
    CalendarEventsEditComponent,
    CalendarEventsRemoveComponent,
    WebPagesComponent,
    HeaderFooterComponent,
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
    ReactiveFormsModule,
    MdbCheckboxModule,
    UtilitiesModule,
    ComponentsRoutingModule,
    AppSharedModule,
    DynamicHooksModule.forRoot({
    globalOptions : options }),
    AuthModule,
    ThemesModule,
   NgxIntlTelInputModule
  ],
})
export class ComponentsModule { }
