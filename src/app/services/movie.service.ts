import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  getMovies(): Promise<Movie[]> {
    return fetch('/assets/data/movies.json').then(r => r.json());
  }
}
