import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AppSharedModule } from '@shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MockupDataService } from '@data/service/mockup-data.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppSharedModule,
    AuthRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(MockupDataService),
    HttpClientModule,
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
