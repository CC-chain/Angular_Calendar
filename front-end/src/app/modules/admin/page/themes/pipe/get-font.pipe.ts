import { Pipe, PipeTransform } from '@angular/core';
import { DataCs } from '@app/data/schema/data';
import { Font } from 'ngx-font-picker';

@Pipe({
  name: 'getFont'
})
export class GetFontPipe implements PipeTransform {

  transform(value: any): Font {
    let font!: Font
    console.log(value, font)
    if((typeof value === 'function') || (typeof value === 'object')){
    Object.keys(value).forEach(key => {
      if (/^[Ff]ont$/.test(key)) {
        let curValue = value[key as keyof DataCs].toString().split(" ");
        if (curValue.length == 5) {

          if (curValue[2].length < 3) {
            for (let i = curValue[2].length; i <= 3; i++) { curValue[2] += " " }
          }
          font = new Font({
            style : curValue[2] +" " +  curValue[0] + " " + curValue[1],
            size : curValue[3],
            family : curValue[4],
            styles : [''],
            files : undefined
          }
          )
        } else if (curValue.length == 4) {
          if (curValue[1].length < 3) {
            for (let i = curValue[1].length; i <= 3; i++) { curValue[2] += " " }
          }
          font = new Font({
            style : curValue[2] +" " +  curValue[0] + " " + curValue[1],
            size : curValue[3],
            family : curValue[4],
            styles : [''],
            files : undefined
          })
        }
      }
    })
  }else if (typeof value === 'string'){
    let curValue = value.split(" ");
        if (curValue.length == 5) {

          if (curValue[2].length < 3) {
            for (let i = curValue[2].length; i <= 3; i++) { curValue[2] += " " }
          }
          font = new Font({
            style : curValue[2] +" " +  curValue[0] + " " + curValue[1],
            size : curValue[3],
            family : curValue[4],
            styles : [''],
            files : undefined
          }
          )
        } else if (curValue.length == 4) {
          if (curValue[1].length < 3) {
            for (let i = curValue[1].length; i <= 3; i++) { curValue[2] += " " }
          }
          font = new Font({
            style : curValue[2] +" " +  curValue[0] + " " + curValue[1],
            size : curValue[3],
            family : curValue[4],
            styles : [''],
            files : undefined
          })
        }
  }
    console.log(value, font)
    return font
  }



}
