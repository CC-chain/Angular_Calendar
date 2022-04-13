import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guard/no-auth.guard';
import { DefaultAdminLayoutComponent } from './layout/admin-layout';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CalendarLayoutComponent } from './layout/calendar-layout/calendar-layout.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'auth/login',
  pathMatch:'full'
},
{
  path: 'home',
  component: CalendarLayoutComponent,
  canActivate: [NoAuthGuard],
  loadChildren: () =>
      import('@modules/calendar/calendar.module').then(m => m.CalendarLayoutModule)
},{
  path: 'auth',
  loadChildren: () =>
  import('@modules/auth/auth.module').then(m => m.AuthModule)
},{
  path: 'admin',
  loadChildren: () =>
  import('@modules/admin/admin.module').then(m => m.AdminModule)
},
{
  path: '**', redirectTo: '/auth/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
