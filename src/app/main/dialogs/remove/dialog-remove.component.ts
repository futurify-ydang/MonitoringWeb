import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from '../../../i18n/en';
import { locale as navigationVietnamese } from '../../../i18n/vi';


@Component({
    selector: 'dialog-remove',
    templateUrl: 'dialog-remove.component.html',
    styleUrls: ['dialog-remove.component.css'],
})
export class DialogRemoveComponent implements OnInit {
    data: any;
    constructor(
        public dialogRef: MatDialogRef<DialogRemoveComponent>,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        @Inject(MAT_DIALOG_DATA) data,
    ) {
        this.data = data;
    }

    ngOnInit(): void {
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
    }

    onClose(result: boolean): void {
        this.dialogRef.close(result);
    }
}

