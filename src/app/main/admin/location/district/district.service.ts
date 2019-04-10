import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { ErrorService } from 'app/common/error.service';
import { GlobalService } from 'app/common/global.service';
import { BaseService } from 'app/common/base.service';
import { ReqModelGetListDistrict } from '../models/req-get-list-district.model';
import { ReqResModelCreateUpdateDistrict } from '../models/req-res-create-update-district.model';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';

@Injectable({
    providedIn: 'root',
})

export class DistrictService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/location/district"
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
    getList(model: ReqModelGetListDistrict) {
        if (model == null)
            model = new ReqModelGetListDistrict;

        let url = this.apiPreFix + '/get-list';
        return this.post(url, model);
    }
    getDistrict(id: number) {
        let url = this.apiPreFix + '/get/' + id;
        return this.get(url);
    }
    addDistrict(model: ReqResModelCreateUpdateDistrict) {
        let url = this.apiPreFix + '/create';
        return this.post(url, model);
    }
    saveDistrict(model: ReqResModelCreateUpdateDistrict) {
        let url = this.apiPreFix + '/update';
        return this.put(url, model);
    }
    removeDistrict(id: number) {
        let url = this.apiPreFix + '/delete/' + id;
        return this.remove(url, {});
    }

}
