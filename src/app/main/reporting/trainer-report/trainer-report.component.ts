import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// other lib
import { fuseAnimations } from '@fuse/animations';
import { GroupedChart } from '../model/grouped-vertical-bar-chart.model';
import { LocationService } from 'app/main/admin/location/location.service';
import { ReportService } from '../reporting.serivce';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from 'app/common/function';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { saveAs } from 'file-saver';
// Import the locale files
import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
import { LocalService } from 'app/common/local.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trainer-report',
  templateUrl: './trainer-report.component.html',
  styleUrls: ['./trainer-report.component.scss'],
  animations: fuseAnimations
})
export class TrainerReportComponent implements OnInit {
  loginUser: any;
  trainerReportForm: FormGroup;
  modelToExport: any;
  reportModel: GroupedChart[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  communes: any[] = [];
  groups: any[] = [];
  years: any[] = [];
  isShow: boolean = false;
  authorize = false;
  /* Controls */
  provinceIdControl;
  districtIdControl;
  communeIdControl;
  groupIdControl;
  yearsControl;
  @ViewChild('containerReport', { read: ElementRef }) public containerReport: ElementRef<any>;
  constructor(
    private _translationLoader: FuseTranslationLoaderService,
    private _formBuilder: FormBuilder,
    private _reportService: ReportService,
    private _locationService: LocationService,
    private _matSnackBar: MatSnackBar,
    private _localService: LocalService,
  ) {
    this._translationLoader.loadTranslations(english, vietnamese);
  }

  ngOnInit() {
    this.trainerReportForm = this.createTrainerReportForm();
    this.years = this._reportService.getYears();
    this.loginUser = this._localService.getUser();
    this.initApis();
    this.initBindingControls();
    this.initFormControlEvent();
  }

  createTrainerReportForm(): FormGroup {
    let result = this._formBuilder.group({
      provinceId: [null],
      districtId: [null],
      communeId: [null],
      groupId: [null],
      years: [[]]
    });
    return result;
  }
  checkPermissionUser() {
    let form = this.trainerReportForm;
    let permissions = this.loginUser.Permissions;
    let coordinatorIndex = permissions.findIndex(value => value == 'COORDINATOR');
    let locationLevel = this.loginUser.LocationLevel;
    if (coordinatorIndex >= 0) {
      if (locationLevel == ELocationLevelType.Province) {
        form.controls['provinceId'].setValue(this.loginUser.ProvinceId);
        form.controls['provinceId'].disable();
      }
      else if (locationLevel == ELocationLevelType.District) {
        form.controls['provinceId'].setValue(this.loginUser.ProvinceId);
        form.controls['provinceId'].disable();
        form.controls['districtId'].setValue(this.loginUser.DistrictId);
        form.controls['districtId'].disable();
      }
      else if (locationLevel == ELocationLevelType.Commune) {
        form.controls['provinceId'].setValue(this.loginUser.ProvinceId);
        form.controls['provinceId'].disable();
        form.controls['districtId'].setValue(this.loginUser.DistrictId);
        form.controls['districtId'].disable();
        form.controls['communeId'].setValue(this.loginUser.CommuneId);
        form.controls['communeId'].disable();
      }
      this.authorize = true;
    }
    else {
      form.controls['provinceId'].disable();
      form.controls['districtId'].disable();
      form.controls['communeId'].disable();
      form.controls['groupId'].disable();

      this._matSnackBar.open("You aren't a Coordinator", 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    }
  }
  initBindingControls() {
    this.provinceIdControl = this.trainerReportForm.controls['provinceId'];
    this.districtIdControl = this.trainerReportForm.controls['districtId'];
    this.communeIdControl = this.trainerReportForm.controls['communeId'];
    this.groupIdControl = this.trainerReportForm.controls['groupId'];
    this.yearsControl = this.trainerReportForm.controls['years'];

  }
  initApis() {
    this._locationService.getList().subscribe((res) => {
      this.provinces = res;
      this.checkPermissionUser();
    })
  }

  showReport() {
    this.isShow = false;
    this._checkErrorsSelectedTimes();
    CommonFunction.markAsTouchedAllForm(this.trainerReportForm);
    if (this.trainerReportForm.valid) {
      this.yearsControl.value.sort();
      let modelRequest = this.trainerReportForm.getRawValue();
      this.modelToExport = this.trainerReportForm.getRawValue();
      this._reportService.getTrainerReportModel(modelRequest).subscribe(res => {
        this.reportModel = res;
        if (res && res.length > 0) {
          this.isShow = true;
          setTimeout(() => {
            this.containerReport.nativeElement.scrollIntoView();
          }, 500);
        }
        else {
          this._matSnackBar.open("Don't have any trainer to show", 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        }
      });
    }
  }
  updateTimeSelectedList(element) {
    let selectedYears = this.trainerReportForm.get('years').value as any[];
    if (element._checked) {
      selectedYears.push(element.value);
    }
    else {
      let index = selectedYears.findIndex(item => item === element.value);
      selectedYears.splice(index, 1);
    }
  }

  /* Events */
  initFormControlEvent() {
    this.initEventChangeProvince();
    this.initEventChangeDistrict();
    this.initEventChangeCommune();
  }
  initEventChangeProvince() {
    this.provinceIdControl.valueChanges.subscribe(res => {
      if (!res) {
        this.districtIdControl.setValue(null);
      }
      let selectedProvince = this.provinces.find(p => p.Id == res);
      if (selectedProvince)
        this.districts = selectedProvince.Districts;
      else
        this.districts = [];
    });
  }
  initEventChangeDistrict() {
    this.districtIdControl.valueChanges.subscribe(res => {
      if (!res) {
        this.communeIdControl.setValue(null);
      }
      let selectedDistrict = this.districts.find(d => d.Id == res);
      if (selectedDistrict)
        this.communes = selectedDistrict.Communes;
      else
        this.communes = [];
    });
  }
  initEventChangeCommune() {
    this.communeIdControl.valueChanges.subscribe(res => {
      if (!res) {
        this.groupIdControl.setValue(null);
      }
      let selectedCommune = this.communes.find(d => d.Id == res);
      if (selectedCommune)
        this.groups = selectedCommune.Groups;
      else
        this.groups = [];
    });
  }
  clickExportExcel() {
    this._reportService.exportTrainerReport(this.modelToExport).subscribe(res => {
      var file = new Blob([res], { type: 'application/vnd.ms-excel' });
      saveAs(file, 'TrainnerReport.xlsx');
    });
  }
  private _checkErrorsSelectedTimes() {
    let selectedTimes = this.trainerReportForm.get('years').value;
    if (selectedTimes == undefined || selectedTimes.length == 0) {
      this.trainerReportForm.controls['years'].setErrors({ 'required': true });
    }
    else {
      this.trainerReportForm.controls['years'].setErrors(null);
    }
  }
}
enum ELocationLevelType {
  All = 1,
  Province = 2,
  District = 3,
  Commune = 4,
}