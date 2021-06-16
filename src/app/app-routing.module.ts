import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {MovieListComponent} from './pages/movie-list/movie-list.component';
import {MovieEditComponent} from './pages/movie-edit/movie-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'movie-edit', component: MovieEditComponent},
  {path: 'movie-edit/:id', component: MovieEditComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
