import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
})
export class PieceComponent implements OnInit, OnChanges {
  @Output() newCoordinatesEvent = new EventEmitter<{}>();
  @Output() errorMessageEvent = new EventEmitter<String>();
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.handleKeyEvent(event);
  }
  @Input() commands = '';
  @Input() preventing: any;
  @Input()
  coordinates = { x: 5, y: 5, d: 'N' };
  @Input()
  dim: any;
  spots: any[] = [];
  cycle = ['N', 'E', 'S', 'W'];
  constructor() {}

  ngOnInit(): void {
    this.generateBoard();
    this.newCoordinatesEvent.emit(this.coordinates);
  }
  ngOnChanges() {
    this.generateBoard();
    if (this.commands !== '') {
      this.executeCommands();
    }
  }

  executeCommands() {
    let newCommands = this.commands;
    for (let i = 0; i < this.commands.length; i++) {
      setTimeout(() => {
        this.executeStep(i, newCommands);
      }, 500 * i);
    }
    this.commands = '';
  }
  executeStep(i, commands) {
    if (commands[i] == 'a' || commands[i] == 'A') {
      this.advance();
    } else if (commands[i] == 'g' || commands[i] == 'G') {
      this.switchDirectionLeft();
    } else if (commands[i] == 'd' || commands[i] == 'D') {
      this.switchDirectionRight();
    }
  }

  generateBoard() {
    this.spots = [];
    let x = 0;
    let y = this.dim.h;
    while (y >= 0) {
      this.spots.push({ x: x, y: y });
      x++;
      if (x === this.dim.w + 1) {
        y--;
        x = 0;
      }
    }
  }
  switchDirectionRight() {
    let directionChanged = false;
    this.cycle.forEach((direction, index) => {
      if (!directionChanged) {
        if (this.coordinates.d === direction) {
          if (index === 3) {
            this.coordinates.d = this.cycle[0];
            directionChanged = true;
            return;
          } else {
            this.coordinates.d = this.cycle[index + 1];
            directionChanged = true;
            return;
          }
        }
      }
    });
  }
  switchDirectionLeft() {
    let directionChanged = false;
    this.cycle.forEach((direction, index) => {
      if (!directionChanged) {
        if (this.coordinates.d === direction) {
          if (index === 0) {
            this.coordinates.d = this.cycle[this.cycle.length - 1];
            directionChanged = true;
            return;
          } else {
            this.coordinates.d = this.cycle[index - 1];
            directionChanged = true;
            return;
          }
        }
      }
    });
  }
  advance() {
    switch (this.coordinates.d) {
      case 'N': {
        if (this.coordinates.y + 1 > this.dim.h) {
          this.errorMessageEvent.emit(
            `Cannot go beyond ${this.coordinates.y} in Y axis`
          );
          break;
        }
        this.coordinates.y += 1;
        this.newCoordinatesEvent.emit(this.coordinates);
        break;
      }

      case 'E': {
        if (this.coordinates.x + 1 > this.dim.w) {
          this.errorMessageEvent.emit(
            `Cannot go beyond ${this.coordinates.x} in X axis`
          );
          break;
        }
        this.coordinates.x += 1;
        this.newCoordinatesEvent.emit(this.coordinates);
        break;
      }
      case 'S': {
        if (this.coordinates.y - 1 < 0) {
          this.errorMessageEvent.emit(
            `Cannot go below ${this.coordinates.y} in Y axis`
          );
          break;
        }
        this.coordinates.y -= 1;
        this.newCoordinatesEvent.emit(this.coordinates);
        break;
      }
      case 'W': {
        if (this.coordinates.x - 1 < 0) {
          this.errorMessageEvent.emit(
            `Cannot go below ${this.coordinates.x} in Y axis`
          );
          break;
        }
        this.coordinates.x -= 1;
        this.newCoordinatesEvent.emit(this.coordinates);
      }
      default: {
        console.log('could not detect coordinates at this time');
      }
    }
  }

  handleKeyEvent(event) {
    if (this.preventing === false) {
      if (event.key == 'a') {
        this.advance();
      }
      if (event.key === 'd' || event.key === 'D') {
        this.switchDirectionRight();
      }

      if (event.key === 'g' || event.key === 'G') {
        this.switchDirectionLeft();
      }
    }
  }
  getWidth() {
    return '11';
  }
}
