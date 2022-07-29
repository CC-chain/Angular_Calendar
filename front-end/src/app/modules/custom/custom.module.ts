import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom/custom.component';
import { DynamicLogoutButtonComponent } from './dynamic-components/dynamic-logout-button.component';
import { DynamicUserInfoComponent } from './dynamic-components/dynamic-user-info.component';
import { DynamicProfileComponent } from './dynamic-components/dynamic-profile.component';
import { CollapseModule, GridModule, TabsModule, NavModule, CardModule, UtilitiesModule, ModalModule, FormModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    CustomComponent,
    DynamicLogoutButtonComponent,
    DynamicUserInfoComponent,
    DynamicProfileComponent,
  ],
  imports: [
    CommonModule, CollapseModule, GridModule, TabsModule, NavModule, CardModule, UtilitiesModule, ModalModule, FormModule, TableModule,
    FormsModule,ReactiveFormsModule,NgxIntlTelInputModule,
  ]
})
export class CustomModule { }
