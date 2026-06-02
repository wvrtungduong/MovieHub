import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Movie } from '../../models/movie';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
	@Input() movie!: Movie;
	isFavorite = false;

	constructor(private favorites: FavoriteService) {}

	ngOnInit(): void {
		this.isFavorite = this.favorites.isFavorite(Number(this.movie?.id));
	}

	toggleFavorite(): void {
		this.isFavorite = this.favorites.toggle(Number(this.movie.id));
	}
}
