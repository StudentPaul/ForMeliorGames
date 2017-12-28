import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { Book } from '../app.model';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent implements OnInit {
  books: Book[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getAllBooks();
  }
  getAllBooks(): void {
    this.appService.getAllBooks().subscribe(
      res => this.books = JSON.parse(res._body)
    );
  }

}
