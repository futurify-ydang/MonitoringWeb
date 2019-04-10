import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ErrorService } from 'app/common/error.service';
import { GlobalService } from 'app/common/global.service';
import { BaseService } from 'app/common/base.service';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';

@Injectable({
    providedIn: 'root',
})

export class LocationService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/location"
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
        ) {
        super(http, globalService, matSnackBar, translate, translateLoader, localSerivce);
    }
    getList() {
        let url = this.apiPreFix + '/get-list-location';
        return this.get(url);
    }
}
