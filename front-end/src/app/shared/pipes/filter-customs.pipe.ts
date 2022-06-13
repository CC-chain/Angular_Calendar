import { Pipe, PipeTransform } from '@angular/core';
import { CustomCs, DataCs } from '@app/data/schema/data';

@Pipe({
  name: 'filterCustoms'
})
export class FilterCustomsPipe implements PipeTransform {

  transform(value: CustomCs[] | null, componentName: string): CustomCs[] {
    console.log(value);
    if (value != null) {
      let filter = value.filter(val => {
        if (val != null)
          return val.targetComponent === componentName
        else
          return;
      })
      return filter
    }
    return [];
  }

}
