import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { GlobalService } from './global.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResDialogHistory } from 'app/main/dialogs/history/res-dialog-history';
import { LocalService } from './local.service';

@Injectable({ providedIn: 'root' })
export class HistoryService extends BaseService{
    apiHost = API_USERMANAGEMENT_HOST;
    apiPrefix = '/api/history';

    constructor(
        protected http: HttpClient,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
    )  {
        super(http, globalService, matSnackBar, translate, translateLoader, localSerivce);
    }

    getHistory(type: string, id: number, page?: number, length?: number): Observable<ResDialogHistory>{
        const url = this.apiPrefix + `/audit-log?type=${type}&id=${id}&page=${page}&length=${length}`;
        return this.get(url);
    }
}
