import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';

@Pipe({
  name: 'modelToDto',
})
export class ModelToDtoPipe implements PipeTransform {

  transform(value: any, args: string[]){
    let newObj: any = {};
    let i = 0;
    args.forEach(arg => {
      let variableValue : string = value[arg]
      newObj[arg] = variableValue
    })
    console.log(newObj)
    return newObj
  }

}
