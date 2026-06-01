import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  movie: any | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.movieService.getMovies().then((list: any[]) => {
      this.movie = list.find(m => String(m.id) === id) || null;
      if (!this.movie) {
        this.router.navigate(['/']);
      }
    }).catch(() => this.router.navigate(['/']));
  }
}
