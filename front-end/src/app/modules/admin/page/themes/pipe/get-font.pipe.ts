import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { Font } from 'ngx-font-picker';

@Pipe({
  name: 'getFont'
})
export class GetFontPipe implements PipeTransform {

  transform(value: DataCs): Font {
    let font!: Font
     Object.keys(value).forEach(key => {
      if(/^[Ff]ont$/.test(key)){
        value[key as keyof DataCs].toString().split(" ")
      }
    })
     return font
  }



}
