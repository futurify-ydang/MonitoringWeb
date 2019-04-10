// angular lib
import { Component, OnInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';

// other lib
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../my-profile.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../../../common/models/user.model';
import { Province } from 'app/common/models/province.model';
import { ProvinceService } from '../../../admin/location/province/province.service';
import { ReqModelGetListProvince } from '../../../admin/location/models/req-get-list-province.model';
import { DistrictService } from '../../../admin/location/district/district.service';
import { CommuneService } from '../../../admin/location/commune/commune.service';
import { ReqModelGetListDistrict } from '../../../admin/location/models/req-get-list-district.model';
import { ReqModelGetListCommune } from '../../../admin/location/models/req-get-list-commune.model';
import { District } from '../../../../common/models/district.model';
import { Commune } from '../../../../common/models/commune.model';
import { Role } from '../../../../common/models/roles.model';
import { ReqSearchRole } from '../../../admin/permission/models/req-search-role.model';
import { locale as navigationEnglish } from 'app/main/me/my-profile/detail/i18n/en';
import { locale as navigationVietnamese } from 'app/main/me/my-profile/detail/i18n/vn';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
import { LocationService } from 'app/main/admin/location/location.service';
import { CommonFunction } from 'app/common/function';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';


@Injectable({
    providedIn: 'root',
})

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
    animations: fuseAnimations
})

export class MyProfileComponent implements OnInit {
    isCoordinator: boolean = false;
    apiHost = API_USERMANAGEMENT_HOST;
    firstLoad: boolean = true;
    getListProvinceModel: ReqModelGetListProvince;
    getListDistrictModel: ReqModelGetListDistrict;
    getListCommuneModel: ReqModelGetListCommune;
    getListRoleModel: ReqSearchRole;
    errorMessage: string;
    firstNameControl = new FormControl('', Validators.required);
    lastNameControl = new FormControl();
    mobileControl = new FormControl('', Validators.required);
    provinceIdControl = new FormControl(null, Validators.required);
    provinceControl = new FormControl('');
    districtIdControl = new FormControl();
    districtControl = new FormControl('');
    communeIdControl = new FormControl();
    communeControl = new FormControl('');
    bormControl = new FormControl();
    roleControl = new FormControl();

    @ViewChild('fileInput') inputFile: ElementRef;
    id: number;
    safeImgDataUrls: string;

    filteredProvinces: Observable<any[]>;
    filteredDistricts: Observable<any[]>;
    filteredCommunes: Observable<any[]>;
    filteredRoles: Observable<Role[]>;

    fileUpToLoad: File = null;

    values: string;
    provinces: any[] = [];
    districts: any[] = [];
    communes: any[] = [];
    profile: User;
    roles: Role[];
    hiddenInput: string;

    constructor(
        private _profileService: ProfileService,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _localSerivce: LocalService,
        private _locationService: LocationService,
    ) {
        this.roleControl.disable();
        this.isCoordinator = this._localSerivce.getPermissions().includes('COORDINATOR');
    }

    ngOnInit(): void {
        this.profile = new User();

        this.id = this._localSerivce.getUser().Id;
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);

        this.safeImgDataUrls = '/assets/images/avatars/no-image-icon-hi.png';
        this.values = '';
        this.hiddenInput = 'false';

