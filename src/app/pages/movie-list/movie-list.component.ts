import {Component, OnInit, TemplateRef} from '@angular/core';
import {MoviesService} from '../../services/movies/movies.service';
import {UtilsService} from '../../services/utils/utils.service';
import {MatDialog} from '@angular/material/dialog';
import IMovie from '../../models/interface/movie.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: IMovie[] = [];
  allMoviesList: IMovie[] = [];
  searchForm: FormGroup;

  constructor(
    private movieService: MoviesService,
    private utils: UtilsService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {

    this.searchForm = this.formBuilder.group({
      searchField: ['']
    });

    this.formSubscriberValues();
  }

  ngOnInit(): void {
    this.getAllMovies();
  }

  formSubscriberValues(): void {
    this.searchForm.controls.searchField.valueChanges.subscribe(search => {
      if (search && typeof search === 'string' && search.trim() !== '') {

        this.movieList = this.allMoviesList.filter((movie) => {
          return (movie.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
        });

      } else {
        this.movieList = this.allMoviesList;
      }
    });
  }

  getAllMovies(): void {
    this.movieList = this.movieService.getAll() || [];
    this.allMoviesList = this.movieList;
  }

  deleteMovie(movie: IMovie): void {
    this.movieService.delete(movie.id);
    this.getAllMovies();
    this.utils.showMessage('Filme deletado com sucesso!');
  }

  deleteMovieAlert(template: TemplateRef<any>, data: IMovie): void {
    this.dialog.open(template, {data});
  }
}
