import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRoutingModule } from './admin-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminRoutingModule,
    AppSharedModule,
  ],
  providers: [
  ],
  declarations: [
  ]
})
export class AdminModule { }
