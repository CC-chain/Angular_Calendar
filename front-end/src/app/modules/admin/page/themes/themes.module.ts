import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { GridModule,TabsModule, NavModule, CardModule, UtilitiesModule } from '@coreui/angular';

@NgModule({
  declarations: [
    ColorsComponent,
    TypographyComponent
  ],
  imports: [
    CommonModule,
    TabsModule,
    NavModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    ThemesRoutingModule
  ]
})
export class ThemesModule { }
