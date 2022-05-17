import { Pipe, PipeTransform } from '@angular/core';
import { CustomCs } from '@app/data/schema/data';

@Pipe({
  name: 'dynamicContent'
})
export class DynamicContentPipe implements PipeTransform {

  transform(value: CustomCs[] | null): string {
    let content : string = " ";
    if(value)
    value.forEach(val => {
      content = content + val.content + "\n";
    })
    return content;
  }

}
