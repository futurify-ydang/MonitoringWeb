// angular lib
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

// other lib
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from '../../../../i18n/en';
import { locale as navigationVietnamese } from '../../../../i18n/vi';

import { ReqModelUpdateUser } from '../models/user.model';
import { UserService } from '../user.service';
import { LocationService } from '../../location/location.service';
import { PermissionService } from '../../permission/permission.service';
import { GroupService } from '../../group/group.service';
import { forkJoin } from 'rxjs';
import { CommonFunction } from 'app/common/function';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: fuseAnimations
})

export class DetailComponent implements OnInit {
  user: ReqModelUpdateUser;
  pageType: string;
  userForm: FormGroup;
  id: number;
  firstLoad: boolean = true;
  /* list data for dropdown list */
  provinces: any[] = [];
  districts: any[] = [];
  communes: any[] = [];
  roles: any[] = [];
  selectListGroup: any[] = [];
  /* used for Coordinator */
  locationTypeList = [{ value: 1, text: 'All' }, { value: 2, text: 'Province' }, { value: 3, text: 'District' }, { value: 4, text: 'Commune' }];
  /* others */
  @ViewChild('fileInput') inputFile: ElementRef;
  safeImgDataUrls: any[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _groupService: GroupService,
    private _locationService: LocationService,
    private _permistionSerivce: PermissionService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _matSnackBar: MatSnackBar,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,

  ) {
    this.user = new ReqModelUpdateUser();
    // Set the navigation translations
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
  }

  ngOnInit(): void {
    this.id = +this._route.snapshot.paramMap.get('id');
    this.initAPIs();
    if (!this.id) {
      this.pageType = 'new';
    }
    else {
      this.pageType = 'edit';
    }

    this.userForm = this.createUserForm();
  }
  initAPIs() {
    let getListLocation = this._locationService.getList();
    let getListRoles = this._permistionSerivce.getRoleOptions(null);

    forkJoin([getListLocation, getListRoles]).subscribe(res => {
      this.provinces = res[0];
      this.roles = res[1].Items;
      if (this.id) {
        this._userService.getUserDetail(this.id).subscribe(user => {
          this.user = user;
          this.updateForEdit(user);
          this.firstLoad = false;
        });
      }
    });
  }
  createUserForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.user.Id],
      firstName: [this.user.FirstName, [Validators.required]],
      lastName: [this.user.LastName, [Validators.required]],
      provinceId: [this.user.ProvinceId, [Validators.required]],
      districtId: [this.user.DistrictId],
      communeId: [this.user.CommuneId],
      groupIds: [this.user.GroupIds],
      groups: [[]],
      leaderOfGroupId: [this.user.LeaderOfGroupId],
      mobileNumber: [this.user.MobileNumber, [Validators.required]],
      dateOfBirth: [this.user.DateOfBirth],
      roleId: [this.user.RoleId, [Validators.required]],
      locationLevelType: [this.user.LocationLevelType, [Validators.required]],
      status: [this.user.Status],
    });
  }
  /**
   * Save user
   */
  saveUser(): void {
    this.updateFormBeforeSubmit();
    let userModel = this.userForm.getRawValue();
    let fullName = userModel.firstName + ' ' + userModel.lastName;
    CommonFunction.markAsTouchedAllForm(this.userForm);
    if (this.userForm.valid) {
      this._userService.saveUser(userModel).subscribe(res => {
        this._router.navigate(['/admin/user/list']);
        // Show the success message
        this._matSnackBar.open('User ' + fullName + ' saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
    }
  }

  /**
   * Add user
   */
  addUser(): void {
    this.updateFormBeforeSubmit();
    let userModel = this.userForm.getRawValue();
    let fullName = userModel.firstName + ' ' + userModel.lastName;
    CommonFunction.markAsTouchedAllForm(this.userForm);
    if (this.userForm.valid) {
      this._userService.addUser(userModel).subscribe(
        (res: boolean) => {
          if (res) {
            this._router.navigate(['/admin/user/list']);
            // Show the success message
            this._matSnackBar.open('User ' + fullName + ' added', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          }
        }
      );
    }
  }
  updateForEdit(user) {
    this.userForm = this.createUserForm();
    this.eventChangeProvince();
    this.eventChangeDistrict();
    this.eventChangeLocationlevel();
  }
  updateSelectGroups(districtId: number, groupIds: number[]) {
    this._groupService.getGroupsGroupbyCommune(districtId, "").subscribe(res => {
      this.selectListGroup = res;
      let result = [];
      this.selectListGroup.forEach(item => {
        item.Groups.forEach(group => {
          if (groupIds.includes(group.Id))
            result.push(group);
        });
      });
      this.userForm.controls['groups'].setValue(result);
    });
  }
  updateFormBeforeSubmit() {
    // controls
    let groupsControl = this.userForm.controls['groups'];
    let groupdIdsControl = this.userForm.controls['groupIds'];

    let groupIds = groupsControl.value.map(value => value.Id);
    groupdIdsControl.setValue(groupIds);

  }
  /* Events */
  eventChangeProvince(): void {
    let provinceControl = this.userForm.get('provinceId')
    let districtControl = this.userForm.get('districtId')
    let communeControl = this.userForm.get('communeId');
    let groupsControl = this.userForm.get('groups');
    if (!this.firstLoad) {
      districtControl.setValue(null);
      communeControl.setValue(null);
      groupsControl.setValue([]);
    }
    let selectedProvinceId = provinceControl.value;
    this.districts = this.provinces.find(p => p.Id == selectedProvinceId).Districts;
    this.communes = [];
  }
  eventChangeDistrict(): void {
    let provinceControl = this.userForm.get('provinceId');
    let districtControl = this.userForm.get('districtId');
    let communeControl = this.userForm.get('communeId');
    let groupsControl = this.userForm.get('groups');
    let groupIdsControl = this.userForm.get('groupIds');
    if (!this.firstLoad) {
      communeControl.setValue(null);
      groupsControl.setValue([]);
      groupIdsControl.setValue([]);
    }
    let district = this.provinces.find(p => p.Id == provinceControl.value)
      .Districts.find(d => d.Id == districtControl.value);
    if (district) {
      this.communes = district.Communes;
      this.updateSelectGroups(district.Id, groupIdsControl.value);
    }
    else {
      this.communes = [];
      this.selectListGroup = [];
    }
  }

  eventChangeLocationlevel(): void {
    let locationLevelValue = this.userForm.get('locationLevelType').value;

    let districtControl = this.userForm.controls['districtId'];
    let communeControl = this.userForm.controls['communeId'];

    this._updateValidationLocationControl(districtControl, true);
    this._updateValidationLocationControl(communeControl, true);
    if (locationLevelValue >= 3) {
      this._updateValidationLocationControl(districtControl, false);
    }
    if (locationLevelValue >= 4) {
      this._updateValidationLocationControl(communeControl, false);
    }
  }

  /* Private */
  _updateValidationLocationControl(control: AbstractControl, isClear: boolean) {
    if (isClear) {
      control.clearValidators();
    }
    else {
      control.setValidators([Validators.required]);
      control.markAsTouched();
    }
    control.updateValueAndValidity();
  }
}