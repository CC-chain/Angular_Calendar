import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { GridModule,TabsModule, NavModule, CardModule, UtilitiesModule } from '@coreui/angular';
import { AppThemeColorComponent } from './colors/app-theme-color.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@app/modules/auth/auth.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ColorsComponent,
    TypographyComponent,
    AppThemeColorComponent,
  ],
  imports: [
    CommonModule,
    TabsModule,
    AuthModule,
    FormsModule,
    NavModule,
    FontAwesomeModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    ThemesRoutingModule
  ]
})
export class ThemesModule { }
