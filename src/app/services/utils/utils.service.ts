import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private scnackBar: MatSnackBar) {
  }

  /**
   * Shows a simple message to the yser
   */
  showMessage(msg: string, action: string = 'X'): void {
    this.scnackBar.open(msg, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}

