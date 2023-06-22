import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { SchoolComponent } from './school/school.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'work', component: WorkComponent },
  { path: 'school', component: SchoolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
