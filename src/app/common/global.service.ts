import { Injectable } from '@angular/core';
import { NotificationModel } from './models/notification.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  notification: Subject<NotificationModel> = new Subject<NotificationModel>();
  updateUserType: Subject<string> = new Subject<string>();
  
  private countLoading = 0;

  constructor(
    private translateService: TranslateService,
    protected http: HttpClient
  ) {
  }

  showError(message: string, translate = true) {
    if (translate) {
      message = this.translateService.instant(message);
    }
    this.notification.next({ type: 'error', message: message });
  }

  showSuccess(message: string, translate = true) {
    if (translate) {
      message = this.translateService.instant(message);
    }
    this.notification.next({ type: 'success', message: message });
  }

  loading() {
    this.countLoading++;
    this.loader.next(!!this.countLoading);
  }

  loaded() {
    this.countLoading--;
    this.loader.next(!!this.countLoading);
  }
}
