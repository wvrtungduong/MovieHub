export interface Review {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  upvotes: number;
  createdAt: string; // ISO string
}
