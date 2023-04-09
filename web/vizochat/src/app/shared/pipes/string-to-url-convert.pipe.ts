import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToUrlConvert'
})
export class StringToUrlConvertPipe implements PipeTransform {

  transform(value: string,cssClass:string): string {
    const regex = /(https?:\/\/[^\s]+)/gi;
    return value.replace(regex, '<a href="$1" class="'+cssClass+'" target="_blank">$1</a>');
  }

}
