import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';
import { NoAuthGuard } from './guard/no-auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { throwIfAlreadyLoaded } from './guard/module-import-guard';



@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule){
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
