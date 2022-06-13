import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebPagesComponent } from './component/web-pages.component';

const routes: Routes = [{
  path: ':term',
  component:WebPagesComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebPagesRoutingModule { }
