import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';

@Pipe({
  name: 'getColor'
})
export class GetColorPipe implements PipeTransform {

  transform(value: any ): string {
    let styleColor: string = '#0000';
    Object.keys(value).forEach(key => {
      if(/([\w]+)[Cc]olor$/.test(key)){
        styleColor = value[key].toString();
      }
    })
    console.log('color', styleColor, value)
    return styleColor;
  }

}
