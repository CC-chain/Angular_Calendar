import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCustomLayoutComponent } from './layout/app-custom-layout/app-custom-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '@modules/auth/auth.module';
import { CoreModule } from '@app/core/core.module';
import { AppSharedModule } from '@shared/shared.module';
import { CalendarLayoutComponent } from './layout/calendar-layout/calendar-layout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultAdminLayoutComponent, DefaultFooterComponent, DefaultHeaderComponent } from './layout/admin-layout';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { FontPickerConfigInterface, FontPickerModule, FONT_PICKER_CONFIG } from '@lib/font-picker/src/public-api';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ContextMenuModule } from 'ngx-contextmenu';
import { HttpClientModule } from '@angular/common/http';
import { CalendarLayoutModule } from './modules/calendar/calendar.module';
import { DynamicImportService } from './shared/service/dynamic_import/dynamic-import.service';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  apiKey : 'AIzaSyCNwa0xQsLZuC3fzA7rE2ykvJBVm1YFqPI'
}

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultAdminLayoutComponent,
  AppCustomLayoutComponent,
  HeaderComponent,
  FooterComponent,
  AuthLayoutComponent,
  CalendarLayoutComponent,
];
@NgModule({
  declarations: [
    AppComponent, ...APP_CONTAINERS
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AppSharedModule,
    ContextMenuModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    NgxNavbarModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule,
    IconModule,
    FontPickerModule,
    PerfectScrollbarModule,
    CalendarLayoutModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
    DynamicImportService,
    {
      provide : FONT_PICKER_CONFIG,
      useValue : DEFAULT_FONT_PICKER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  getLayouts(){
    return AuthLayoutComponent;
  }
 }
