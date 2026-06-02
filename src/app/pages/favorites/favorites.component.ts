import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { FavoriteService } from '../../services/favorite.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(private movieService: MovieService, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.movieService.getMovies().then(movies => {
      const favorites = this.favoriteService.getFavorites();
      this.favoriteMovies = movies.filter(movie => favorites.includes(movie.id));
    }).catch(() => {
      this.favoriteMovies = [];
    });
  }
}
