import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentCalendar } from './calendar/calendar.component';
import { HeaderFooterComponent } from './header_footer/header-footer.component';
import { LoginRegisterComponent } from './login_register/login-register.component';
import { WebPagesComponent } from './webPages/web-pages.component';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Components'
  },
  children: [{
    data:
    {
      title: 'Login/Register',
    },
    path: 'login-register',
    component: LoginRegisterComponent,
  },
  {
    data: { title: 'Calendar' },
    path: 'calendar',
    component: ComponentCalendar
  },
  {
    data: { title: 'Web Pages' },
    path: 'web-pages',
    component: WebPagesComponent
  },
 {
    data: { title: 'Header/Footer' },
    path: 'header-footer',
    component: HeaderFooterComponent
  }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
