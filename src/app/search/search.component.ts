import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import {  Location } from '@angular/common';

import { Book, Format } from '../app.model';
import { AppService } from '../app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, DoCheck {
  books: Book[];
  booksFiltered: Book[];
  formats: Format[];
  filterQuery = {
    author: '',
    title: '',
    isbn: '',
    formatId: null,
    minPages: null,
    maxPages: null,
    minPrice: null,
    maxPrice: null
  };

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getQueryParams();
    this.getFormats();
    this.getAllBooks();
  }
  ngDoCheck() {
    this.setQueryParams();
    this.filterBooks();
  }
  getQueryParams(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filterQuery.author = params['author'] || '';
      this.filterQuery.formatId = params['formatId'] || null;
      this.filterQuery.title = params['title'] || '';
      this.filterQuery.minPrice = params['minPrice'] || '';
      this.filterQuery.maxPrice = params['maxPrice'] || '';
      this.filterQuery.minPages = params['minPages'] || '';
      this.filterQuery.maxPages = params['maxPages'] || '';
      this.filterQuery.isbn = params['isbn'] || '';
    });
  }
  setQueryParams(): void {
    const queryString = (this.filterQuery.title ? '&title=' + this.filterQuery.title : '')
      + (this.filterQuery.formatId ? '&formatId=' + this.filterQuery.formatId : '')
      + (this.filterQuery.author ? '&author=' + this.filterQuery.author : '')
      + (this.filterQuery.minPrice ? '&minPrice=' + this.filterQuery.minPrice : '')
      + (this.filterQuery.maxPrice ? '&maxPrice=' + this.filterQuery.maxPrice : '')
      + (this.filterQuery.minPages ? '&minPages=' + this.filterQuery.minPages : '')
      + (this.filterQuery.maxPages ? '&maxPages=' + this.filterQuery.maxPages : '')
      + (this.filterQuery.isbn ? '&isbn=' + this.filterQuery.isbn : '')
    ;
    this.location.go('/search', queryString);
  }
  filterBooks(): void {
    if (this.books) {
      this.booksFiltered = this.books
        // filter books by Author
        .filter(
          book => {
            const authorFilter = this.filterQuery.author;
            return authorFilter
              ? (book.author ? book.author.match(new RegExp(authorFilter, 'i')) : false)
              : true;
          }
        )
        // filter books by Title
        .filter(
          book => {
              const titleFilter = this.filterQuery.title;
              return titleFilter
                ? (book.title ? book.title.match(new RegExp(titleFilter, 'i')) : false)
                : true;
          }
        )
        // filter books by ISBN
        .filter(
          book => {
            const isbnFilter = this.filterQuery.isbn;
            return isbnFilter
              ? (book.isbn ? book.isbn.match(new RegExp(isbnFilter, 'i')) : false)
              : true;
          }
        )
        // filter books by Pages
        .filter(
          book => {
            const formatFilterId = this.filterQuery.formatId;
            if (formatFilterId === 'any') {
              return true;
            }
            return formatFilterId
              ? (book.formatId ? (+book.formatId === +formatFilterId) : false)
              : true;
          }
        )
        // filter books by Pages
        .filter(
          book => {
            const minPages = this.filterQuery.minPages;
            const maxPages = this.filterQuery.maxPages;
            return (typeof minPages === 'number' ? book.pages >= minPages : true)
              && (typeof maxPages === 'number' ? book.pages <= maxPages : true);
          }
        )
        // filter books by Price
        .filter(
          book => {
            const minPrice = this.filterQuery.minPrice;
            const maxPrice = this.filterQuery.maxPrice;
            return (typeof minPrice === 'number' ? book.price >= minPrice : true)
              && (typeof maxPrice === 'number' ? book.price <= maxPrice : true);
          }
        );
    }
  }
  getFormats(): void {
    this.appService.getFormats()
      .subscribe(res => this.formats = JSON.parse(res._body));
  }
  getAllBooks(): void {
    this.appService.getAllBooks().subscribe(
      res => this.books = JSON.parse(res._body)
    );
  }

}
