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
import { CssLoaderComponent } from './shared/component/cssLoader/css-loader/css-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};


import { IconModule, IconSetService } from '@coreui/icons-angular';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultAdminLayoutComponent,
  CssLoaderComponent,
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
    ReactiveFormsModule,
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
  IconModule,
  PerfectScrollbarModule,
  ],
    providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent,CssLoaderComponent]
})
export class AppModule { }
