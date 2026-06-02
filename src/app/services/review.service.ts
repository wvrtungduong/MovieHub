import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly reviewsKey = 'reviews';
  private readonly votedReviewIdsKey = 'voted-review-ids';

  constructor(private storage: LocalStorageService) {
    this.seedMockReviews();
  }

  getReviews(): Review[] {
    return this.storage.get<Review[]>(this.reviewsKey, []);
  }

  getReviewsForMovie(movieId: string | number): Review[] {
    const targetMovieId = String(movieId);
    return this.getReviews()
      .filter(review => review.movieId === targetMovieId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getAverageRating(movieId: string | number): number {
    const reviews = this.getReviewsForMovie(movieId);
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }

  addReview(review: Review): void {
    const allReviews = this.getReviews();
    allReviews.push(review);
    this.storage.set(this.reviewsKey, allReviews);
  }

  upvote(reviewId: string): boolean {
    const votedReviewIds = this.storage.get<string[]>(this.votedReviewIdsKey, []);
    if (votedReviewIds.includes(reviewId)) {
      return false;
    }

    const allReviews = this.getReviews();
    const foundReview = allReviews.find(review => review.id === reviewId);
    if (!foundReview) {
      return false;
    }

    foundReview.upvotes = (foundReview.upvotes || 0) + 1;
    this.storage.set(this.reviewsKey, allReviews);
    this.storage.set(this.votedReviewIdsKey, [...votedReviewIds, reviewId]);
    return true;
  }

  hasVoted(reviewId: string): boolean {
    const votedReviewIds = this.storage.get<string[]>(this.votedReviewIdsKey, []);
    return votedReviewIds.includes(reviewId);
  }

  seedMockReviews(): void {
    if (this.getReviews().length > 0) {
      return;
    }

    this.storage.set<Review[]>(this.reviewsKey, [
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
        id: 'rvw-103',
        movieId: '1',
        author: 'Priya',
        rating: 5,
        comment: 'I liked how the ending paid off every little detail.',
        upvotes: 6,
        createdAt: '2026-06-01T09:08:41+07:00'
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
        id: 'rvw-202',
        movieId: '2',
        author: 'Sam',
        rating: 4,
        comment: 'Solid suspense throughout and a strong lead performance.',
        upvotes: 5,
        createdAt: '2026-06-01T12:14:09+07:00'
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
        id: 'rvw-302',
        movieId: '3',
        author: 'Tess',
        rating: 4,
        comment: 'A simple story, but it lands every emotional beat nicely.',
        upvotes: 2,
        createdAt: '2026-06-01T15:44:28+07:00'
      },
      {
        id: 'rvw-401',
        movieId: '4',
        author: 'Sana',
        rating: 5,
        comment: 'Fast, stylish, and the action scenes are easy to follow.',
        upvotes: 10,
        createdAt: '2026-05-31T20:17:39+07:00'
      },
      {
        id: 'rvw-402',
        movieId: '4',
        author: 'Lee',
        rating: 4,
        comment: 'It keeps the momentum going without feeling noisy or messy.',
        upvotes: 7,
        createdAt: '2026-06-01T18:05:13+07:00'
      },
      {
        id: 'rvw-501',
        movieId: '5',
        author: 'Noah',
        rating: 5,
        comment: 'Quiet, tender, and the festival setting feels alive.',
        upvotes: 9,
        createdAt: '2026-06-01T10:22:56+07:00'
      },
      {
        id: 'rvw-502',
        movieId: '5',
        author: 'Mira',
        rating: 4,
        comment: 'A warm family drama with a strong sense of place.',
        upvotes: 5,
        createdAt: '2026-06-01T20:34:17+07:00'
      }
    ]);
  }
}
