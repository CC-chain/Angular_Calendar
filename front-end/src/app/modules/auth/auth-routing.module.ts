import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteGuard } from '@app/core/guard/site-guard.guard';
import { AuthLayoutComponent } from '@app/layout/auth-layout/auth-layout.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        canActivate:[SiteGuard],
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
