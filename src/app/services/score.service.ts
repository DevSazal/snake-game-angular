import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreKey = 'snakeScore';

  getScore(): number {
    return parseInt(localStorage.getItem(this.scoreKey) || '0', 10);
  }

  updateScore(score: number): void {
    localStorage.setItem(this.scoreKey, score.toString());
  }
}
