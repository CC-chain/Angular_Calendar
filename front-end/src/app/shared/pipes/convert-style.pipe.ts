import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { map, Observable, isObservable } from 'rxjs';

@Pipe({
  name: 'convertStyle'
})
export class ConvertStylePipe implements PipeTransform {

  transform(value: DataCs[] | null , name : string): any {
    if(value && !isObservable(value)){
      let newValue = value.find(value => value.name === name);
      if(newValue){
        newValue.backgroundImage = "url('"+newValue.backgroundImage+"')"
        console.log(newValue);
        return newValue;
      }
      return {};
    }
    else{
    return {};
    }
  }

}
