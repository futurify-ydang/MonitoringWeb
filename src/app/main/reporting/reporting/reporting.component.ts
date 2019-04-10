import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// other lib
import { fuseAnimations } from '@fuse/animations';

// my lib
import { LocationService } from 'app/main/admin/location/location.service';
import { DropdownGroupItem, DropdownGroupChildItem } from '../model/dropdown-group-item.model';
import { ReportService } from '../reporting.serivce';
import { CommonFunction } from 'app/common/function';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
// Import the locale files
import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
  animations: fuseAnimations
})
export class ReportingComponent implements OnInit {
  reportingForm: FormGroup;
  firstLoad: boolean = true;
  provinces: any[] = [];
  currLanguage: any;
  /* used to binding without submit*/
  groups: DropdownGroupItem[] = [];
  communes: DropdownGroupItem[] = [];
  districts: DropdownGroupItem[] = [];
  questionList = [];
  firstScopeTypeDropdownItems = [];
  secondScopeTypeDropdownItems = [];
  timeSelectList = [];

  //Controls
  firstScopeTypeControl;
  firstSelectedControl;
  secondScopeTypeControl;
  secondSelectedControl;
  timeTypeControl;
  selectedTimesControl;
  formElementIdsControl;


  constructor(
    private _translationLoader: FuseTranslationLoaderService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _reportService: ReportService,
    private _locationService: LocationService,
    private _translateService: TranslateService,
    private _elRef: ElementRef
  ) {
    this.currLanguage = this._translateService.currentLang.toUpperCase();
    this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
      this.currLanguage = params.lang.toUpperCase();
    });
    this._translationLoader.loadTranslations(english, vietnamese);
  }

  ngOnInit() {
    this.reportingForm = this.createMeetingForm();
    this.initBindingControls();
    this.initApis();
    this.initControlsEvent();
  }
  initApis() {
    this._locationService.getList().subscribe(res => {
      this.provinces = res;
      this.initDropdownOptionsList();
      this.firstLoad = false;
    });
  }
  initDropdownOptionsList() {
    // provinces
    this.provinces.forEach(province => {
      // districts
      this.districts.push({
        title: province.ProvinceName,
        childs: province.Districts.map(item => <DropdownGroupChildItem>{
          id: item.Id, name: item.DistrictName
        }),
      })

      province.Districts.forEach(district => {
        // Communes
        this.communes.push({
          title: province.ProvinceName + ' > ' + district.DistrictName,
          childs: district.Communes.map(item => <DropdownGroupChildItem>{
            id: item.Id, name: item.CommuneName
          }),
        })

        district.Communes.forEach(commune => {
          // groups
          this.groups.push({
            title: province.ProvinceName + ' > ' + district.DistrictName + ' > ' + commune.CommuneName,
            childs: commune.Groups.map(item => <DropdownGroupChildItem>{
              id: item.Id, name: item.GroupName
            }),
          })
        });
      });
    });
    this.firstScopeTypeDropdownItems = this.getScopeTypeDropdown(true);
    this.secondScopeTypeDropdownItems = this.getScopeTypeDropdown(false);
    this.updateTimeList();
    this.updateQuestion();
  }
  createMeetingForm(): FormGroup {
    let model = ELEMENT_DATA_REPORTING.model;
    var form = this._formBuilder.group({
      firstScopeType: [1, [Validators.required]],
      firstSelected: [null, [Validators.required]],
      secondScopeType: [1, [Validators.required]],
      secondSelected: [null, [Validators.required]],
      timeType: [1, [Validators.required]],
      selectedTimes: [[]],
      formElementIds: [[]]
    });
    if (model) {
      form.controls['firstScopeType'].setValue(model.firstScopeType);
      form.controls['firstSelected'].setValue(model.firstSelected);
      form.controls['secondScopeType'].setValue(model.secondScopeType);
      form.controls['secondSelected'].setValue(model.secondSelected);
      form.controls['timeType'].setValue(model.timeType);
      form.controls['selectedTimes'].setValue(model.selectedTimes);
      form.controls['formElementIds'].setValue(model.formElementIds);
    }
    return form;
  }
  initBindingControls() {
    this.firstScopeTypeControl = this.reportingForm.controls['firstScopeType'];
    this.firstSelectedControl = this.reportingForm.controls['firstSelected'];
    this.secondScopeTypeControl = this.reportingForm.controls['secondScopeType'];
    this.secondSelectedControl = this.reportingForm.controls['secondSelected'];
    this.timeTypeControl = this.reportingForm.controls['timeType'];
    this.selectedTimesControl = this.reportingForm.controls['selectedTimes'];
    this.formElementIdsControl = this.reportingForm.controls['formElementIds'];
  }

  /* use to update dropdown list when user change ScopeType */
  getScopeTypeDropdown(isTheFirstSelect: boolean) {
    let array = [];
    let scopeTypeValue;
    if (isTheFirstSelect) {
      scopeTypeValue = this.firstScopeTypeControl.value;
    }
    else {
      scopeTypeValue = this.secondScopeTypeControl.value;
    }
    /* The second select */
    if (scopeTypeValue == 1) {
      array = this.groups;
    }
    else if (scopeTypeValue == 2) {
      array = this.communes;
    }
    else if (scopeTypeValue == 3) {
      array = this.districts;
    }
    else if (scopeTypeValue == 4) {
      array = this.provinces;
    }
    return array;
  }
  updateTimeSelectedList(element) {
    let selectedTimes = this.selectedTimesControl.value;
    if (element._checked) {
      selectedTimes.push(element.value);
    }
    else {
      let index = selectedTimes.findIndex(item => item === element.value);
      selectedTimes.splice(index, 1);
    }
    this._checkErrorsSelectedTimes();
    this.updateQuestion();
  }
  updateTimeSelectedQuestions(element) {
    let formElementIds = this.formElementIdsControl.value;
    if (element._checked) {
      formElementIds.push(element.value);
    }
    else {
      let index = formElementIds.findIndex(value => value === element.value);
      formElementIds.splice(index, 1);
    }
    this._checkErrorsSelectedQuestions();
  }

  updateQuestion() {
    let modelRequest = this.reportingForm.getRawValue();
    if (modelRequest.firstSelected && modelRequest.firstSelected && modelRequest.selectedTimes && modelRequest.selectedTimes.length > 0) {
      this._reportService.getQuestion(modelRequest).subscribe(res => {
        this.questionList = res.FormElements;
      });
    }
    else {
      this.questionList = [];
    }
    console.log(this.formElementIdsControl.value);
    if (!this.firstLoad) {
      this.formElementIdsControl.setValue([]);
    }
  }
  updateTimeList() {
    let modelRequest = this.reportingForm.getRawValue();
    if (modelRequest.firstSelected && modelRequest.secondSelected) {
      this._reportService.getTimeList(modelRequest).subscribe(res => {
        this.timeSelectList = res;
      });
    }
    else {
      this.timeSelectList = [];
    }
    if (!this.firstLoad) {
      this.selectedTimesControl.setValue([]);
    }
  }
  submit() {
    this._checkErrorsSelectedTimes();
    this._checkErrorsSelectedQuestions();
    CommonFunction.markAsTouchedAllForm(this.reportingForm);
    if (this.reportingForm.valid) {
      let modelRequest = this.reportingForm.getRawValue();
      modelRequest.selectedTimes.sort();
      ELEMENT_DATA_REPORTING.model = modelRequest;
      this._router.navigate(['/reporting/view']);
    }
  }

  /* Events */
  initControlsEvent() {
    this.initFirstScopeTypeEvents();
    this.initSecondScopeTypeEvents();
    this.initFirstSelecteEvents();
    this.initSecondSelecteEvents();
    this.initTimeTypeEvents();
  }
  initFirstScopeTypeEvents() {
    this.firstScopeTypeControl.valueChanges.subscribe(res => {
      this.firstSelectedControl.setValue(null);
      this.firstScopeTypeDropdownItems = this.getScopeTypeDropdown(true);
    });
  }
  initFirstSelecteEvents() {
    this.firstSelectedControl.valueChanges.subscribe(res => {
      this.updateTimeList();
      this.updateQuestion();
    });
  }
  initSecondSelecteEvents() {
    this.secondSelectedControl.valueChanges.subscribe(res => {
      this.updateTimeList();
      this.updateQuestion();
    });
  }
  initSecondScopeTypeEvents() {
    this.secondScopeTypeControl.valueChanges.subscribe(res => {
      this.secondSelectedControl.setValue(null);
      this.secondScopeTypeDropdownItems = this.getScopeTypeDropdown(false);
    });
  }
  initTimeTypeEvents() {
    this.timeTypeControl.valueChanges.subscribe(res => {
      this.selectedTimesControl.setValue([]);
      this.updateTimeList();
      this.updateQuestion();
    });
  }
  private _checkErrorsSelectedTimes() {
    let selectedTimes = this.reportingForm.get('selectedTimes').value;
    if (selectedTimes == undefined || selectedTimes.length == 0) {
      this.reportingForm.controls['selectedTimes'].setErrors({ 'required': true });
    }
    else {
      this.reportingForm.controls['selectedTimes'].setErrors(null);
    }
  }
  private _checkErrorsSelectedQuestions() {
    let formElementIds = this.formElementIdsControl.value;
    if (formElementIds == undefined || formElementIds.length == 0) {
      this.formElementIdsControl.setErrors({ 'required': true });
    }
    else {
      this.formElementIdsControl.setErrors(null);
    }
  }
}
export const ELEMENT_DATA_REPORTING: any = { model: null };