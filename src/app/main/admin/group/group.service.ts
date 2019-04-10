import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { debug } from 'util';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { Group, GROUP_DATA } from '../model/group.model';
import { forEach } from '@angular/router/src/utils/collection';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { ErrorService } from 'app/common/error.service';
import { GlobalService } from 'app/common/global.service';
import { BaseService } from 'app/common/base.service';
import { ReqModelGetListGroup } from './models/req-get-list-group.model';
import { ResModelUpdateGroup } from './models/res-update-group.model';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
import { SearchGroupOptionModel } from 'app/common/models/search-group-option.model';

@Injectable({
    providedIn: 'root',
})

export class GroupService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/group"
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

    getList(model: ReqModelGetListGroup) {

        if (model == null)
            model = new ReqModelGetListGroup;

        let url = this.apiPreFix + '/get-list';

        return this.post(url, model);
    }
    getGroup(id: number) {
        let url = this.apiPreFix + '/get/' + id;
        return this.get(url);
    }
    addGroup(model: ResModelUpdateGroup) {
        let url = this.apiPreFix + '/create';
        return this.post(url, model);
    }
    saveGroup(model: ResModelUpdateGroup): Observable<boolean> {
        let url = this.apiPreFix + '/update';
        return this.put(url, model);
    }
    removeGroup(id: number) {
        let url = this.apiPreFix + '/delete/' + id;
        return this.remove(url, {});
    }
    getSelectListGroup() {
        let url = this.apiPreFix + '/get-select-list';
        return this.get(url, {});
    }

    getSelectListGroupLocatin(model: SearchGroupOptionModel) {
        let url = this.apiPreFix + '/get-select-list-group-location';
        return this.post(url, model);
    }
    getGroupsGroupbyCommune(districtId: number = null, keywords: string) {
        let url = this.apiPreFix + '/get-groups-groupby-commune?districtId=' + districtId;
        return this.get(url, { keywords: keywords });
    }
}
