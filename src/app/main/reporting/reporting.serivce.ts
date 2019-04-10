import { Injectable } from "@angular/core";
import { API_USERMANAGEMENT_HOST } from "app/app.constant";
import { BaseService } from "app/common/base.service";
import { HttpClient } from '@angular/common/http';
import { GlobalService } from "app/common/global.service";
import { MatSnackBar } from "@angular/material";
import { ErrorService } from "app/common/error.service";
import { TranslateService } from "@ngx-translate/core";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { LocalService } from "app/common/local.service";


@Injectable({
    providedIn: 'root',
})

export class ReportService extends BaseService {
    apiHost = API_USERMANAGEMENT_HOST;
    apiPreFix = "/api/report"
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
    getMeetingReportModel(model){
        let url = this.apiPreFix + "/get-meeting-report";
        return this.post(url, model);
    }
    getDistrictReportModel(model) {
        let url = this.apiPreFix + "/get-district-report";
        return this.post(url, model);
    }
    getTrainerReportModel(model) {
        let url = this.apiPreFix + "/get-trainer-report";
        return this.post(url, model);
    }
    getQuestion(model) {
        let url = this.apiPreFix + "/get-compared-form-elements";
        return this.post(url, model);
    }
    getTimeList(model){
        let url = this.apiPreFix + "/get-times";
        return this.post(url, model);
    }
    getYears() {
        let result: any[] = [];
        let today = new Date();
        let currYear = today.getFullYear();
        let minYear = currYear - 10;
        while (currYear > minYear) {
            result.push({
                value: currYear,
                selected: false,
            });
            currYear = currYear - 1;
        }
        return result;
    }

    exportTrainerReport(model){
        let url = this.apiPreFix + "/export-trainer-report";
        return this.postDownloadExcelFile(url, model);
    }
}
