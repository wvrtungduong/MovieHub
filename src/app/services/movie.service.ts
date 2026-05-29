import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieService {
  getMovies() {
    return fetch('/assets/data/movies.json').then(r => r.json());
  }
}
