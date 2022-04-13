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
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
