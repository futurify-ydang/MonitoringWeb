import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { GroupService } from '../../admin/group/group.service';
import { ResModelUpdateGroup } from 'app/main/admin/group/models/res-update-group.model';
import { LocationService } from 'app/main/admin/location/location.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { UserService } from 'app/main/admin/user/user.service';
import { distinctUntilChanged } from 'rxjs-compat/operator/distinctUntilChanged';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';


import { locale as english } from '../../admin/group/i18n/en';
import { locale as vietnamese } from '../../admin/group/i18n/vi';
import { CommonFunction } from 'app/common/function';
@Component({
    selector: 'dialog-group-detail',
    templateUrl: 'dialog-group-detail.html',
    styleUrls: ['dialog-group-detail.css'],
})
export class DialogGroupDetail implements OnInit {
    values: string;
    errorMessage: string = "";
    groupDetail: ResModelUpdateGroup;
    groupForm: FormGroup;
    data: { title: string, id: number };
    firstLoad: boolean = true;
    selectedFirstProvince = true;
    // used for dropdownoptions
    locations: any[] = [];
    filteredProvinces: Observable<any[]>;
    districts: any[] = [];
    filteredDistricts: Observable<any[]>;
    communes: any[] = [];
    filteredCommunes: Observable<any[]>;
    groupleaders: any[] = [];
    filteredGroupleaders: Observable<any[]>;
    groupleaderNameSubject: Subject<string> = new Subject<string>();

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogGroupDetail>,
        @Inject(MAT_DIALOG_DATA) data,
        private _matSnackBar: MatSnackBar,
        private _groupService: GroupService,
        private _locationService: LocationService,
        private _userService: UserService
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
        this.groupDetail = new ResModelUpdateGroup();
        this.data = data;

