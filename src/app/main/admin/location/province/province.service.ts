import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorService } from 'app/common/error.service';
import { GlobalService } from 'app/common/global.service';
import { BaseService } from 'app/common/base.service';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { ReqModelGetListProvince } from '../models/req-get-list-province.model';
import { ReqResModelCreateUpdateProvince } from '../models/req-res-create-update-province.model';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
@Injectable({
    providedIn: 'root',
})

export class ProvinceService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/location/province"
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
    getList(model: ReqModelGetListProvince) {
        
        if (model == null)
            model = new ReqModelGetListProvince;

        let url = this.apiPreFix + '/get-list';
    
        return this.post(url, model);
    }
    getProvince(id: number) {
        let url = this.apiPreFix + '/get/' + id;
        return this.get(url);
    }
    addProvince(model: ReqResModelCreateUpdateProvince) {
        let url = this.apiPreFix + '/create';
        return this.post(url, model);
    }
    saveProvince(model: ReqResModelCreateUpdateProvince): Observable<boolean> {
        let url = this.apiPreFix + '/update';
        return this.put(url, model);
    }
    removeProvince(id: number) {
        let url = this.apiPreFix + '/delete/' + id;
        return this.remove(url, {});
    }
}
