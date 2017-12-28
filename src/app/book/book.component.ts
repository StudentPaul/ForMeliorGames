import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book, City, Country, Format, Publisher } from '../app.model';
import { AppService } from '../app.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
  book: Book = new Book();
  formats: Format[];
  publisher: Publisher = new Publisher;
  cities: City[];
  countries: Country[];
  publishers: Publisher[];

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getQueryId();
    this.getBook();
    this.getFormats();
    this.getCities();
    this.getCountries();
    this.getPublishers();
  }
  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.appService.getBook(id)
      .subscribe(
        res => {
          this.book = JSON.parse(res._body);
          this.appService.getPublisher(this.book.publisherId || null)
            .subscribe(resp => this.publisher = JSON.parse(resp._body));
        });
  }
  getFormats(): void {
    this.appService.getFormats()
      .subscribe(res => this.formats = JSON.parse(res._body));
  }
  getCities(): void {
    this.appService.getAllCities()
      .subscribe(res => this.cities = JSON.parse(res._body));
  }
  getCountries(): void {
    this.appService.getAllCountries()
      .subscribe(res => this.countries = JSON.parse(res._body));
  }
  getPublishers(): void {
    this.appService.getAllPublishers()
      .subscribe(res => this.publishers = JSON.parse(res._body));
  }
  postBook(): void {
    console.log('posted');
    console.log(this.book);
    this.appService.postBook(this.book)
      .subscribe(res => console.log(res));
  }
  // get book id from URL params
  getQueryId(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.book.id = Number.isInteger(id) ? id : null;
    });
  }
  ngOnDestroy() {
  }



}
