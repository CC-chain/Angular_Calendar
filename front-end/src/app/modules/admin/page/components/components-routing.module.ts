import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './login_register/login-register.component';

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
    path:'login-register',
    component: LoginRegisterComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
