import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { SchoolComponent } from './school/school.component';
import { BooksComponent } from './project/books.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    WorkComponent,
    SchoolComponent,
    BooksComponent,
  ],
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, CommonModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
