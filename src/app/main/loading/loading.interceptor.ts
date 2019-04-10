import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Observable, pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GlobalService } from 'app/common/global.service';
import { Router } from '@angular/router';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    activeRequests = 0;
    apiHost = API_USERMANAGEMENT_HOST;
    /**
     * URLs for which the loading screen should not be enabled
     */
    skipUrls: string[] = [
        this.apiHost + "/api/profile/summary-profile"
    ];
    
    constructor(
        private _loadingService: LoadingService,
        private _router: Router
    ){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let displayLoading = true;

        for (const skipUrl of this.skipUrls) {
            if (new RegExp(skipUrl).test(request.url)){
                displayLoading = false;
                break;
            }
        }

        if (displayLoading){
            if (this.activeRequests === 0) {
                this._loadingService.startLoading();
            }
            this.activeRequests++;
            return next.handle(request)
                .pipe(
                    finalize(() => {
                        this.activeRequests--;
                        if (this.activeRequests === 0){
                            this._loadingService.stopLoading();
                        }
                    })
                );
        } else {
            return next.handle(request);
        }
    }
}
