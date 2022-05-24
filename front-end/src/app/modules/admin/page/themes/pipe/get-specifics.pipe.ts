import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';

@Pipe({
  name: 'getSpecifics'
})
export class GetSpecificsPipe implements PipeTransform {

  transform(value: DataCs[], ...args: string[]){
    let arr : any = [];
    args.forEach(argStr => {
      value.forEach(obj => {
        if(obj.hasOwnProperty(argStr)){

          arr.push(obj);
        }
      } )
    })
    console.log(arr, args)
    return arr;
  }

}
