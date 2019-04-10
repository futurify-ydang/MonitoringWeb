import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOGIN_STATUS, LOCAL_STORAGE_VARIABLE, API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { ReqModelLogin } from 'app/main/auth/login/login.model';
import { ResLogin } from 'app/main/auth/login/models/res-login.model';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from './local.service';
import { CurrentUserModel } from './models/current-user.model';

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    redirectUrl: string;

    constructor(protected http: HttpClient,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
    ) {
        super(http, globalService, matSnackBar, translate, translateLoader, localSerivce);
    }

    userTypeSubject = new BehaviorSubject('');

    isLoggedIn(): string {
        return this.localSerivce.getLogStatus() === LOGIN_STATUS.logged_in && this.localSerivce.getAccessToken();
    }

    setLoggedIn(data: ResLogin, remember: boolean): void {
        let cookiesExpiredDate = null;
        if (remember)
            cookiesExpiredDate = new Date(data.ExpiredAt);
        this.localSerivce.setAccessToken(data.AccessToken, cookiesExpiredDate);
        this.localSerivce.setLogStatus(true, cookiesExpiredDate);
        this.localSerivce.setPermissions(data.Account.Permissions, cookiesExpiredDate);
        this.localSerivce.storeObject(LOCAL_STORAGE_VARIABLE.account, data.Account, cookiesExpiredDate);
    }

    hasPermission(permissions: string[]): boolean {
        const userRoles = this.localSerivce.getPermissions() || [];
        for (let i = 0; i < permissions.length; i++) {
            if (userRoles.indexOf(permissions[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    setUserType(userType: string): void {
        this.localSerivce.setItem(LOCAL_STORAGE_VARIABLE.user_type, userType);
        this.userTypeSubject.next(userType);
    }

    getUserType(): string {
        return this.localSerivce.getItem(LOCAL_STORAGE_VARIABLE.user_type);
    }
    getLanguageOfUser():string{
        let user = this.localSerivce.getUser();
        if(user)
            return user.Language;
        return 'vi';
    }
    getUser(): CurrentUserModel {
        var model = new CurrentUserModel();
        var json = this.localSerivce.getItem(LOCAL_STORAGE_VARIABLE.account);
        model = JSON.parse(json);
        return model;
    }
    logIn(model: ReqModelLogin): Observable<ResLogin> {
        const url = '/token';
        return this.postFormData(url, model);
    }
} 
