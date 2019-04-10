import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './global.service';
import { throwError } from 'rxjs';

/**
 * Default error handler
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  constructor(private router: Router,
    private globalService: GlobalService
  ) {
  }

  /**
   * Handle error function
   * @param {Response} error
   * @return {any}
   */
  public handleError(error: HttpErrorResponse): any {
    let message = error.message;
    if (error.error) {
      message = error.error.message;
      if (error.error.errors) {
        for (let index = 0; index < error.error.errors.length; index++) {
          if (error.error.errors[index].message) {
            message = message + '<br />' + '- ' + error.error.errors[index].message;
          }
        }
      }
    }

    if (error.status === 401) {
      // Logout
      //this.globalService.updateUserType.next(USER_TYPE.None);
    } else if (error.status >= 500) {
      this.globalService.showError('Common.Error500');
    } else {
      this.globalService.showError(message, false);
    }
    return throwError(error);
  }
}
