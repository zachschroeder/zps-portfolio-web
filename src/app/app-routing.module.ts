import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { BooksComponent } from './project/books.component';
import { SchoolComponent } from './school/school.component';
import { WorkComponent } from './work/work.component';
import { GroceriesComponent } from './groceries/groceries.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'work', component: WorkComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'books', component: BooksComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'groceries', component: GroceriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
