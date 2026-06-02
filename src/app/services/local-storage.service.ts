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

  seedMockReviews(): void {
    if (this.getReviews().length > 0) {
      return;
    }

    this.saveReviews([
      { id: 'rvw-101', movieId: '1', author: 'Mina', rating: 5, comment: 'Beautiful visuals and a surprisingly emotional ending.', upvotes: 8, createdAt: '2026-05-30T15:12:22+07:00' },
      { id: 'rvw-102', movieId: '1', author: 'Jon', rating: 4, comment: 'The world-building is strong and the pacing stays tight.', upvotes: 4, createdAt: '2026-05-30T18:41:05+07:00' },
      { id: 'rvw-201', movieId: '2', author: 'Rhea', rating: 4, comment: 'A tense little thriller with a great sense of place.', upvotes: 6, createdAt: '2026-05-30T16:23:44+07:00' },
      { id: 'rvw-202', movieId: '2', author: 'Leo', rating: 5, comment: 'Lean, moody, and easy to get pulled into from the first scene.', upvotes: 5, createdAt: '2026-05-30T21:03:18+07:00' },
      { id: 'rvw-301', movieId: '3', author: 'Ari', rating: 4, comment: 'Warm, quiet, and easy to recommend for a relaxed night.', upvotes: 3, createdAt: '2026-05-31T11:03:10+07:00' },
      { id: 'rvw-302', movieId: '3', author: 'Maya', rating: 4, comment: 'A small story that stays with you longer than expected.', upvotes: 2, createdAt: '2026-05-31T19:12:56+07:00' },
      { id: 'rvw-401', movieId: '4', author: 'Sana', rating: 5, comment: 'Fast, stylish, and the action scenes are easy to follow.', upvotes: 10, createdAt: '2026-05-31T20:17:39+07:00' },
      { id: 'rvw-402', movieId: '4', author: 'Tess', rating: 4, comment: 'The pacing never drags and the set pieces land well.', upvotes: 4, createdAt: '2026-05-31T22:08:03+07:00' },
      { id: 'rvw-501', movieId: '5', author: 'Ivy', rating: 5, comment: 'A quiet drama with excellent performances and atmosphere.', upvotes: 9, createdAt: '2026-06-01T09:44:25+07:00' },
      { id: 'rvw-502', movieId: '5', author: 'Noah', rating: 4, comment: 'Elegant and thoughtful, especially in the final act.', upvotes: 6, createdAt: '2026-06-01T18:36:14+07:00' }
    ]);
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
