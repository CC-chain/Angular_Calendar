import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '@app/shared/shared.module';
import { ThemesRoutingModule } from './themes-routing.module';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { GridModule,TabsModule, NavModule, CardModule, UtilitiesModule, ModalModule } from '@coreui/angular';
import { AppThemeColorComponent } from './colors/app-theme-color.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@app/modules/auth/auth.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetColorPipe } from './pipe/get-color.pipe';
import { GetSpecificsPipe } from './pipe/get-specifics.pipe';
import {  ModelToDtoPipe } from './pipe/model-to-dto.pipe';
import { DynamicImportService } from '@app/shared/service/dynamic_import/dynamic-import.service';
import { FontPickerConfigInterface, FontPickerModule, FONT_PICKER_CONFIG } from '@lib/font-picker/src/public-api';
import { FontPickerComponent } from './typography/font-picker.component';
import { GetFontPipe } from './pipe/get-font.pipe';

const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  apiKey : 'AIzaSyCNwa0xQsLZuC3fzA7rE2ykvJBVm1YFqPI'
}
@NgModule({
  declarations: [
    ColorsComponent,
    TypographyComponent,
    AppThemeColorComponent,
    GetColorPipe,
    GetSpecificsPipe,
    ModelToDtoPipe,
    FontPickerComponent,
    GetFontPipe,
  ],
  exports: [
   AppThemeColorComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    TabsModule,
    ColorSketchModule,
    AuthModule,
    FormsModule,
    NavModule,
    FontAwesomeModule,
    CardModule,
    ModalModule,
    GridModule,
    UtilitiesModule,
    AppSharedModule,
    ThemesRoutingModule,
    FontPickerModule,
  ],
  providers : [
    DynamicImportService,
    {
      provide : FONT_PICKER_CONFIG,
      useValue : DEFAULT_FONT_PICKER_CONFIG
    }
  ]
})
export class ThemesModule { }
