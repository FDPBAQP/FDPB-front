import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform(list: any[], order = '', path: string = ''): any[] {
    if (!list || list.length <= 1) {
      return list;
    }

    if (!order) {
      order = 'asc';
    }

    let properties: string[];
    if (path) {
      properties = path.split('.');
    } else {
      properties = [];
    }

    return list.sort((objA, objB) => {
      let valueA = objA;
      let valueB = objB;

      for (let prop of properties) {
        if (valueA) {
          valueA = valueA[prop];
        }
        if (valueB) {
          valueB = valueB[prop];
        }
      }

      if (valueA == valueB) {
        return 0;
      } else if (order == 'desc') {
        if (valueA > valueB) {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (valueA < valueB) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }
}
