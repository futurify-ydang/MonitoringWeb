import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReqModelGetListUser } from './models/req-get-list-user.model';
import { BaseService } from 'app/common/base.service';
import { ErrorService } from 'app/common/error.service';
import { GlobalService } from 'app/common/global.service';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { ReqModelUpdateUser } from './models/user.model';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
import { BaseSearchModel } from 'app/common/models/base-search.model';
import { Observable } from 'rxjs';
import { UserOptionModel } from 'app/common/models/user-option.model';
import { SearchUserOptionModel } from 'app/common/models/search-user-option.model';
import { ChangePasswordRequest } from 'app/common/models/changePassword.model';

@Injectable({
    providedIn: 'root',
})

export class UserService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/user"
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

    getList(model: ReqModelGetListUser) {
        if (model == null)
            model = new ReqModelGetListUser;
        let url = this.apiPreFix + '/get-list';
        return this.post(url, model);
    }
    getUserDetail(id: number) {
        let url = this.apiPreFix + '/get-user/' + id;
        return this.get(url);
    }

    addUser(model: ReqModelUpdateUser) {
        let url = this.apiPreFix + '/create';
        return this.post(url, model);
    }

    saveUser(model: ReqModelUpdateUser) {
        let url = this.apiPreFix + '/update';
        return this.put(url, model);
    }

    getFullNameList() {
        let url = this.apiPreFix + '/get-fullname-list';
        return this.get(url);
    }
    getSelectListGroupLeader(keywords: string, districtId: number) {
        if(!keywords)
            keywords = '';
        let url = this.apiPreFix + '/get-users-groupby-commune?keywords=' + keywords + '&districtId=' + districtId;
        return this.get(url);
    }

    forgotPassword(mobileNumber: string, otp: string){
        let url = this.apiPreFix + '/verify-otp-forgot-password?mobileNumber=' + mobileNumber + '&otp=' + otp;
        return this.get(url);
    }
    sendOtpForgotPassword(mobileNumber: string){
        let url = this.apiPreFix + '/send-OTP-forgot-password?mobileNumber=' + mobileNumber;
        return this.get(url);
    }

    updatePassword(requestModel: ChangePasswordRequest){
        console.log(requestModel);
        
        let url = this.apiPreFix + '/change-password';
        return this.put(url, requestModel);
    }

    getUsersForOptions(requestModel: SearchUserOptionModel): Observable<any>{
        let url = this.apiPreFix + '/get-users-for-options';
        return this.post(url, requestModel);
    }

    checkLoggedIn(mobileNumber: string): any {
        const url = this.apiPreFix + '/check-logged-in';
        return this.get(url, {
            mobileNumber: mobileNumber
        });
    }
}
