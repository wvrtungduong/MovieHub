import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private storage: LocalStorageService) {}

  getMovies(): Promise<Movie[]> {
    this.storage.seedMockReviews();

    return fetch('/assets/data/movies.json')
      .then(r => r.json())
      .then((movies: Movie[]) => movies.map(movie => ({
        ...movie,
        averageRating: this.storage.getAverageRating(movie.id)
      })));
  }
}
