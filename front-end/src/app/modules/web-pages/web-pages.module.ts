import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebPagesRoutingModule } from './web-pages-routing.module';
import { WebPagesComponent } from './component/web-pages.component';
import { DynamicHooksModule } from 'ngx-dynamic-hooks';
import { options } from '@app/core/configurations/dynamic-hooks';
import { AppSharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    WebPagesComponent
  ],
  imports: [
    CommonModule,
    WebPagesRoutingModule,
    DynamicHooksModule.forRoot(
      {
        globalOptions : options
      }
    ),
    AppSharedModule,
  ]
})
export class WebPagesModule { }
