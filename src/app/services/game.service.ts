import { Injectable } from '@angular/core';
import { SnakeSegment } from '../models/snake.model';
import { Food } from '../models/food.model';
import { ScoreService } from './score.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private foodCollectedSubject = new Subject<boolean>();
  foodCollected$: Observable<boolean> = this.foodCollectedSubject.asObservable();

  private gameOverSubject = new BehaviorSubject<boolean>(false);
  gameOver$: Observable<boolean> = this.gameOverSubject.asObservable();

  private remainingTimeSubject = new BehaviorSubject<number>(15);
  remainingTime$: Observable<number> = this.remainingTimeSubject.asObservable();

  private borderSize = 20;
  snake: SnakeSegment[] = [
    { x: 10, y: 10 },
    { x: 10, y: 9 },
    { x: 10, y: 8 }
  ];
  food: Food | null = null;

  foodTimeout = 15000; // 15 seconds
  private foodTimer: any;
  private countdownTimer: any;

  constructor(private scoreService: ScoreService){}

  /**
   * Generate food position and ensure it doesn't overlap with the snake
   */
  generateFood(): void{
    const isFoodOnSnake = (x: number, y: number): boolean => {
      return this.snake.some(segment => segment.x === x && segment.y === y);
    };

    // Generate valid food position
    do {
      this.food = {
        x: Math.floor(Math.random() * this.borderSize),
        y: Math.floor(Math.random() * this.borderSize),
        visible: true,
      };
    } while (isFoodOnSnake(this.food.x, this.food.y));

    this.resetCountdown();

    // Set timeout for food collection
    clearTimeout(this.foodTimer);
    this.foodTimer = setTimeout(() => {
      if (this.food) {
        this.triggerGameOver();
      }
    }, this.foodTimeout);
  }

  /**
   * Moves the snake in the specified direction and handles collision logic.
   * @param direction - Direction to move ('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
   * @returns Whether the move was successful.
   */
  moveSnake(direction: string): boolean {
    const head = { ...this.snake[0] };
    if (direction === 'ArrowUp') head.x--;
    if (direction === 'ArrowDown') head.x++;
    if (direction === 'ArrowLeft') head.y--;
    if (direction === 'ArrowRight') head.y++;

    // Check for collision with borders
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= this.borderSize ||
      head.y >= this.borderSize
    ) {
      return false;
    }

    // Check if the snake's head collides with the body
    if (this.checkCollision(head)) return false;

    this.snake.unshift(head);
    if (!this.isFoodCollected()) this.snake.pop();
    return true;
  }

  /**
   * Checks if the snake's head position collides with its body.
   * @param head - The new head position.
   * @returns True if collision occurs, false otherwise.
   */
  checkCollision(head: SnakeSegment): boolean {
    return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
  }

  /**
   * Checks if the snake has collected the food.
   * @returns True if food collected, false otherwise.
   */
  isFoodCollected(): boolean {
    if (
      this.food &&
      this.snake[0].x === this.food.x &&
      this.snake[0].y === this.food.y &&
      this.food.visible
    ) {
      this.food = null;
      clearTimeout(this.foodTimer); // Stop food timeout
      clearInterval(this.countdownTimer); // Stop countdown
      this.foodCollectedSubject.next(true); // Notify subscribers
      return true;
    }

    return false;
  }

  resetFoodCollected(): void {
    this.foodCollectedSubject.next(false);
  }

  /**
   * Resets the countdown timer for food collection.
   */
  private resetCountdown(): void {
    clearInterval(this.countdownTimer);
    let remainingTime = this.foodTimeout / 1000;
    this.remainingTimeSubject.next(remainingTime);

    this.countdownTimer = setInterval(() => {
      remainingTime -= 1;
      this.remainingTimeSubject.next(remainingTime);
      if (remainingTime <= 0) clearInterval(this.countdownTimer); // stop countdown at 0
    }, 1000);
  }

  /**
   * Triggers the game over state.
   */
  private triggerGameOver(): void {
    clearTimeout(this.foodTimer);
    clearInterval(this.countdownTimer);
    this.gameOverSubject.next(true);
  }
}