        this.initApis();
    }

    initApis() {
        let getLocationList = this._locationService.getList();
        getLocationList.subscribe(res => {
            this.provinces = res;
            // select the first item of province if provinceId is null
            this.initAllAutocomplete();
            // Check id edit or new item group detail
            if (this.id) {
                this._profileService.getProfileDetail(this.id).subscribe(res => {
                    this.profile = res;

                    if (this.profile.Avatar != null) {
                        this.safeImgDataUrls = this.apiHost + this.profile.Avatar;
                    }

                    this._profileService.avatar.next(this.safeImgDataUrls);
                    this._profileService.fullName.next(this.profile.FullName);
                    setTimeout(() => {
                        this.firstLoad = false;
                    }, 500)
                });
            }
        });
    }
    // Check value province
    checkValueProvince(event: any): void {

        this.values = event.target.value;
        if (this.values != '') {
            this.districtControl.enable();
        }
        else {
            this.districtControl.reset();
            this.communeControl.reset();
            this.districtControl.disable();
            this.communeControl.disable();
        }
    }

    // Check value district
    checkValueDistrict(event: any): void {

        this.values = event.target.value;
        if (this.values != '') {
            this.communeControl.enable();
        }
        else {
            this.communeControl.reset();
            this.communeControl.disable();
        }
    }

    handleInputChange(event): void {
        if (event && event.target && event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            this._profileService.uploadAvatar(file).subscribe(res => {
                this.safeImgDataUrls = this.apiHost + res;
                this._profileService.avatar.next(this.safeImgDataUrls);
            });
        }
    }

    saveProfile(): void {
        const validate = this.validateForm();

        if (!validate) {
            this.errorMessage = '';
        }
        else {

            if (this.id != null) {
                this.profile.Id = this.id;

                if (this.profile.Province.Name) {
                    this.profile.ProvinceId = this.provinces.find(c => c.ProvinceName == this.profile.Province.Name).Id;
                }

                if (this.profile.District.Name) {
                    this.profile.DistrictId = this.districts.find(c => c.DistrictName == this.profile.District.Name).Id;
                }

                if (this.profile.Commune.Name) {
                    this.profile.CommuneId = this.communes.find(c => c.CommuneName == this.profile.Commune.Name).Id;
                }

                this._profileService.saveProfile(this.profile).subscribe(response => {
                    this._profileService.avatar.next(this.apiHost + response.Avatar);
                    this._profileService.fullName.next(response.FullName);
                });

                this._matSnackBar.open('Profile ' + this.firstNameControl.value + this.lastNameControl.value + ' updated', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
    }

    // Validate form
    validateForm(): boolean {

        if (this.firstNameControl.invalid) {
            this.firstNameControl.markAsTouched();
            return false;
        }

        if (this.mobileControl.invalid) {
            this.mobileControl.markAsTouched();
            return false;
        }

        if (this.provinceIdControl.invalid) {
            this._matSnackBar.open('Invalid province', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            return false;
        }

        return true;
    }

    /* Autocompletes */
    initAllAutocomplete() {
        this.filteredProvinces = this.initEventChangeTextAutoComplete(this.provinceControl, this.filterAutocompleteProvince)
        this.filteredDistricts = this.initEventChangeTextAutoComplete(this.districtControl, this.filterAutocompleteDistrict)
        this.filteredCommunes = this.initEventChangeTextAutoComplete(this.communeControl, this.filterAutocompleteCommune)
    }
    // Provinces
    filterAutocompleteProvince = (text: string): any[] => {
        // select the first province when province is null
        let result;
        this.updateProvinceId(text);
        if (text) {
            result = this.provinces.filter(item => item.ProvinceName.toLowerCase().includes(text));
        }
        else {
            result = this.provinces;
        }
        return result;
    }
    updateProvinceId = (name: string) => {
        let province = this.provinces.find(p => p.ProvinceName.toLowerCase() == name)
        // controls
        if (province != undefined) {
            this.provinceIdControl.setValue(province.Id);
            this.districtControl.enable();
            this.districts = province.Districts;
        }
        else {
            this.provinceIdControl.setValue(null);
            this.districtControl.disable();
            this.districts = [];
        }
        if (!this.firstLoad)
            this.districtControl.setValue('');
    }
    // District
    filterAutocompleteDistrict = (text: string): any[] => {
        let result;
        this.updateDistrictId(text);
        if (text) {
            result = this.districts.filter(item => item.DistrictName.toLowerCase().includes(text));
        }
        else {
            result = this.districts;
        }
        return result;
    }
    updateDistrictId = (name: string) => {
        let district = this.districts.find(p => p.DistrictName.toLowerCase() == name)
        if (district != undefined) {
            this.districtIdControl.setValue(district.Id);
            this.communeControl.enable();
            this.communes = district.Communes;
        }
        else {
            this.districtIdControl.setValue(null);
            this.communeControl.disable();
            this.communes = [];
        }
        if (!this.firstLoad)
            this.communeControl.setValue('');
    }
    // Commune
    filterAutocompleteCommune = (text: string): any[] => {
        let result;
        this.updateCommuneId(text);
        if (text) {
            result = this.communes.filter(item => item.CommuneName.toLowerCase().includes(text));
        }
        else {
            result = this.communes;
        }
        return result;
    }
    updateCommuneId = (name: string) => {
        let commune = this.communes.find(p => p.CommuneName.toLowerCase() == name)
        if (commune != undefined) {
            this.communeIdControl.setValue(commune.Id);
        }
        else {
            this.communeIdControl.setValue(null);
        }
    }
    initEventChangeTextAutoComplete(textControl: FormControl, filterFunc: Function
    ): any {
        return textControl.valueChanges
            .pipe(
                startWith<any>(''),
                map(value => {
                    if (!value)
                        value = '';
                    return value.toLowerCase();
                }),
                map(name => filterFunc(name)),
            );
    }
}
