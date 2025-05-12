import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByProperty',
})
export class NamePipe<T> implements PipeTransform {
  transform<T>(
    data: T[],
    property: keyof T,
    direction: 'asc' | 'desc' = 'asc'
  ): T[] {
    if (!data || !property) return data;

    return [...data].sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA == null || valueB == null) return 0;

      let result: number;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        result = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        result = valueA - valueB;
      } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        result = Number(valueA) - Number(valueB);
      } else {
        result = 0;
      }

      return direction === 'asc' ? result : -result;
    });
  }
}
