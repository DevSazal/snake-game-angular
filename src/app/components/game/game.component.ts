import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ScoreService } from '../../services/score.service';
import { PlaygroundComponent } from '../playground/playground.component';

@Component({
  selector: 'app-game',
  imports: [PlaygroundComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent  implements OnInit  {
  score: number = 0;
  remainingTime = 15;

  constructor(
    public gameService: GameService,
    private scoreService: ScoreService
  ) {
    this.score = this.scoreService.getScore();
    this.gameService.generateFood();
  }

  ngOnInit(): void {
    this.resetGame();
    // subscribe to foodCollected$ to track food collection
    this.gameService.foodCollected$.subscribe((isCollected) => {
      if (isCollected) {
        this.handleFoodCollected();
      }
    });

    // Handle game over
    this.gameService.gameOver$.subscribe((isGameOver) => {
      if (isGameOver) {
        this.handleGameOver();
      }
    });

    // Subscribe to the remaining time
    this.gameService.remainingTime$.subscribe((time) => {
      this.remainingTime = time;
    });
  }

  onDirectionChange(direction: string): void {
    if (!this.gameService.moveSnake(direction)) {
      alert('Game Over!! Collision detected with walls or itself.');
      this.resetGame();
    }
  }

  handleGameOver(): void {
    alert('Game Over! Timeout...');
    this.resetGame();
  }

  handleFoodCollected(): void {
    this.score += 10;
    this.scoreService.updateScore(this.score);
    this.gameService.resetFoodCollected(); // Reset the value to false
    this.gameService.generateFood();
  }

  resetGame(): void {
    this.score = 0;
    this.remainingTime = 15; // Reset timer display
    this.scoreService.updateScore(this.score);
    this.gameService.snake = [
      { x: 10, y: 10 },
      { x: 10, y: 9 },
      { x: 10, y: 8 }
    ];
    this.gameService.generateFood();
  }

}
