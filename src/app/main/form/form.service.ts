import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { API_USERMANAGEMENT_HOST } from '../../app.constant';
import { ErrorService } from '../../common/error.service';
import { GlobalService } from '../../common/global.service';
import { BaseService } from '../../common/base.service';
import { MatSnackBar } from '@angular/material';
import { reqModelCreateForm } from './models/request-model';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
@Injectable({
    providedIn: 'root',
})

export class FormService extends BaseService {
    
    apiHost = API_USERMANAGEMENT_HOST;

    apiPreFix = "/api/form";
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
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

    getForm(id: number) {
        let url = this.apiPreFix + '/'+ id;
        return this.get(url);
    }
    getFormByMeeting(id: number, meetingId: number) {
        let url = this.apiPreFix + '/get-form-by-meeting?formId='+ id + '&meetingId=' + meetingId;
        return this.get(url);
    }
    createForm(model: reqModelCreateForm): Observable<boolean> {
        let url = this.apiPreFix;
        return this.post(url, model);
    }
}
