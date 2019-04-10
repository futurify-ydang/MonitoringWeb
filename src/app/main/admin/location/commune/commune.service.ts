import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { API_USERMANAGEMENT_HOST } from '../../../../app.constant';
import { BaseService } from '../../../../common/base.service';
import { ErrorService } from '../../../../common/error.service';
import { GlobalService } from '../../../../common/global.service';
import { ReqModelGetListCommune } from '../models/req-get-list-commune.model';
import { ReqResModelCreateUpdateCommune } from '../models/req-res-create-update-commune';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';

@Injectable({
    providedIn: 'root',
})

export class CommuneService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/location/commune"
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

    getList(model: ReqModelGetListCommune) {

        if (model == null)
            model = new ReqModelGetListCommune;

        let url = this.apiPreFix + '/get-list';

        return this.post(url, model);
    }

    getCommune(id: number) {
        let url = this.apiPreFix + '/get/' + id;
        return this.get(url);
    }
    addCommune(model: ReqResModelCreateUpdateCommune) {
        let url = this.apiPreFix + '/create';
        return this.post(url, model);
    }
    saveCommune(model: ReqResModelCreateUpdateCommune){
        let url = this.apiPreFix + '/update';
        return this.put(url, model);
    }
    removeCommune(id: number) {
        let url = this.apiPreFix + '/delete/' + id;
        return this.remove(url, {});
    }
}
