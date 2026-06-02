import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() movieId!: string;
  reviews: Review[] = [];
  votedReviewIds: string[] = [];

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.seedReviewsIfNeeded();
    this.votedReviewIds = this.storage.get<string[]>('voted-review-ids', []);
    this.load();
  }

  load() {
    const all = this.storage.get<Review[]>('reviews', []);
    this.reviews = all.filter(r => r.movieId === this.movieId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  seedReviewsIfNeeded(): void {
    const existing = this.storage.get<Review[]>('reviews', []);
    if (existing.length > 0) {
      return;
    }

    this.storage.set<Review[]>('reviews', [
      {
        id: 'rvw-101',
        movieId: '1',
        author: 'Mina',
        rating: 5,
        comment: 'Beautiful visuals and a surprisingly emotional ending.',
        upvotes: 8,
        createdAt: '2026-05-30T15:12:22+07:00'
      },
      {
        id: 'rvw-102',
        movieId: '1',
        author: 'Jon',
        rating: 4,
        comment: 'The world-building is strong and the pacing stays tight.',
        upvotes: 4,
        createdAt: '2026-05-30T18:41:05+07:00'
      },
      {
        id: 'rvw-201',
        movieId: '2',
        author: 'Rhea',
        rating: 4,
        comment: 'A tense little thriller with a great sense of place.',
        upvotes: 6,
        createdAt: '2026-05-30T16:23:44+07:00'
      },
      {
        id: 'rvw-301',
        movieId: '3',
        author: 'Ari',
        rating: 4,
        comment: 'Warm, quiet, and easy to recommend for a relaxed night.',
        upvotes: 3,
        createdAt: '2026-05-31T11:03:10+07:00'
      },
      {
        id: 'rvw-401',
        movieId: '4',
        author: 'Sana',
        rating: 5,
        comment: 'Fast, stylish, and the action scenes are easy to follow.',
        upvotes: 10,
        createdAt: '2026-05-31T20:17:39+07:00'
      }
    ]);
  }

  upvote(r: Review) {
    if (this.votedReviewIds.includes(r.id)) {
      return;
    }

    const all = this.storage.get<Review[]>('reviews', []);
    const found = all.find(x => x.id === r.id);
    if (found) {
      found.upvotes = (found.upvotes || 0) + 1;
      this.storage.set('reviews', all);
      this.votedReviewIds = [...this.votedReviewIds, r.id];
      this.storage.set('voted-review-ids', this.votedReviewIds);
      this.load();
    }
  }

  onAdded() {
    this.load();
  }

  hasVoted(reviewId: string): boolean {
    return this.votedReviewIds.includes(reviewId);
  }
}
