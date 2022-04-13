import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultAdminLayoutComponent, DefaultFooterComponent, DefaultHeaderComponent } from '@app/layout/admin-layout';
import { AppSharedModule } from '@app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardModule } from './page/dashboard/dashboard.module';




@NgModule({
  imports: [
    AdminRoutingModule,
    AppSharedModule,
  ],
  providers: [
  ]
})
export class AdminModule { }
