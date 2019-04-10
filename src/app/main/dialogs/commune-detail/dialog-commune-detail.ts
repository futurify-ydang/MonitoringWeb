import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable, empty } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { CommuneService } from '../../admin/location/commune/commune.service';
import { ReqResModelCreateUpdateCommune } from 'app/main/admin/location/models/req-res-create-update-commune';
import { LocationService } from 'app/main/admin/location/location.service';

import { locale as english } from '../../admin/location/i18n/en';
import { locale as vietnamese } from '../../admin/location/i18n/vi';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
@Component({
    selector: 'dialog-commune-detail',
    templateUrl: 'dialog-commune-detail.html',
    styleUrls: ['dialog-commune-detail.css'],
})
export class DialogCommuneDetail implements OnInit {
    values: string;
    communeDetail: ReqResModelCreateUpdateCommune;
    data: { id: number };
    errorMessage: string;
    nameControl = new FormControl('', Validators.required);
    districtControl = new FormControl('', Validators.required);

    filteredProvinces: Observable<any[]>;
    provinces: any[];

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogCommuneDetail>,
        @Inject(MAT_DIALOG_DATA) data,
        private _matSnackBar: MatSnackBar,
        private _communeService: CommuneService,
        private _locationService: LocationService
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
        this.communeDetail = new ReqResModelCreateUpdateCommune();
        this.data = data;
    }

    ngOnInit() {
        this.init();
    }
    init() {
        if (this.data.id) {
            this._communeService.getCommune(this.data.id).subscribe(commune => {
                this.communeDetail = commune;
                this.districtControl.setValue(commune.DistrictName);
            });
        }
        this._locationService.getList().subscribe(
            res => {
                this.provinces = res;
                // Changes option filteredDistricts of districtControl
                this.filteredProvinces = this.districtControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this._filterAutocomplete(value))
                    );
            }
        );
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
                this.communeDetail.Id = this.data.id;
                this._communeService.saveCommune(this.communeDetail).subscribe();
                this._matSnackBar.open('Commune ' + this.nameControl.value + ' updated', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
            else {
                this._communeService.addCommune(this.communeDetail).subscribe();
                this._matSnackBar.open('Commune ' + this.nameControl.value + ' added', 'OK', {
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
            this.errorMessage += 'Commune name null or invalid';
            return false;
        }

        let selectedDistrict = this.getSelectedDistrict();
        if (selectedDistrict == undefined) {
            this.districtControl.markAsTouched();
            this.errorMessage = 'Commune name is not exist';
            return false;
        }
        else {
            this.communeDetail.DistrictId = selectedDistrict.Id;
        }
        return true;
    }
    // update province id
    getSelectedDistrict() {
        let selectedDistrictName = this.districtControl.value.toLowerCase();
        let result;
        for (let province of this.provinces) {
            result = province.Districts.find(d => d.DistrictName.toLowerCase() == selectedDistrictName);
            if (result != undefined)
                break;
        }
        return result;
    }
    getDistrictNameById(id: number) {
        let district = this.provinces.find(p => p.Districts.Id == id);
        if (district != undefined)
            return district.DistrictName;
        return "";
    }


    // Get list item auto complete show on districtControl
    private _filterAutocomplete(value: string): any[] {
        const filterValue = value.toLocaleLowerCase();
        const result = this.provinces.filter(
            p => p.Districts.find(d =>
                d.DistrictName.toLocaleLowerCase().includes(filterValue)
            )
        );
        return result;
    }
}

