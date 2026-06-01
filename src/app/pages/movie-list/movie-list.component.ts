import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {
	movies: Movie[] = [];

	constructor(private movieService: MovieService) {}

	ngOnInit(): void {
		this.movieService.getMovies().then((m: Movie[]) => {
			this.movies = m || [];
		}).catch(() => {
			this.movies = [];
		});
	}
}
