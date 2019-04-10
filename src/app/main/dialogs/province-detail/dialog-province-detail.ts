import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';

import { ProvinceService } from '../../admin/location/province/province.service';
import { ReqResModelCreateUpdateProvince } from 'app/main/admin/location/models/req-res-create-update-province.model';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';


import { locale as english } from '../../admin/location/i18n/en';
import { locale as vietnamese } from '../../admin/location/i18n/vi';

@Component({
    selector: 'dialog-province-detail',
    templateUrl: 'dialog-province-detail.html',
    styleUrls: ['dialog-province-detail.css'],
})
export class DialogProvinceDetail implements OnInit {
    values: string;
    provinceDetail: ReqResModelCreateUpdateProvince;
    data: { id: number };

    nameControl = new FormControl('', Validators.required);

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogProvinceDetail>,
        @Inject(MAT_DIALOG_DATA) data,
        private _matSnackBar: MatSnackBar,
        private _provinceService: ProvinceService
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
        this.provinceDetail = new ReqResModelCreateUpdateProvince();
        this.data = data;
    }

    ngOnInit() {
        if (this.data.id) {
            this._provinceService.getProvince(this.data.id).subscribe(province => {
                this.provinceDetail = province;
            });
        }
    }

    // Close topup
    onClose(): void {
        this.dialogRef.close();
    }

    // Save
    saveProvince(): void {

        const validate = this.validateForm();

        if (validate != null) {
            this._matSnackBar.open('Province ' + validate + ' null or invalid', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
        else {

            if (this.data.id != null) {
                this.provinceDetail.Id = this.data.id;
                this._provinceService.saveProvince(this.provinceDetail).subscribe();

                this._matSnackBar.open('Province ' + this.nameControl.value + ' updated', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
            else {

                this._provinceService.addProvince(this.provinceDetail).subscribe();

                this._matSnackBar.open('Province ' + this.nameControl.value + ' added', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }

            this.onClose();
        }
    }

    // Validate form
    validateForm(): string {

        if (this.nameControl.invalid) {
            this.nameControl.markAsTouched();
            return 'name';
        }

        return null;
    }
}

