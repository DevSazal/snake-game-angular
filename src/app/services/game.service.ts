import { Injectable } from '@angular/core';
import { SnakeSegment } from '../models/snake.model';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private borderSize = 20;
  private foodTimeout = 5000;
  snake: SnakeSegment[] = [{ x: 10, y: 10 }];
  food: Food | null = null;

  generateFood(): void{
    this.food = {
      x: Math.floor(Math.random() * this.borderSize),
      y: Math.floor(Math.random() * this.borderSize),
      visible: true
    };

    setTimeout(() => {
      if (this.food) this.food.visible = true;
    }, this.foodTimeout);
  }

  moveSnake(direction: string): boolean {
    const head = { ...this.snake[0] };
    if (direction === 'ArrowUp') head.y--;
    if (direction === 'ArrowDown') head.y++;
    if (direction === 'ArrowLeft') head.x--;
    if (direction === 'ArrowRight') head.x++;

    // Check boundaries
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= this.borderSize ||
      head.y >= this.borderSize
    ) {
      return false;
    }

    // Add head and remove tail
    this.snake.unshift(head);
    if (!this.isFoodCollected()) this.snake.pop();
    return true;
  }

  isFoodCollected(): boolean {
    if (
      this.food &&
      this.snake[0].x === this.food.x &&
      this.snake[0].y === this.food.y &&
      this.food.visible
    ) {
      this.food = null;
      return true;
    }
    return false;
  }
}
