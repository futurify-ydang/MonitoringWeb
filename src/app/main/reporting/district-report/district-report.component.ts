import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
// other lib
import { GroupedChart } from '../model/grouped-vertical-bar-chart.model';
import { ELEMENT_DATA_COLOR_SCHEME } from '../grouped-bar-chart/grouped-bar-chart.component';
import { LocationService } from 'app/main/admin/location/location.service';
import { ReportService } from '../reporting.serivce';
import { MatSnackBar } from '@angular/material';
import { CommonFunction } from 'app/common/function';

// Import the locale files
import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'app-district-report',
  templateUrl: './district-report.component.html',
  styleUrls: ['./district-report.component.scss'],
  animations: fuseAnimations
})
export class DistrictReportComponent implements OnInit {
  districtReportForm: FormGroup;
  reportModel: GroupedChart[] = [];
  provinces: any[];
  districts: any[];
  years: any[];
  isShow: boolean = false;

  colorScheme = ELEMENT_DATA_COLOR_SCHEME;
  textScheme = [];

  @ViewChild('containerReport', { read: ElementRef }) public containerReport: ElementRef<any>;
  constructor(
    private _translationLoader: FuseTranslationLoaderService,
    private _formBuilder: FormBuilder,
    private _reportService: ReportService,
    private _locationService: LocationService,
    private _matSnackBar: MatSnackBar
  ) {
    this._translationLoader.loadTranslations(english, vietnamese);

  }

  ngOnInit() {
    this.years = this._reportService.getYears();
    this.initApis();
    this.districtReportForm = this.createLocationReportForm();
  }
  initApis() {
    this._locationService.getList().subscribe((res) => {
      this.provinces = res;
    })
  }
  createLocationReportForm(): FormGroup {
    return this._formBuilder.group({
      provinceId: [null, [Validators.required]],
      districtIds: [[]],
      years: [[]]
    });
  }
  /*
  isShow used to remove and show new chart
   */
  showReport() {
    this.isShow = false;
    this._checkErrorsSelectedTimes();
    CommonFunction.markAsTouchedAllForm(this.districtReportForm);
    if (this.districtReportForm.valid) {
      this.updateFormBeforeSubmit();
      let yearsControl = this.districtReportForm.controls['years'];
      yearsControl.value.sort();
      let modelRequest = this.districtReportForm.getRawValue();
      this._reportService.getDistrictReportModel(modelRequest).subscribe(res => {
        this.reportModel = res;
        this.textScheme = yearsControl.value.map(item => item);
        if (res && res.length > 0) {
          this.isShow = true;
          setTimeout(() => {
            this.containerReport.nativeElement.scrollIntoView();
          }, 500);
        }
        else {
          this._matSnackBar.open("Don't have any district to show", 'OK', {
            verticalPosition: 'top',
            duration: 2000
          });
        }
      });
    }

  }
  updateFormBeforeSubmit() {
    let provinceId = this.districtReportForm.controls['provinceId'].value;
    let districtIdsControl = this.districtReportForm.controls['districtIds'];
    let districtIds = districtIdsControl.value;
    if (!districtIds || districtIds.length == 0) {
      let allDistricts = this.provinces.find(p => p.Id == provinceId).Districts;
      let allDistrictIds = allDistricts.map(item => item.Id);
      districtIdsControl.setValue(allDistrictIds);
    }
  }
  // used to push or remove years of form control
  updateTimeSelectedList(element) {
    let selectedYears = this.districtReportForm.get('years').value;
    if (element._checked) {
      selectedYears.push(element.value);
    }
    else {
      let index = selectedYears.findIndex(item => item === element.value);
      selectedYears.splice(index, 1);
    }
  }

  /* Events */
  eventChangeProvince(provinceId): void {
    let selectedProvince = this.provinces.find(p => p.Id == provinceId);
    let districtIdsControl = this.districtReportForm.controls['districtIds'];
    districtIdsControl.setValue([]);
    if (selectedProvince)
      this.districts = selectedProvince.Districts;
  }
  private _checkErrorsSelectedTimes() {
    let selectedTimes = this.districtReportForm.get('years').value;
    if (selectedTimes == undefined || selectedTimes.length == 0) {
      this.districtReportForm.controls['years'].setErrors({ 'required': true });
    }
    else {
      this.districtReportForm.controls['years'].setErrors(null);
    }
  }
}

