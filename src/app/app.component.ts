import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yanport-test-technique';

  dim = { w: 10, h: 10 };
  currentCoordinates = { x: 5, y: 5, d: 'N' };
  preventing = false;
  commandsC = '';
  constructor(
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  getCoordinates(event) {
    this.currentCoordinates = event;
    this.cdRef.detectChanges();
  }

  randomizeDim() {
    let width = Math.random() * (30 - 5) + 5;
    let height = Math.random() * (30 - 5) + 5;
    let newDim = { ...this.dim };
    newDim.w = Math.floor(width);
    newDim.h = Math.floor(height);
    this.dim = newDim;
  }

  changeWidth(width) {
    if (parseInt(width.value)) {
      let newDim = { ...this.dim };
      newDim.w = parseInt(width.value);
      this.dim = newDim;
    } else {
      this._snackBar.open(`Width cannot have an empty value`, 'OK', {
        duration: 2000,
      });
      width.value = '';
    }
  }

  changeHeight(height) {
    if (parseInt(height.value)) {
      let newDim = { ...this.dim };
      newDim.h = parseInt(height.value);
      this.dim = newDim;
    } else {
      this._snackBar.open(`Height cannot have an empty value`, 'OK', {
        duration: 2000,
      });
      height.value = '';
    }
  }

  handleWidthChange(width) {
    if (width.value.slice(-1) < '0' || width.value.slice(-1) > '9') {
      let newWidth = width.value.slice(0, -1);
      width.value = newWidth;
    }
  }
  handleHeightChange(height) {
    if (height.value.slice(-1) < '0' || height.value.slice(-1) > '9') {
      let newX = height.value.slice(0, -1);
      height.value = newX;
    }
  }
  handleXCooChange(xCoo) {
    if (xCoo.value.slice(-1) < '0' || xCoo.value.slice(-1) > '9') {
      let newX = xCoo.value.slice(0, -1);
      xCoo.value = newX;
    }
  }
  handleYCooChange(yCoo) {
    if (yCoo.value.slice(-1) < '0' || yCoo.value.slice(-1) > '9') {
      let newY = yCoo.value.slice(0, -1);
      yCoo.value = newY;
    }
  }

  applyDim(width, height) {
    this.changeWidth(width);
    this.changeHeight(height);
  }
  applyCoo(xCoo, yCoo, dir) {
    if (parseInt(xCoo.value) > this.dim.w || parseInt(xCoo.value) < 0) {
      this._snackBar.open(
        `X Coordinate cannot be beyond limits of the piece`,
        'OK',
        {
          duration: 2000,
        }
      );
      xCoo.value = '';
      return;
    }
    if (parseInt(yCoo.value) > this.dim.h || parseInt(yCoo.value) < 0) {
      this._snackBar.open(
        `Y Coordinate cannot be beyond limits of the piece`,
        'OK',
        {
          duration: 2000,
        }
      );
      yCoo.value = '';
      return;
    }
    if (parseInt(xCoo.value) >= 0 && parseInt(yCoo.value) >= 0) {
      let newCoo = { ...this.currentCoordinates };
      newCoo.x = parseInt(xCoo.value);
      newCoo.y = parseInt(yCoo.value);
      newCoo.d = dir.value;
      this.currentCoordinates = newCoo;
    } else {
      this._snackBar.open(`X and Y cannot have an empty value`, 'OK', {
        duration: 2000,
      });
    }
  }

  toggleKeyboardControls() {
    this.preventing = !this.preventing;
  }

  handleCommands(commands) {
    if (
      commands.value.slice(-1) !== 'D' &&
      commands.value.slice(-1) !== 'd' &&
      commands.value.slice(-1) !== 'G' &&
      commands.value.slice(-1) !== 'g' &&
      commands.value.slice(-1) !== 'A' &&
      commands.value.slice(-1) !== 'a'
    ) {
      commands.value = commands.value.slice(0, -1);
    }
  }

  executeCommand(commands) {
    if (commands.value !== '') {
      this.commandsC = commands.value;
      this.cdRef.detectChanges();
      commands.value = '';
    }
  }

  displaySnackBar(event) {
    this._snackBar.open(event, 'OK', {
      duration: 2000,
    });
  }
}
