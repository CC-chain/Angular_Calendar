import { Pipe, PipeTransform } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';
import { LoginComponent } from '@app/modules/auth/page/login/login.component';
import { RegisterComponent } from '@app/modules/auth/page/register/register.component';
import { CustomComponent } from '@app/modules/custom/custom/custom.component';
import { SelectorHookParserConfig } from 'ngx-dynamic-hooks';


const imports = [
  {
    name: 'LoginComponent',
    comp: LoginComponent
  },
  {
    name: 'RegisterComponent',
    comp: RegisterComponent,
  },{
    name: 'CustomComponent',
    comp : CustomComponent,
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
      let dependentComps = value.dependentComponents.split(',');
      console.log(dependentComps)
      dependentComps.forEach(comp => {
          let dependentComp = imports.find((imps) => imps.name === comp.trim())
          if(dependentComp)
          customHook.push({
            component : dependentComp.comp
          })
      })
    }
    console.log(customHook, value)
    return customHook;
  }

}
