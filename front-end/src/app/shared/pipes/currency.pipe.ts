import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    let currency = "$"
    switch (value) {
      case 1:
        currency = "$"
        break;
      case 2:
        currency = "€"
        break;
      case 3:
        currency = "£"
        break;
      case 4:
        currency = "¥"
        break;
      case 5:
        currency = "₺"
        break;
    }

    return currency;
  }


}

