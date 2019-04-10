import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';

import { DistrictService } from '../../admin/location/district/district.service';
import { ReqResModelCreateUpdateDistrict } from 'app/main/admin/location/models/req-res-create-update-district.model';
import { LocationService } from 'app/main/admin/location/location.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../../admin/location/i18n/en';
import { locale as vietnamese } from '../../admin/location/i18n/vi';
@Component({
    selector: 'dialog-district-detail',
    templateUrl: 'dialog-district-detail.html',
    styleUrls: ['dialog-district-detail.css'],
})
export class DialogDistrictDetail implements OnInit {
    values: string;
    districtDetail: ReqResModelCreateUpdateDistrict;
    provinceNameToSearch: string;
    data: { id: number };
    errorMessage: string;
    nameControl = new FormControl('', Validators.required);
    provinceControl = new FormControl('');

    filteredProvinces: Observable<any[]>;
    provinces: any[];

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        public dialogRef: MatDialogRef<DialogDistrictDetail>,
        @Inject(MAT_DIALOG_DATA) data,
        private _matSnackBar: MatSnackBar,
        private _locationService: LocationService,
        private _districtService: DistrictService,
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
        this.districtDetail = new ReqResModelCreateUpdateDistrict();
        this.data = data;
    }

    ngOnInit() {
        this.init();
    }
    init() {
        this._locationService.getList().subscribe(
            res => {
                this.provinces = res;
                this.filteredProvinces = this.provinceControl.valueChanges
                    .pipe(
                        startWith<string | any>(''),
                        map(value => typeof value === 'string' ? value : value.name),
                        map(name => name ? this._filterAutocomplete(name) : this.provinces.slice())
                    );
            }
        );
        if (this.data.id) {
            this._districtService.getDistrict(this.data.id).subscribe(district => {
                this.districtDetail = <ReqResModelCreateUpdateDistrict>district;
                this.provinceControl.setValue(district.ProvinceName);
            });
        }
    }
    // Close topup
    onClose(): void {
        this.dialogRef.close();
    }

    // Save
    saveDistrict(): void {
        this.errorMessage = '';
        const validate = this.validateForm();
        if (!validate) {
            this._matSnackBar.open(this.errorMessage, 'Error', {
                verticalPosition: 'top',
                duration: 2000
            });

            this.errorMessage = '';
        }
        else {

            if (this.data.id != null) {
                this.districtDetail.Id = this.data.id;

                this._districtService.saveDistrict(this.districtDetail).subscribe();

                this._matSnackBar.open('District ' + this.nameControl.value + ' updated', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
            else {
                this._districtService.addDistrict(this.districtDetail).subscribe();
                this._matSnackBar.open('District ' + this.nameControl.value + ' added', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }

            this.onClose();
        }
    }

    // Validate form
    validateForm(): boolean {
        this.errorMessage = '';

        if (this.nameControl.invalid) {
            this.nameControl.markAsTouched();
            this.errorMessage = 'District name null or invalid';
            return false;
        }
        let selectedProvince = this.getSelectedProvince();
        if (selectedProvince == undefined) {
            this.provinceControl.markAsTouched();
            this.errorMessage = 'Province name is not exist';
            return false;
        }
        else {
            this.districtDetail.ProvinceId = selectedProvince.Id;
        }
        return true;
    }
    // update province id
    getSelectedProvince() {
        let selectedProvinceName = this.provinceControl.value.toLowerCase();
        let province = this.provinces.find(p => p.ProvinceName.toLowerCase() == selectedProvinceName)
        return province;
    }
    getProvinceNameById(id: number) {
        let province = this.provinces.find(p => p.Id == id);
        if (province != undefined)
            return province.Name;
        return "";
    }

    private _filterAutocomplete(name: string): any[] {
        const filterValue = name.toLowerCase();

        return this.provinces.filter(item => item.ProvinceName.toLowerCase().includes(filterValue));
    }
}

