import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from './i18n/en';
import { locale as navigationVietnamese } from './i18n/vn';
import { fuseAnimations } from '@fuse/animations';
import { MeetingService } from '../meeting.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-export-meetings',
  templateUrl: './export-meetings.component.html',
  styleUrls: ['./export-meetings.component.scss'],
  animations: fuseAnimations
})
export class ExportMeetingsComponent implements OnInit {
  meetings: any[] = [];
  fromDate: Date = null;
  toDate: Date = null;
  canExport = false;
  @ViewChild('tableNeedToExport') table: ElementRef;
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _meetingServce: MeetingService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
  }

  ngOnInit() {

  }
  view() {
    let reqModel = {
      FromDate: new Date(this.fromDate).toLocaleDateString(),
      ToDate: new Date(this.toDate).toLocaleDateString(),
    }
    console.log(reqModel);
    this._meetingServce.getMeetingsToExport(reqModel).subscribe(res => {
      setTimeout(() => {
        this.meetings = res;
        if(this.meetings.length > 0)
          this.canExport = true;
      }, 500);
    })
  }
  generateExcel() {
    let reqModel = {
      FromDate: new Date(this.fromDate).toLocaleDateString(),
      ToDate: new Date(this.toDate).toLocaleDateString(),
    }
    this._meetingServce.exportExcel(reqModel).subscribe(res => {
      var file = new Blob([res], { type: 'application/vnd.ms-excel' });
      saveAs(file, 'MeetingsReport.xlsx');
    });
  };

  fromDateChangeEvents() {
    this.canExport = false;
  }
  toDateChangeEvents() {
    this.canExport = false;
  }
}
