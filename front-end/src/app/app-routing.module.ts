import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/auth/login',
  pathMatch:'full'
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
