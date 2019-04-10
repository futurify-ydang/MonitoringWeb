import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { debug } from 'util';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { FuseUtils } from '@fuse/utils';
import { Role } from '../model/roles.model';
import { Permission } from '../model/permission.model';

import { BaseService } from '../../../common/base.service';
import { GlobalService } from '../../../common/global.service';
import { API_USERMANAGEMENT_HOST } from '../../../app.constant';
import { ReqModelGetListRole } from '../location/models/req-get-list-role.model';
import { ReqSearchRole } from './models/req-search-role.model';
import { ResSearchModel } from 'app/common/models/res.model';
import { ReqRole } from './models/req-role.model';
import { ResRole } from './models/res-role.model';
import { ResPermission } from './models/res-permission.model';
import { ReqAssignPermissionToRole } from './models/req-assign-permission-to-role.model';
import { ReqUnAssignPermissionFromRole } from './models/req-un-assign-permission-to-role.model';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';

@Injectable({
    providedIn: 'root',
})

export class PermissionService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = '/api/permission';

    constructor(protected http: HttpClient,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
        ) {
        super(http, globalService, matSnackBar, translate, translateLoader, localSerivce);
    }

    getList(model: ReqModelGetListRole) {
        if (model == null) {
            model = new ReqModelGetListRole();
        }

        const url = this.apiPreFix + '/role/search';
        return this.post(url, model);
    }

    getRoleOptions(model: ReqModelGetListRole) {
        if (model == null) {
            model = new ReqModelGetListRole();
        }

        const url = this.apiPreFix + '/role/get-role-options';
        return this.post(url, model);
    }

    getRole(id: number): Observable<ResRole> {
        const url = this.apiPreFix + `/role/${id}`;
        return this.get(url);
    }

    getRolePermission(id: number) {
        const url = this.apiPreFix + `/${id}`;
        return this.get(url);
    }

    addRole(role: ReqRole): Observable<ResRole> {
        const url = this.apiPreFix + '/role';
        return this.post(url, role);
    }

    updateRole(role: ReqRole): Observable<ResRole> {
        const url = this.apiPreFix + '/role';
        return this.put(url, role);
    }

    removeRole(id: number): Observable<string> {
        const url = this.apiPreFix + `/role/${id}`;
        return this.remove(url);
    }

    addRolePermission(model: ReqAssignPermissionToRole): Observable<string> {
        const url = this.apiPreFix + '/assign';
        return this.post(url, model);
    }

    removeRolePermission(model: ReqUnAssignPermissionFromRole): Observable<string> {
        const url = this.apiPreFix + '/un-assign';
        return this.post(url, model);
    }

    selectedRolePermission(permissionId: string, roleId: number): void {
        this.getRolePermission(roleId).subscribe((data) => {
            const rolePermissions = data.PermissionIds;

            if (rolePermissions.indexOf(permissionId) === -1) {
                this.addRolePermission({ roleId, permissionId }).subscribe();
            }
            else {
                return this.removeRolePermission({ roleId, permissionId }).subscribe();
            }
        });
    }

    getListPermission() {
        const url = this.apiPreFix + '/get-list-permission';
        return this.get(url);
    }

    assignOrUnAssignAll(id: number, isAssignAll: boolean) {
        const url = this.apiPreFix + '/assign-or-unassign-all?id=' + id + '&isAssignAll=' + isAssignAll;
        return this.post(url, {});
    }
}
