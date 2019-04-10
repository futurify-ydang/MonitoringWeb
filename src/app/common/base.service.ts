import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { shareReplay, timeout, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { GlobalService } from './global.service';

import {  REQUEST_TIMEOUT, API_USERMANAGEMENT_HOST } from '../app.constant';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { throwError, of } from 'rxjs';
import { LocalService } from './local.service';

@Injectable()
export class BaseService {
    static defaultHeader = {
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '3600',
    };
    static formdataHeader = {
        'enctype': 'multipart/form-data'
    };
    private caches = {};
    protected apiHost = API_USERMANAGEMENT_HOST;
    protected headers: HttpHeaders;

    public createAPIURL(path: string): string {
        return this.apiHost + path;
    }

    constructor(protected http: HttpClient,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
        ) {
        this.headers = new HttpHeaders(BaseService.defaultHeader);
    }

    public get(url: string, params?: HttpParams | any, loader = true, cache = false): Observable<Object | any> {
        this.loadToken();

        if (cache && this.caches[url]) {
            if (loader) {
                this.globalService.loading();
            }
            return this.caches[url];
        }

        const fullUrl = this.createAPIURL(url);
        let request: Observable<Object>;
        if (loader) {
            this.globalService.loading();
            request = this.http.get(fullUrl, { headers: this.headers, params: params })
                .pipe(shareReplay(1),
                    timeout(REQUEST_TIMEOUT)
                )
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            request = this.http.get(fullUrl, { headers: this.headers, params: params })
                .pipe(shareReplay(1),
                    timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error));
        }

        if (cache) {
            this.caches[url] = request;
        }
        return request;
    }

    public post(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
        this.loadToken();

        const fullUrl = this.createAPIURL(url);
        if (loader) {
            this.globalService.loading();
            return this.http.post(fullUrl, params, { headers: this.headers })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch((error) => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.post(fullUrl, params, { headers: this.headers })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error));
        }
    }
    public postDownloadExcelFile(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
        this.loadToken();
        const fullUrl = this.createAPIURL(url);
        if (loader) {
            this.globalService.loading();
            return this.http.post(fullUrl, params, {headers:  this.headers, responseType: 'blob'})
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch((error) => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.post(fullUrl, params, {headers:  this.headers, responseType: 'blob'})
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error));
        }
    }
    public put(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
        this.loadToken();

        const fullUrl = this.createAPIURL(url);
        if (loader) {
            this.globalService.loading();
            return this.http.put(fullUrl, params, { headers: this.headers })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.put(fullUrl, params, { headers: this.headers })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error));
        }
    }

    public remove(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
        this.loadToken();

        const fullUrl = this.createAPIURL(url);
        if (loader) {
            this.globalService.loading();
            return this.http.request('delete', fullUrl, { headers: this.headers, body: params })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.request('delete', fullUrl, { headers: this.headers, body: params })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error));
        }
    }

    protected putFormData(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
        const token =  this.localSerivce.getAccessToken();
        this.headers = new HttpHeaders({
            ...BaseService.formdataHeader,
            ...{ 'Authorization': `Bearer ${token}` }
        });

        const body = this.parseFormdata(params);
        const fullUrl = this.createAPIURL(url);
        if (!loader) {
            this.globalService.loading();
            return this.http.put(fullUrl, body, { headers: this.headers })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.put(fullUrl, body, { headers: this.headers })
                .pipe(timeout(REQUEST_TIMEOUT))
                .catch(error => this.handleError(error));
        }
    }

    public postFormData(url: string, params?: HttpParams | any, loader = true): Observable<Object | any> {
        const token =  this.localSerivce.getAccessToken();
        this.headers = new HttpHeaders({
            ...BaseService.formdataHeader,
            ...{ 'Authorization': `Bearer ${token}` }
        });

        const body = this.parseFormdata(params);
        const fullUrl = this.createAPIURL(url);

        if (loader) {
            this.globalService.loading();
            return this.http.post(fullUrl, body, { headers: this.headers })
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.post(fullUrl, body, { headers: this.headers })
                .catch(error => this.handleError(error));
        }
    }

    public postWithFormData(url: string, formData: FormData, loader = true): Observable<Object | any> {
        const token =  this.localSerivce.getAccessToken();
        this.headers = new HttpHeaders({
            ...BaseService.formdataHeader,
            ...{ 'Authorization': `Bearer ${token}` },
        });
        const fullUrl = this.createAPIURL(url);

        if (loader) {
            this.globalService.loading();
            return this.http.post(fullUrl, formData, { headers: this.headers })
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.post(fullUrl, formData, { headers: this.headers })
                .catch(error => this.handleError(error));
        }
    }
    public putWithFormDataResText(url: string, formData: FormData, loader = true): Observable<Object | any> {
        const token =  this.localSerivce.getAccessToken();
        this.headers = new HttpHeaders({
            ...BaseService.formdataHeader,
            ...{ 'Authorization': `Bearer ${token}` }

        });
        const fullUrl = this.createAPIURL(url);
        if (loader) {
            this.globalService.loading();
            return this.http.put(fullUrl, formData, { headers: this.headers, responseType: 'text' })
                .catch(error => this.handleError(error))
                .finally(() => {
                    this.globalService.loaded();
                });
        } else {
            return this.http.put(fullUrl, formData, { headers: this.headers })
                .catch(error => this.handleError(error));
        }
    }
    private loadToken(): void {
        const token =  this.localSerivce.getAccessToken();
       
        this.headers = new HttpHeaders({
            ...BaseService.defaultHeader,
            ...{ 'Authorization': `Bearer ${token}` }
        });
    }

    private parseFormdata(model: any): FormData {
        const formdata = new FormData();
        Object.keys(model || {}).forEach(p => {
            if (model[p]) {
                formdata.append(p, model[p]);
            }
        });

        return formdata;
    }

    private handleError(error: HttpErrorResponse): any {
        let message = this.translate.instant('ERROR.' + error.message);
        if (error.error) {
          message = this.translate.instant('ERROR.' + error.error.message);
          if (error.error.errors) {
            for (let index = 0; index < error.error.errors.length; index++) {
              if (error.error.errors[index].message) {
                message = message + '<br />' + '- ' + this.translate.instant('ERROR.' + error.error.errors[index].message);
              }
            }
          }
        }

        this.matSnackBar.open(message, this.translate.instant('COMMON.OK'), {
            verticalPosition: 'top',
            duration: 2000
        });

        setTimeout(() => { 
            if ([401, 403].indexOf(error.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.localSerivce.logout();
                location.reload(true);
            }
        }, 2000);

        return throwError(error);
    }
}
