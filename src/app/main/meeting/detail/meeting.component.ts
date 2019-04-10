// angular lib
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatDialog, MatDialogConfig } from '@angular/material';
import { Location } from '@angular/common';

// other lib
import { fuseAnimations } from '@fuse/animations';
import * as moment from 'moment/moment'

// my lib

import { MeetingService } from '../meeting.service';
import { Question, QUESTION_DATA, EQuestionType } from '../Model/question.model';

import { Meeting } from '../../../common/models/meeting.model';
import { Group } from '../../../common/models/group.model';
import { UserService } from '../../admin/user/user.service';
import { Observable, of, forkJoin } from 'rxjs';
import { map, startWith, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { GroupService } from '../../admin/group/group.service';
import { ReqModelGetListGroup } from '../../admin/group/models/req-get-list-group.model';
import { User } from '../../../common/models/user.model';
import { ReqModelGetListUser } from '../../admin/user/models/req-get-list-user.model';
import { ReqModelUpdateMeeting } from '../../../common/models/req-update-meeting.model';
import { LoginService } from 'app/common/login.service';
import { LocalService } from 'app/common/local.service';
import { FormService } from 'app/main/form/form.service';
import { E_ELEMENT_TYPE } from 'app/main/form/models/form-element.model';
import { CommonFunction } from 'app/common/function';
import { locale as navigationEnglish } from 'app/main/meeting/detail/i18n/en';
import { locale as navigationVietnamese } from 'app/main/meeting/detail/i18n/vn';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HISTORY_TYPE } from 'app/main/dialogs/history/req-dialog-history';
import { Log } from '../model/res-dialog-history';
import { HistoryService } from 'app/common/history.service';
import { ProfileService } from 'app/main/me/my-profile/my-profile.service';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';
import { UserOptionModel } from 'app/common/models/user-option.model';
import { searchKeywordTrainerValidator, searchKeywordGroupValidator } from 'app/common/custom-validators/meeting-validator';
import { CurrentUserModel } from 'app/common/models/current-user.model';
import { SearchGroupOptionModel } from 'app/common/models/search-group-option.model';


@Component({
    selector: 'meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss'],
    animations: fuseAnimations
})

export class MeetingComponent implements OnInit {
    currUser: CurrentUserModel;
    meeting: Meeting;
    surveyForm: any = {};
    elementType;
    currLanguage: string;
    pageType: string;
    searchGroupModel: SearchGroupOptionModel;
    @ViewChild('meetingForm') meetingForm: NgForm;
    id: string;
    updateMeetingModel: ReqModelUpdateMeeting = new ReqModelUpdateMeeting();
    isCoordinator: boolean = false;
    canEdit: boolean = true;
    api_host = API_USERMANAGEMENT_HOST;
    durations: number[];
    location: string;
    communeIdToSearchTrainer: number = 0;
    firstLoad: boolean = true;

    /* image upload */
    @ViewChild('fileInput') inputFile: ElementRef;
    safeImgDataUrls: string[] = [];

    meetingDateControl = new FormControl('', Validators.required);
    durationControl = new FormControl('', Validators.required);
    locationControl = new FormControl('', Validators.required);
    numberOfParticipantsControl = new FormControl(0, Validators.required);
    descriptionControl = new FormControl();
    imagePaths: string[] = [];
    httpRequests: any[] = [];
    /* enum */
    eQuestiontype = EQuestionType;

    // used for user autocomplete
    trainers$: Observable<any[]>;
    keywordsSearchTrainerControl = new FormControl('', [searchKeywordTrainerValidator()]);
    // used for group autocomplete
    groups$: Observable<any[]>;
    groups: Group[] = [];
    keywordsSearchGroupControl = new FormControl('', [searchKeywordGroupValidator()]);

    histories: Log[];
    totalLengthHistory: number;
    currentLengthHistory = 10;

    constructor(
        private _meetingService: MeetingService,
        private _translateService: TranslateService,
        private _formService: FormService,
        private _route: ActivatedRoute,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _userService: UserService,
        private _groupService: GroupService,
        private _profileService: ProfileService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public dialog: MatDialog,
        private _historyService: HistoryService,
        private _localSerivce: LocalService,
        private _loginService: LoginService,
    ) {
        
    }

