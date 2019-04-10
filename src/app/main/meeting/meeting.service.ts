import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_USERMANAGEMENT_HOST } from '../../app.constant';
import { ErrorService } from '../../common/error.service';
import { GlobalService } from '../../common/global.service';
import { MatSnackBar } from '@angular/material';
import { ReqModelGetListMeeting } from '../../common/models/req-get-list-meeting.model';
import { BaseService } from '../../common/base.service';
import { ReqModelUpdateMeeting } from '../../common/models/req-update-meeting.model';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})

export class MeetingService extends BaseService {

    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/meeting"
    constructor(protected http: HttpClient,
        protected errorHandler: ErrorService,
        protected globalService: GlobalService,
        protected matSnackBar: MatSnackBar,
        protected translate: TranslateService,
        protected translateLoader: FuseTranslationLoaderService,
        protected localSerivce: LocalService,
        protected router: Router,
        ) {
        super(http, globalService, matSnackBar, translate, translateLoader, localSerivce);
    }

    getList(model: ReqModelGetListMeeting) {
        let url = this.apiPreFix + '/get-list';
        return this.post(url, model);
    }


    getMeetingDetail(id: number) {
        let url = this.apiPreFix + '/' + id;
        return this.get(url);
    }

    addMeeting(model: ReqModelUpdateMeeting) {

        let url = this.apiPreFix + '/create';
        return this.post(url, model);
    }

    updateMeeting(model: ReqModelUpdateMeeting) {
        let url = this.apiPreFix + '/update';
        return this.put(url, model);
    }
    getMeetingsToExport(model: any) {
        let url = this.apiPreFix + '/get-meetings-to-export-excel';
        return this.post(url, model);
    }
    exportExcel(model: any) {
        let url = this.apiPreFix + '/export-meetings';
        return this.postDownloadExcelFile(url, model);
    }

    uploadImage(meetingId: number , images: File[]) {
        let url = this.apiPreFix + '/upload-image';
        let formData:FormData = new FormData();
        if(meetingId && meetingId > 0){
            formData.append('meetingId', meetingId.toString());
        }
        for(let img of images){
            formData.append('images', img);
        }
        return this.postWithFormData(url, formData);
    }

    removeImage(meetingId: number, pathTemp: string) {
        let url = this.apiPreFix + '/remove-image';
        return this.remove(url, {
            Id: meetingId,
            PathTemp: pathTemp
        });
    }
}
