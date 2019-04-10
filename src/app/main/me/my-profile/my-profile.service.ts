import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { User } from '../../../common/models/user.model';
import { API_USERMANAGEMENT_HOST } from '../../../app.constant';
import { ErrorService } from '../../../common/error.service';
import { GlobalService } from '../../../common/global.service';
import { BaseService } from '../../../common/base.service';
import { MatSnackBar } from '@angular/material';
import { ReqModelUpdateProfile } from '../../admin/location/models/req-update-my-profile.model';
import { ReqModelUpdateProfilePassword } from '../model/req-update-my-profile-password';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as vietnam } from './i18n/vi';
import { ReqModelUpdateProfilePhoneNumber, ReqModelVerifyUpdateProfilePhoneNumber } from '../model/req-update-my-profile-phone-number';
import { LocalService } from 'app/common/local.service';


@Injectable({
    providedIn: 'root',
})

export class ProfileService extends BaseService {
    profile: string;
    apiHost = API_USERMANAGEMENT_HOST;
    avatar: Subject<string> = new Subject<string>();
    fullName: Subject<string> = new Subject<string>();
    apiPreFix = '/api/profile';

    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
        ) {
        super(http, globalService, matSnackBar, translate, translateLoader, localSerivce);
        translateLoader.loadTranslations(english, vietnam);
    }

    getProfileDetail(id: number): Observable<User> {
        const url = this.apiPreFix + '/get-profile/' + id;
        return this.get(url);
    }

    saveProfile(model: ReqModelUpdateProfile): Observable<ReqModelUpdateProfile> {
        const url = this.apiPreFix + '/update';
        return this.put(url, model);
    }

    updatePassword(model: ReqModelUpdateProfilePassword): Observable<any> {
        const url = this.apiPreFix + '/update-password';
        return this.put(url, model);
    }

    sendOTP(model: ReqModelUpdateProfilePhoneNumber): Observable<any> {
        const url = this.apiPreFix + '/update-phone-number/request-otp';
        return this.post(url, model);
    }

    reSendOTP(model: ReqModelUpdateProfilePhoneNumber): Observable<any> {
        const url = this.apiPreFix + '/update-phone-number/re-request-otp';
        return this.post(url, model);
    }

    verifyOTP(model: ReqModelVerifyUpdateProfilePhoneNumber): Observable<any> {
        const url = this.apiPreFix + '/update-phone-number/verify-otp';
        return this.post(url, model);
    }

    setLanguage(lang: string): Observable<any> {
        const url = this.apiPreFix + `/language/${lang}`;
        return this.get(url);
    }

    uploadAvatar(img: File): Observable<string> {
        const url = this.apiPreFix + '/upload-avatar';
        let formData = new FormData();
        formData.append('image', img);
        return this.putWithFormDataResText(url, formData);
    }

    
    getSummaryProfile(): Observable<any> {
        const url = this.apiPreFix + '/summary-profile';
        return this.get(url);
    }
}
