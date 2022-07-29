import { Pipe, PipeTransform } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';

@Pipe({
  name: 'filterWebSites'
})
export class FilterWebSitesPipe implements PipeTransform {

  transform(value: CustomCs[] | null, componentName: string): CustomCs[] {
    console.log(value,componentName);
    if (value != null) {
      let filter = value.filter(val => {
        if (val != null)
          return val.name === componentName.toLowerCase()
        else
          return;
      })
      return filter
    }
    return [];
  }

}
