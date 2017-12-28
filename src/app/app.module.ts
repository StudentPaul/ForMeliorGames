import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookComponent } from './book/book.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { SearchComponent } from './search/search.component';
import { NameAuthorPipe } from './showcase/name-author.pipe';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    NavigationComponent,
    ShowcaseComponent,
    SearchComponent,
    NameAuthorPipe,
    BookListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