    ngOnInit(): void {
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
        this.currLanguage = this._translateService.currentLang.toUpperCase();
        this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
            this.currLanguage = params.lang.toUpperCase();
        });
        this.meeting = new Meeting();

        this.currUser = this._loginService.getUser();
        this.updateModelSearchGroup();

        // Set the navigation translations
        this.elementType = E_ELEMENT_TYPE;
        this.durations = [30, 60, 120, 150];
        this.locationControl.disable();
        this.id = this._route.snapshot.paramMap.get('id');

        if (!this.id) {
            this.pageType = 'new';
        }
        else {
            this.pageType = 'edit';
        }

        this.httpRequests.push(
            this._groupService.getSelectListGroupLocatin(this.searchGroupModel).map(group => {
                this.groups = group;
            })
        );
        // group need to load before get meeting
        if (this.id) { // update meeting
            this.httpRequests.push(
                this._meetingService.getMeetingDetail(Number.parseInt(this.id)).map(meeting => {
                    this.meeting = meeting;
                    this.imagePaths = this.meeting.MeetingImages.map(mi => mi.ImagePath);
                    this.GetSurveyForm(this.meeting.FormId, this.meeting.Id).subscribe();
                })
            );
        }
        else { // new meeting
            this.httpRequests.push(
                this.GetSurveyForm(0, 0)
            );
        }
        forkJoin(this.httpRequests).subscribe(() => {
            this.initEvents();
            if (!this.isCoordinator && !this.id) {
                this._profileService.getProfileDetail(this.currUser.Id).subscribe(res => {
                    this.keywordsSearchTrainerControl.setValue({ Id: res.Id, FullName: res.FullName });
                });
            }
            if (this.id) {
                this.keywordsSearchGroupControl.setValue(this.meeting.Group);
                this.keywordsSearchTrainerControl.setValue(this.meeting.Trainer);
                if (!this.isCoordinator) {
                    let validDateToEdit = moment(this.meeting.CreatedAt).add(30, 'days').toDate();
                    let now = new Date();
                    if (validDateToEdit < now) {
                        this.canEdit = false;
                        this.keywordsSearchGroupControl.disable();
                        this.keywordsSearchTrainerControl.disable();
                        this.numberOfParticipantsControl.disable();
                        this.descriptionControl.disable();
                    }
                    console.log(this.canEdit);
                }
            }
            setTimeout(() => {
                this.firstLoad = false;
            }, 1000);
        });
    }
    updateModelSearchGroup() {
        this.searchGroupModel = { keywords: '', communeId: null, provinceId: null, districtId: null, defaultTrainerId: null, length: 10 };
        this.isCoordinator = this.currUser.Permissions.findIndex(value => value == 'COORDINATOR') >= 0;
        if (this.isCoordinator) {
            // Location level : 1: all, 2: province, 3: district, 4: commune
            if (this.currUser.LocationLevel == 2) {
                this.searchGroupModel.provinceId = this.currUser.ProvinceId;
            }
            else if (this.currUser.LocationLevel == 3) {
                this.searchGroupModel.districtId = this.currUser.DistrictId;
            }
            else if (this.currUser.LocationLevel == 4) {
                this.searchGroupModel.communeId = this.currUser.CommuneId;
            }
        }
        else {
            this.searchGroupModel.defaultTrainerId = this.currUser.Id;
        }
    }
    initEvents() {
        this.keywordsSearchTrainerControl.valueChanges
            .pipe(
                startWith(''),
                debounceTime(500),
                map(value => {
                    let type = typeof (value);
                    if (type === "object" && value) {
                        this.updateMeetingModel.TrainerId = value.Id;
                        return value.FullName;
                    }
                    else {
                        this.updateMeetingModel.TrainerId = null;
                        return value;
                    }
                }),
                map(value => {
                    this.trainers$ = this._userService.getUsersForOptions({
                        keywords: value,
                        length: 10,
                        communeId: this.communeIdToSearchTrainer,
                    });
                })
            )
            .subscribe();

        this.keywordsSearchGroupControl.valueChanges
            .pipe(
                startWith(''),
                debounceTime(500),
                map(value => {
                    let keywords = '';
                    let type = typeof (value);
                    if (type === "string") {
                        var group = this.groups.find(g => g.Name == value);
                        if (group) {
                            this.updateWhenSelectGroup(group);
                            keywords = group.Name;
                        }
                        else {
                            this.updateMeetingModel.GroupId = null;
                            this.location = "";
                            this.communeIdToSearchTrainer = 0;
                            if (!this.firstLoad) {
                                this.keywordsSearchTrainerControl.setValue('');
                            }
                            keywords = value;
                        }
                    }
                    else if (type === "object" && value) {
                        this.updateWhenSelectGroup(value);
                        keywords = value.Name;
                    }
                    this.groups$ = this._getObservableGroups(keywords);
                })
            )
            .subscribe();
    }
    updateWhenSelectGroup(model) {
        this.updateMeetingModel.GroupId = model.Id;
        this.location = model.CommuneName + ', ' + model.DistrictName + ', ' + model.ProvinceName;
        console.log(model.CommuneId);
        this.communeIdToSearchTrainer = model.CommuneId || 0;
        if (this.isCoordinator && !this.firstLoad) {
            this.keywordsSearchTrainerControl.setValue({
                Id: model.DefaultTrainerId,
                FullName: model.DefaultTrainerName
            })
        }
        else if (!this.isCoordinator && !this.firstLoad) {
            this.keywordsSearchTrainerControl.setValue('')
        }
    }
    GetSurveyForm(formId, meetingId) {
        return this._formService.getFormByMeeting(formId, meetingId).map(res => {
            this.surveyForm = res;
        });
    }

    // Save meeting
    saveMeeting(): void {
        const validate = this.validateForm();

        if (!validate) {
            this._matSnackBar.open('Error', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
        else {
            this.updateReqModel();
            this._meetingService.updateMeeting(this.updateMeetingModel).subscribe(() => {
                CommonFunction.showMatSnackBar(this._matSnackBar, 'Meeting saved', 'OK');
                this._location.back();
            });
        }
    }

    // Add meeting
    addMeeting(): void {
        const validate = this.validateForm();

        if (!validate) {
            this._matSnackBar.open('Error', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
        else {
            this.updateReqModel();
            this._meetingService.addMeeting(this.updateMeetingModel).subscribe(res => {
                // Show the success message
                CommonFunction.showMatSnackBar(this._matSnackBar, 'Meeting created', 'OK');
                this._location.back();
            });
        }
    }
    // Update updateMeetingModel
    updateReqModel() {
        this.updateMeetingModel.Id = this.meeting.Id;
        this.updateMeetingModel.Description = this.meeting.Description;
        this.updateMeetingModel.FormId = this.meeting.FormId;
        this.updateMeetingModel.Duration = this.meeting.Duration;
        this.updateMeetingModel.MeetingDate = new Date(this.meeting.MeetingDate).toLocaleDateString();
        this.updateMeetingModel.Form = this.surveyForm;
        this.updateMeetingModel.NumberOfParticipants = this.meeting.NumberOfParticipants;
        // when update, not need to send image path because they was updated as soon as user choose images
        if (!this.updateMeetingModel.Id || this.updateMeetingModel.Id == 0) {
            this.updateMeetingModel.ImagePaths = this.imagePaths;
        }
    }
    /**
     * handle Change
     */
    handleInputChange(event) {
        if (event && event.target && event.target.files && event.target.files.length > 0) {
            var meetingId = this.id ? parseInt(this.id) : null;
            this._meetingService.uploadImage(meetingId, event.target.files).subscribe(res => {
                res.map(item => this.imagePaths.push(item));
            });
        }
    }
    /**
     * remove image
     */
    removeImage(path: string, index: number) {
        var meetingImage = this.meeting.MeetingImages.find(mi => mi.ImagePath == path);
        var id = meetingImage != null ? meetingImage.Id : null;
        var pathTemp = this.imagePaths[index];
        this._meetingService.removeImage(id, pathTemp).subscribe(() => {
            this.imagePaths.splice(index, 1);
        });
    }

    // Validate form
    validateForm(): boolean {

        if (this.meetingDateControl.invalid) {
            this.meetingDateControl.markAsTouched();
            return false;
        }

        if (this.durationControl.invalid) {
            this.durationControl.markAsTouched();
            return false;
        }

        if (this.keywordsSearchTrainerControl.invalid) {
            this.keywordsSearchTrainerControl.markAsTouched();
            return false;
        }
        if (this.keywordsSearchGroupControl.invalid) {
            this.keywordsSearchGroupControl.markAsTouched();
            return false;
        }
        if (this.meetingForm.invalid) {
            CommonFunction.markAsTouchedAllForm(this.meetingForm);
            return false;
        }
        return true;
    }

    getHistory(): void {
        if (this.id) {
            this._historyService.getHistory(HISTORY_TYPE.MEETING, +this.id, 1, this.currentLengthHistory).subscribe((res) => {
                this.histories = res.Items;
                this.totalLengthHistory = res.Total;
            });
        }
    }

    loadMore(): void {
        if (this.currentLengthHistory < this.totalLengthHistory) {
            this.currentLengthHistory = this.currentLengthHistory + 1;
            this.getHistory();
        }
    }
    //Events
    tabChangeEvent(event) {
        if (event.index == 1 && (!this.histories || this.histories.length == 0)) {
            this.getHistory();
        }
    }
    // Autocomplete
    getValueOfTextFieldTrainerAutoComplete(model?: any): string {
        return model ? model.FullName : "";
    }
    getValueOfTextFieldGroupAutoComplete(model?: any): string {
        return model ? model.Name : "";
    }
    private _getObservableGroups(value): Observable<any> {
        if (this.groups)
            return of(this.groups.filter(g => g.Name.includes(value)));
        return of([]);
    }
}
