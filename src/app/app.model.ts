/**
 * Created by socio on 12/27/2017.
 */
export class Book {
  id: number;
  author: string;
  title: string;
  isbn: string;
  pages: number;
  publisherId: number;
  formatId: number;
  description: string;
  price: number;
}
export class Format {
  id: number;
  name: string;
}
export class Publisher {
  id: number;
  cityId: number;
  name: number;
}
export class City {
  id: number;
  countryId: number;
  name: string;
}
export class Country {
  id: number;
  name: string;
}
