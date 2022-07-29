import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AppSharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DynamicHooksModule } from 'ngx-dynamic-hooks';
import { options } from '@core/configurations/dynamic-hooks';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppSharedModule,
    AuthRoutingModule,
    HttpClientModule,
    DynamicHooksModule.forRoot(
      {
        globalOptions : options
      }
    ),
    NgxIntlTelInputModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule {
  getComponents(){
    return [LoginComponent,RegisterComponent];
  }
 }
