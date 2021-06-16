import {Injectable} from '@angular/core';
import IMovie from '../../models/interface/movie.model';
import {movies} from './filmes.json';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies: IMovie[];

  constructor() {
    this.movies = movies;
  }

  /**
   * Create or update a movie.
   * @param movie A IMovie.
   * @returns IMovie that returns a IMovie.
   */
  createOrUpdate(movie: IMovie): IMovie {
    const findMovie = this.movies.find(movieItem => movieItem?.id === movie?.id);

    if (findMovie) {
      this.movies = this.movies.map(movieItem => {
        if (movieItem.id === movie?.id) {
          movieItem = movie;
        }

        return movieItem;
      });
    } else {
      this.movies = [...this.movies, movie];
    }

    return movie;
  }

  /**
   * Get all movies
   * @returns IMovies array.
   */
  getAll(): IMovie[] {
    return this.movies || [];
  }

  /**
   * Get one movies
   * @param id The movie ID.
   * @returns IMovies that returns a IMovie or undefined.
   */
  getById(id: number): IMovie {
    return this.movies.find(movieItem => movieItem?.id === id);
  }

  /**
   * Delete one movie
   * @param id of the movie.
   * @returns string with a message.
   */
  delete(id: number): string {
    this.movies = this.movies.filter(movieItem => movieItem?.id !== id);
    return 'Filme deletado com sucesso';
  }


}
