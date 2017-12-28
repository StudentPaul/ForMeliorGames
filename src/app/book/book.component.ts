import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book, City, Country, Format, Publisher } from '../app.model';
import { AppService } from '../app.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  book: Book = new Book();
  formats: Format[];
  publisher: Publisher = new Publisher;
  cityId: number;
  countryId: number;
  publisherId: number;
  cities: City[];
  filteredCities: City[]; // the cities of specific countries
  countries: Country[];
  publishers: Publisher[];
  filteredPublishers: Publisher[]; // the publishers of specific cities

  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getQueryId();
    this.getBook();
    this.getFormats();
    this.getCountries();
    this.getCities();
    this.getPublishers();
  }
  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.appService.getBook(id)
      .subscribe(
        res => {
          this.book = JSON.parse(res._body);
          this.appService.getPublisher(this.book.publisherId || null)
            .subscribe(resp => {
              this.publisher = JSON.parse(resp._body);
              this.publisherId = this.publisher.id;
              this.cityId = this.publisher.cityId;
              this.getPublishers();
            });
        });
  }
  getFormats(): void {
    this.appService.getFormats()
      .subscribe(res => this.formats = JSON.parse(res._body));
  }
  getCities(): void {
    this.appService.getAllCities()
      .subscribe(res => {
        this.cities = JSON.parse(res._body);
        this.cities.forEach(city => {
          if (+city.id === +this.cityId) {
            this.countryId = city.countryId;
            this.filterCities();
          }
          this.getCountries();
        });
      });
  }
  getCountries(): void {
    this.appService.getAllCountries()
      .subscribe(res => {
        this.countries = JSON.parse(res._body);
        this.filterPublishers();
      });
  }
  getPublishers(): void {
    this.appService.getAllPublishers()
      .subscribe(res => {
        this.publishers = JSON.parse(res._body);
        this.getCities();
      });
  }
  postBook(): void {
    console.log('posted');
    console.log(this.book);
    this.appService.postBook(this.book)
      .subscribe(res => {
        if (res.status === 200) {
          alert('Successfully saved!');
        } else {
          if (res.status === 201) {
            alert('Successfully created!');
          } else {
            alert('Error ocurred');
          }
        }});
  }
  // get book id from URL params
  getQueryId(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.book.id = Number.isInteger(id) ? id : null;
    });
  }
  filterCities(): void {
    this.filteredCities = this.cities.filter(city => +city.countryId === +this.countryId);
    this.filteredPublishers = [];
  }
  filterPublishers(): void {
    this.filteredPublishers = this.publishers.filter(publisher => +publisher.cityId === +this.cityId);
  }
}
