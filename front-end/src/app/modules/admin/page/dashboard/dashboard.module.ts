import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WidgetsModule } from '@modules/widgets/widgets.module';
import { DashboardComponent } from './component/dashboard.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RemoveEmployeeComponent } from './component/remove-employee/remove-employee.component';
import { MoreEmployeeComponent } from './component/more-employee/more-employee.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [DashboardComponent, AddEmployeeComponent, RemoveEmployeeComponent, MoreEmployeeComponent],
  imports: [
    DashboardRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    ModalModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    NgxIntlTelInputModule,
    AvatarModule,
    TableModule,
    MatProgressSpinnerModule,
    WidgetsModule
  ]
})
export class DashboardModule { }
