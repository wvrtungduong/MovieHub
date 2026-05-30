import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {
	movies: any[] = [];

	constructor(private movieService: MovieService) {}

	ngOnInit(): void {
		this.movieService.getMovies().then((m: any[]) => {
			this.movies = m || [];
		}).catch(() => {
			this.movies = [];
		});
	}
}
