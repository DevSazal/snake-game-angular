import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SnakeSegment } from '../../models/snake.model';
import { Food } from '../../models/food.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playground',
  imports: [CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {
  @Input() snake: SnakeSegment[] = [];
  @Input() food: Food | null = null;
  @Output() directionChange = new EventEmitter<string>();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (directions.includes(event.key)) {
      this.directionChange.emit(event.key);
    }
  }

  isSnakeSegment(x: number, y: number): boolean {
    return this.snake.some(segment => segment.x === x && segment.y === y);
  }

  isSnakeHead(x: number, y: number): boolean {
    return this.snake[0]?.x === x && this.snake[0]?.y === y;
  }

  isFood(x: number, y: number): boolean {
    return this.food?.x === x && this.food?.y === y && this.food?.visible || false;
  }

}
