import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly reviewsKey = 'reviews';
  private readonly votedReviewIdsKey = 'voted-review-ids';
  private readonly legacySeedReviewIds = [
    'rvw-101',
    'rvw-102',
    'rvw-103',
    'rvw-201',
    'rvw-202',
    'rvw-301',
    'rvw-302',
    'rvw-401',
    'rvw-402',
    'rvw-501',
    'rvw-502'
  ];

  constructor(private storage: LocalStorageService) {
    this.purgeLegacySeedReviews();
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
    const reviews = this.getReviewsForMovie(movieId).filter(review => this.isValidRating(review.rating));
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;
    return Math.round(Math.min(5, Math.max(0, average)) * 10) / 10;
  }

  addReview(review: Review): void {
    const allReviews = this.getReviews();
    allReviews.push(this.normalizeReview(review));
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

  private isValidRating(rating: unknown): rating is number {
    return typeof rating === 'number' && Number.isFinite(rating) && rating >= 1 && rating <= 5;
  }

  private normalizeReview(review: Review): Review {
    const normalizedRating = this.isValidRating(review.rating) ? review.rating : 0;
    return {
      ...review,
      movieId: String(review.movieId),
      author: review.author.trim(),
      comment: review.comment.trim(),
      rating: normalizedRating,
      upvotes: Number.isFinite(review.upvotes) && review.upvotes > 0 ? Math.floor(review.upvotes) : 0,
      createdAt: review.createdAt || new Date().toISOString()
    };
  }

  private purgeLegacySeedReviews(): void {
    const existingReviews = this.getReviews();
    const filteredReviews = existingReviews.filter(review => !this.legacySeedReviewIds.includes(review.id));
    if (filteredReviews.length !== existingReviews.length) {
      this.storage.set(this.reviewsKey, filteredReviews);
    }

    const votedReviewIds = this.storage.get<string[]>(this.votedReviewIdsKey, []);
    const filteredVotedReviewIds = votedReviewIds.filter(reviewId => !this.legacySeedReviewIds.includes(reviewId));
    if (filteredVotedReviewIds.length !== votedReviewIds.length) {
      this.storage.set(this.votedReviewIdsKey, filteredVotedReviewIds);
    }
  }
}
