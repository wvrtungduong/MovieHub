import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly storageKey = 'favorite-movie-ids';

  constructor(private storage: LocalStorageService) {}

  getFavorites(): number[] {
    return this.storage.get<number[]>(this.storageKey, []);
  }

  isFavorite(movieId: number): boolean {
    return this.getFavorites().includes(movieId);
  }

  toggle(movieId: number): boolean {
    const current = this.getFavorites();
    const next = current.includes(movieId)
      ? current.filter(id => id !== movieId)
      : [...current, movieId];

    this.storage.set(this.storageKey, next);
    return next.includes(movieId);
  }
}
