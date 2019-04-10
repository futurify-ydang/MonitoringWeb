import { Component, OnInit } from '@angular/core';

// other lib
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router'
import { ReportService } from '../reporting.serivce';
import { ELEMENT_DATA_REPORTING } from '../reporting/reporting.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
// Import the locale files
import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
import { ELEMENT_DATA_COLOR_SCHEME } from '../chart-meeting/chart-meeting.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
  animations: fuseAnimations
})
export class ViewReportComponent implements OnInit {
  currLanguage: any;
  reportModel: any;
  numberOfColumns: number;
  textScheme = [];
  colorScheme = ELEMENT_DATA_COLOR_SCHEME;
  modelRequest: any;
  constructor(private _router: Router,
    private _translationLoader: FuseTranslationLoaderService,
    private _reportService: ReportService,
    private _translateService: TranslateService) {
      this.currLanguage = this._translateService.currentLang.toUpperCase();
      this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
        this.currLanguage = params.lang.toUpperCase();
      });
      this._translationLoader.loadTranslations(english, vietnamese);
  }

  ngOnInit() {
    this.modelRequest = ELEMENT_DATA_REPORTING.model;
    if (!this.modelRequest)
      this._router.navigate(['/reporting/reporting']);
    else {
      this._reportService.getMeetingReportModel(this.modelRequest).subscribe(res => {
        this.reportModel = res;
        this.textScheme = this.modelRequest.selectedTimes.map(item => item);
        console.log(this.reportModel);
      });
    }
  }
}


export const TOTAL_HEIGHT_COLUMN_CHART: number = 300;
export const HEIGHT_CELL_CHART: number = TOTAL_HEIGHT_COLUMN_CHART / 5;
export const HEIGHT_CELL_TEXT: number = 50;