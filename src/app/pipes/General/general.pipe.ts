import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'general'
})
export class GeneralPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
