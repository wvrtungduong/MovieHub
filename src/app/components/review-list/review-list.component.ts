import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() movieId!: string;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.reviews = this.reviewService.getReviewsForMovie(this.movieId);
  }

  upvote(review: Review): void {
    this.reviewService.upvote(review.id);
    this.load();
  }

  onAdded(): void {
    this.load();
  }

  hasVoted(reviewId: string): boolean {
    return this.reviewService.hasVoted(reviewId);
  }
}
