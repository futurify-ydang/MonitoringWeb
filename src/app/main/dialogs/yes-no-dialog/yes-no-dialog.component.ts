import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from '../../../i18n/en';
import { locale as navigationVietnamese } from '../../../i18n/vi';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
    selector: 'yes-no-dialog',
    templateUrl: 'yes-no-dialog.component.html',
    styleUrls: ['yes-no-dialog.component.css'],
})
export class YesNoDiablogComponent implements OnInit {
    currentLanguage;
    data;
    constructor(
        public dialogRef: MatDialogRef<YesNoDiablogComponent>,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        @Inject(MAT_DIALOG_DATA) data,
    ) {
        this.data = data;
        console.log(this.data);
        this.currentLanguage = this._translateService.currentLang || 'en';
        console.log(this.currentLanguage);
        this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
            this.currentLanguage = params.lang;
        });
    }

    ngOnInit(): void {
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
    }

    onClose(result: boolean): void {
        this.dialogRef.close(result);
    }
}

