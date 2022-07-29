import { Pipe, PipeTransform } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';
import { LoginComponent } from '@app/modules/auth/page/login/login.component';
import { RegisterComponent } from '@app/modules/auth/page/register/register.component';
import { CustomComponent } from '@app/modules/custom/custom/custom.component';
import { DynamicLogoutButtonComponent } from '@app/modules/custom/dynamic-components/dynamic-logout-button.component';
import { DynamicProfileComponent } from '@app/modules/custom/dynamic-components/dynamic-profile.component';
import { DynamicUserInfoComponent } from '@app/modules/custom/dynamic-components/dynamic-user-info.component';
import { SelectorHookParserConfig } from 'ngx-dynamic-hooks';


const imports = [
  {
    name: 'LoginComponent',
    comp: LoginComponent
  },
  {
    name: 'RegisterComponent',
    comp: RegisterComponent,
  }
]

const dependents = [
  {
    name: 'CustomComponent',
    comp : CustomComponent
  },
  {
    name : 'DynamicLogoutComponent',
    comp : DynamicLogoutButtonComponent
  },
  {
    name : 'DynamicUserInfoComponent',
    comp : DynamicUserInfoComponent
  },
  {
    name : 'DynamicProfileComponent',
    comp : DynamicProfileComponent
  }
]

@Pipe({
  name: 'getParsers'
})
export class GetParsersPipe implements PipeTransform {

  transform(value: CustomCs | null): SelectorHookParserConfig[] {
    let customHook: SelectorHookParserConfig[] = [];
    console.log(value)
    if (value) {
      let targetcomp = imports.find((imps) => imps.name === value.targetComponent)
      if (targetcomp)
        customHook.push({
          component: targetcomp.comp
        })
        dependents.forEach(dependentComp => {
          customHook.push({
            component : dependentComp.comp
          })
        })
    }
    console.log(customHook, value)
    return customHook;
  }

}
