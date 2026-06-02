import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() movieId!: string;
  @Output() averageChanged = new EventEmitter<number>();
  reviews: Review[] = [];

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.storage.seedMockReviews();
    this.load();
  }

  load(): void {
    const all = this.storage.getReviews();
    this.reviews = all.filter(r => r.movieId === this.movieId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    this.averageChanged.emit(this.storage.getAverageRating(this.movieId));
  }

  upvote(review: Review): void {
    const votedReviewIds = this.storage.getVotedReviewIds();
    if (votedReviewIds.includes(review.id)) {
      return;
    }

    const all = this.storage.getReviews();
    const found = all.find(item => item.id === review.id);
    if (!found) {
      return;
    }

    found.upvotes = (found.upvotes || 0) + 1;
    this.storage.saveReviews(all);
    this.storage.saveVotedReviewIds([...votedReviewIds, review.id]);
    this.load();
  }

  onAdded(): void {
    this.load();
  }

  hasVoted(reviewId: string): boolean {
    return this.storage.getVotedReviewIds().includes(reviewId);
  }
}
