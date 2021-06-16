import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils/utils.service';
import {MatDialog} from '@angular/material/dialog';
import {MoviesService} from '../../services/movies/movies.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  movieForm: FormGroup;
  isEdit = false;

  constructor(private router: Router,
              private utils: UtilsService,
              private movieService: MoviesService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {

    this.movieForm = this.formBuilder.group({
      id: [Date.now()],
      name: ['', Validators.compose([Validators.required])],
      year: ['2021', Validators.compose([Validators.required])],
      director: ['', Validators.compose([Validators.required])],
      genre: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      poster: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.getMovie(params.id);
      }
    });
  }

  saveMovie(): void {
    this.movieService.createOrUpdate(this.movieForm.value);
    this.utils.showMessage('Filme salvo com sucesso!');
    this.router.navigate(['/movie-list']);
  }

  getMovie(id: string): void {
    const movie = this.movieService.getById(Number(id));
    this.isEdit = !!movie;
    this.movieForm.patchValue(movie);
  }

}
