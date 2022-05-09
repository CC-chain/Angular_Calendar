import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'convertStyle'
})
export class ConvertStylePipe implements PipeTransform {

  transform(value: DataCs[] | null , name : string): any {
    console.log(value, name);
    if(value ){
      return value.find(value => value.name === name);
    }
    else
    return {};
  }

}
