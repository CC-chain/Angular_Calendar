import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAdminLayoutComponent } from '@app/layout/admin-layout';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard'
  },
  {
  path: '',
  data: {
    title: 'Home'
  },
  component: DefaultAdminLayoutComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () =>
      import('./page/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },{
      path: 'themes',
      loadChildren: () =>
      import('./page/themes/themes.module').then(m => m.ThemesModule)
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
