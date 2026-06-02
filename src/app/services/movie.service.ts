import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { ReviewService } from './review.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private reviewService: ReviewService) {}

  getMovies(): Promise<Movie[]> {
    return fetch('/assets/data/movies.json')
      .then(r => r.json())
      .then((movies: Movie[]) => movies.map(movie => ({
        ...movie,
        averageRating: this.reviewService.getAverageRating(movie.id)
      })));
  }
}
