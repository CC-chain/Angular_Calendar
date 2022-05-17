import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { LoginRegisterComponent } from './login_register/login-register.component';
import { DynamicHooksModule,HookParserEntry } from 'ngx-dynamic-hooks';
import { AuthModule } from '@app/modules/auth/auth.module';
import {options} from '@core/configurations/dynamic-hooks'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule,TabsModule, NavModule, CardModule, UtilitiesModule, ModalModule } from '@coreui/angular';
import { StyleEditorComponent } from './login_register/style-editor.component';
import { CustomEditorComponent } from './custom/custom-editor.component';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorAllModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { AppSharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    StyleEditorComponent,
    CustomEditorComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NavModule,
    CardModule,
    ModalModule,
    GridModule,
    TabsModule,
    UtilitiesModule,
    ComponentsRoutingModule,
    AppSharedModule,
    DynamicHooksModule.forRoot({
    globalOptions : options }),
    AuthModule,
  ],
})
export class ComponentsModule { }
