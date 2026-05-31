import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html'
})
export class ReviewListComponent implements OnInit {
  @Input() movieId!: string;
  reviews: Review[] = [];

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    const all = this.storage.get<Review[]>('reviews', []);
    this.reviews = all.filter(r => r.movieId === this.movieId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  upvote(r: Review) {
    const all = this.storage.get<Review[]>('reviews', []);
    const found = all.find(x => x.id === r.id);
    if (found) {
      found.upvotes = (found.upvotes || 0) + 1;
      this.storage.set('reviews', all);
      this.load();
    }
  }

  onAdded() {
    this.load();
  }
}
