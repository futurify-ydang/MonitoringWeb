import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  loading = false;
  loadingSubscription: Subscription;
  constructor(private _loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingSubscription = this._loadingService.loadingStatus
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.loading = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