        this.groupleaderNameSubject.pipe(
            debounceTime(500)
        )
            .subscribe(res => {
                let communeId = this.groupForm.controls['communeId'].value;
                let model =
                {
                    keywords: res,
                    length: 10,
                    communeId: communeId || 0,
                };
                this._userService.getUsersForOptions(model).subscribe(res => {
                    this.groupleaders = res;
                });
            });
    }

    ngOnInit() {
        this.groupForm = this.createGroupForm();
        this.initApis();
    }
    initApis() {
        let getLocationList = this._locationService.getList();
        getLocationList.subscribe(res => {
            this.locations = res;
            // select the first item of province if provinceId is null
            this.initAllAutocomplete();

            // Check id edit or new item group detail
            if (this.data.id) {
                this.selectedFirstProvince = false;
                this._groupService.getGroup(this.data.id).subscribe(group => {
                    this.groupDetail = group;
                    this.updateGroupForm();
                    this.firstLoad = false;
                });
            }
            else {
                setTimeout(() => {
                    this.firstLoad = false;
                }, 500);
            }

        });
    }
    createGroupForm(): FormGroup {
        return this._formBuilder.group({
            id: [null],
            name: ["", [Validators.required]],
            provinceId: [null, [Validators.required]],
            provinceName: ['', [Validators.required]],
            districtId: [null, [Validators.required]],
            districtName: [
                { value: '', disabled: true },
                [Validators.required]
            ],
            communeId: [null, [Validators.required]],
            communeName: [
                { value: '', disabled: true },
                [Validators.required]
            ],
            groupleaderId: [null],
            groupleaderName: [''],
        });
    }
    updateGroupForm() {
        this.groupForm.controls["id"].setValue(this.groupDetail.Id);
        this.groupForm.controls["name"].setValue(this.groupDetail.Name);
        this.groupForm.controls["provinceId"].setValue(this.groupDetail.Commune.District.Province.Id);
        this.groupForm.controls["provinceName"].setValue(this.groupDetail.Commune.District.Province.Name);
        this.groupForm.controls["districtId"].setValue(this.groupDetail.Commune.District.Id);
        this.groupForm.controls["districtName"].setValue(this.groupDetail.Commune.District.Name);
        this.groupForm.controls["communeId"].setValue(this.groupDetail.Commune.Id);
        this.groupForm.controls["communeName"].setValue(this.groupDetail.Commune.Name);
        if (this.groupDetail.Groupleader != null) {
            this.groupForm.controls["groupleaderId"].setValue(this.groupDetail.Groupleader.Id);
            this.groupForm.controls["groupleaderName"].setValue(this.groupDetail.Groupleader.FullName);
        }
    }
    updateGroupFormBeforeSubmit() {
        let groupleaderName = this.groupForm.controls['groupleaderName'].value;
        let groupleaderIdControl = this.groupForm.controls['groupleaderId'];
        groupleaderIdControl.setValue(null);
        for (let i = 0; i < this.groupleaders.length; i++) {
            let user = this.groupleaders.find(u => u.FullName == groupleaderName);
            if (user) {
                groupleaderIdControl.setValue(user.Id);
                break;
            }
        }
    }
    // Close topup
    onClose(): void {
        this.dialogRef.close();
    }

    // Save
    saveGroup(): void {
        this.updateGroupFormBeforeSubmit();
        const validate = this.validateForm();

        if (!validate) {
            this._matSnackBar.open(this.errorMessage, 'OK', {
                verticalPosition: 'top',
                duration: 3000
            });

            this.errorMessage = '';
        }
        else {
            let reqModel = this.groupForm.getRawValue();
            // Check id update or insert
            if (this.data.id != null) {
                this._groupService.saveGroup(reqModel).subscribe(res => {
                    CommonFunction.showMatSnackBar(this._matSnackBar, 'Group ' + reqModel.name + ' updated', 'OK');
                    this.onClose();
                });

            }
            else {

                this._groupService.addGroup(reqModel).subscribe(res => {
                    CommonFunction.showMatSnackBar(this._matSnackBar, 'Group ' + reqModel.name + ' added', 'OK');
                    this.onClose();
                });
            }
        }
    }

    // Validate form
    validateForm(): boolean {
        let nameControl = this.groupForm.controls['name'];
        let provinceIdControl = this.groupForm.controls['provinceId'];
        let districtIdControl = this.groupForm.controls['districtId'];
        let communeIdControl = this.groupForm.controls['communeId'];
        let groupleaderIdControl = this.groupForm.controls['groupleaderId'];

        if (nameControl.invalid)
            this.errorMessage += "Name is required, ";
        if (provinceIdControl.invalid)
            this.errorMessage += "Invalid Province, ";
        if (districtIdControl.invalid)
            this.errorMessage += "Invalid District, ";
        if (communeIdControl.invalid)
            this.errorMessage += " InvalidCommune, ";
        if (groupleaderIdControl.invalid)
            this.errorMessage += " Invalid groupleader, ";

        if (this.errorMessage != "" || this.groupForm.invalid)
            return false;
        return true;
    }

    /* Autocompletes */
    initAllAutocomplete() {
        let provinceNameControl = this.groupForm.controls['provinceName'];
        this.filteredProvinces = this.initEventChangeTextAutoComplete(provinceNameControl, this.filterAutocompleteProvince)

        const districtNameControl = this.groupForm.controls['districtName'];
        this.filteredDistricts = this.initEventChangeTextAutoComplete(districtNameControl, this.filterAutocompleteDistrict)

        const communeNameControl = this.groupForm.controls['communeName'];
        this.filteredCommunes = this.initEventChangeTextAutoComplete(communeNameControl, this.filterAutocompleteCommune);

        const groupleaderNameControl = this.groupForm.controls['groupleaderName'];
        groupleaderNameControl.valueChanges.subscribe(res => {
            this.groupleaderNameSubject.next(res);
        })
    }
    // Provinces
    filterAutocompleteProvince = (text: string): any[] => {
        // select the first province when province is null
        if (this.selectedFirstProvince && this.locations && this.locations.length > 0) {
            let firstProvinceName = this.locations[0].ProvinceName;
            this.groupForm.controls['provinceName'].setValue(firstProvinceName);
            text = firstProvinceName.toLowerCase();
            this.selectedFirstProvince = false;
        }
        let result;
        this.updateProvinceId(text);
        if (text) {
            result = this.locations.filter(item => item.ProvinceName.toLowerCase().includes(text));
        }
        else {
            result = this.locations;
        }
        return result;
    }
    updateProvinceId = (name: string) => {
        let province = this.locations.find(p => p.ProvinceName.toLowerCase() == name)
        // controls
        let provinceIdControl = this.groupForm.controls['provinceId'];
        let districtNameControl = this.groupForm.get('districtName');

        if (province != undefined) {
            provinceIdControl.setValue(province.Id);
            districtNameControl.enable();
            this.districts = province.Districts;
        }
        else {
            provinceIdControl.setValue(null);
            districtNameControl.disable();
            this.districts = [];
        }
        if (!this.firstLoad)
            districtNameControl.setValue('');
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
        // controls
        let districtIdControl = this.groupForm.controls['districtId'];
        let communeNameControl = this.groupForm.get('communeName');
        let groupleaderNameControl = this.groupForm.controls['groupleaderName'];


        if (district != undefined) {
            this.groupleaderNameSubject.next(groupleaderNameControl.value);
            districtIdControl.setValue(district.Id);
            communeNameControl.enable();
            this.communes = district.Communes;
        }
        else {
            this.groupleaders = [];
            districtIdControl.setValue(null);
            communeNameControl.disable();
            this.communes = [];
        }
        if (!this.firstLoad)
            communeNameControl.setValue('');
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
        // controls
        let communeIdControl = this.groupForm.controls['communeId'];

        if (commune != undefined) {
            communeIdControl.setValue(commune.Id);
        }
        else {
            communeIdControl.setValue(null);
        }
        console.log(this.groupForm.controls['communeId'].value);
        this.groupleaderNameSubject.next('');
    }
    initEventChangeTextAutoComplete(textControl: AbstractControl, filterFunc: Function
    ): any {
        return textControl.valueChanges
            .pipe(
                startWith<any>(''),
                map(value => typeof value === 'string' ? value.toLowerCase() : value.name),
                map(name => filterFunc(name)),
            );
    }
}

