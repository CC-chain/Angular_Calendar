import { Pipe, PipeTransform } from '@angular/core';
import { CustomCs, DataCs } from '@app/data/schema/data';

@Pipe({
  name: 'filterCustoms'
})
export class FilterCustomsPipe implements PipeTransform {

  transform(value: CustomCs[]  , componentName : string): CustomCs[] {
   return  value.filter(val => val.targetComponent === componentName)
  }

}
