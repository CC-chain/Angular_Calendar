import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guard/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CalendarLayoutComponent } from './layout/calendar-layout/calendar-layout.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/auth/login',
  pathMatch:'full'
},
{
  path: '',
  component: CalendarLayoutComponent,
  canActivate: [NoAuthGuard],
  children: [
    {
      path: 'home',
      loadChildren: () =>
      import('@modules/calendar/calendar.module').then(m => m.CalendarLayoutModule)
    },
  ]
},{
  path: 'auth',
  component: AuthLayoutComponent,
  loadChildren: () =>
  import('@modules/auth/auth.module').then(m => m.AuthModule)
},
 { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
