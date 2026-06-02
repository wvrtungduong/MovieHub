import { Injectable } from '@angular/core';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly reviewsKey = 'reviews';
  private readonly votedReviewIdsKey = 'voted-review-ids';

  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : fallback;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  }

  getReviews(): Review[] {
    return this.get<Review[]>(this.reviewsKey, []);
  }

  saveReviews(reviews: Review[]): void {
    this.set<Review[]>(this.reviewsKey, reviews);
  }

  getVotedReviewIds(): string[] {
    return this.get<string[]>(this.votedReviewIdsKey, []);
  }

  saveVotedReviewIds(ids: string[]): void {
    this.set<string[]>(this.votedReviewIdsKey, ids);
  }

  getAverageRating(movieId: string | number): number {
    const reviews = this.getReviews().filter(review => String(review.movieId) === String(movieId));
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }
}
