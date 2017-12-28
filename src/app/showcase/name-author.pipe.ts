import { Pipe, PipeTransform } from '@angular/core';

import { Book } from '../app.model';

@Pipe({
  name: 'nameAuthor'
})
export class NameAuthorPipe implements PipeTransform {

  transform(value: Book, args?: any): String {
    return value.title + ' (by ' + value.author + ')';
  }

}
