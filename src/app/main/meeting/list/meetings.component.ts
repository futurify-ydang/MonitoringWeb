import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ReqModelGetListMeeting } from '../../../common/models/req-get-list-meeting.model';
import { Subject, merge } from 'rxjs';
import { UserService } from '../../admin/user/user.service';
import { CustomDataSource } from '../../../common/custom-datasource';
import { MeetingService } from '../meeting.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonFunction } from 'app/common/function';

import { locale as navigationEnglish } from 'app/main/meeting/list/i18n/en';
import { locale as navigationVietnamese } from 'app/main/meeting/list/i18n/vi';
import { LoginService } from 'app/common/login.service';
import { Role } from 'app/common/models/role';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserModel } from 'app/common/models/current-user.model';



@Component({
    selector: 'meetings',
    templateUrl: './meetings.component.html',
    styleUrls: ['./meetings.component.scss'],
    animations: fuseAnimations
})

export class MeetingsComponent implements OnInit {
    currUser: CurrentUserModel;
    isCoordinator: boolean = false;
    keywordsSubject: Subject<string> = new Subject<string>();
    displayedColumns: string[] = ['id', 'meetingDate', 'numberOfParticipants', 'groupName', 'trainerName'];
    reqModelGetList: ReqModelGetListMeeting = new ReqModelGetListMeeting();
    dataSource: CustomDataSource;
    firstLoad = true;
    itemsPerPageLabelElement: Element;

    fromDate: Date;
    toDate: Date;

    /* used for auto complete */
    filteredFullNameList: string[] = [];
    fullNameList: string[] = [];

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(private _userService: UserService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _meetingService: MeetingService,
        private _loginService: LoginService,
        private _translateService: TranslateService,
        private _route: ActivatedRoute,
    ) {
        
    }

    ngOnInit() {

        this.keywordsSubject.pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(res => {
                this.reqModelGetList.keywords = res;
                this.reload();
            });

        if (this.showActions()) {
            this.displayedColumns.push('actions');
        }

        this.currUser = this._loginService.getUser();
        console.log(this.currUser);
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);

        this.dataSource = new CustomDataSource(this._meetingService);
        this.reload();
        this.firstLoad = false;

    }

    ngAfterViewInit() {
        // on event for paginate and sort
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.reload())
            )
            .subscribe();
        // inits translate items per page label for mat paginator
        this.itemsPerPageLabelElement = document.getElementsByClassName('mat-paginator-page-size-label')[0];
        this.initItemsPerPageLabelForMatPaginator();
    }
    initItemsPerPageLabelForMatPaginator() {
        this.itemsPerPageLabelElement.innerHTML = CommonFunction.getItemsPerPageLabelTranslateOfMatTable(this._translateService, this.paginator);
        this._translateService.onLangChange.subscribe((params: LangChangeEvent) => {
            this.itemsPerPageLabelElement.innerHTML = CommonFunction.getItemsPerPageLabelTranslateOfMatTable(this._translateService, this.paginator);
        });
    }
    updateReqModelGetList() {
        if (this.firstLoad) {
            this.reqModelGetList = { keywords: "", page: 0, length: 100, sortDirection: "desc", sortFieldName: "Id", fromDate: null, toDate: null, provinceId: null, districtId: null, communeId: null, trainerId: null };
            this.reqModelGetList.keywords = this._route.snapshot.paramMap.get('groupName');
            this.updateModelSearch();
        }
        else {
            this.reqModelGetList.page = this.paginator.pageIndex;
            this.reqModelGetList.length = this.paginator.pageSize;
            this.reqModelGetList.sortFieldName = this.sort.active;
            this.reqModelGetList.sortDirection = this.sort.direction;
        }
    }

    updateModelSearch() {
        this.isCoordinator = this.currUser.Permissions.findIndex(value => value == 'COORDINATOR') >= 0;
        if (this.isCoordinator) {
            // Location level : 1: all, 2: province, 3: district, 4: commune
            if (this.currUser.LocationLevel == 2) {
                this.reqModelGetList.provinceId = this.currUser.ProvinceId;
            }
            else if (this.currUser.LocationLevel == 3) {
                this.reqModelGetList.districtId = this.currUser.DistrictId;
            }
            else if (this.currUser.LocationLevel == 4) {
                this.reqModelGetList.communeId = this.currUser.CommuneId;
            }
        }
        else {
            this.reqModelGetList.trainerId = this.currUser.Id;
        }
    }

    reload() {
        this.updateReqModelGetList();
        this.dataSource.reload(this.reqModelGetList, this.paginator);
    }

    searchKeywords(text) {
        this.keywordsSubject.next(text);
    }

    filterDate() {
        const offsetTimeZone = new Date().getTimezoneOffset();

        // from 
        if (this.fromDate != undefined) {
            this.reqModelGetList.fromDate = new Date(this.fromDate);
            this.reqModelGetList.fromDate.setMinutes(this.reqModelGetList.fromDate.getMinutes() - offsetTimeZone);
        }
        else {
            this.reqModelGetList.fromDate = undefined;
        }

        // to date
        if (this.toDate != undefined) {
            this.reqModelGetList.toDate = new Date(this.toDate);
            this.reqModelGetList.toDate.setMinutes(this.reqModelGetList.toDate.getMinutes() - offsetTimeZone);
            this.reqModelGetList.toDate.setHours(this.reqModelGetList.toDate.getHours() + 24);
        }
        else {
            this.reqModelGetList.toDate = undefined;
        }

        this.reload();
    }

    showCreateMeeting = () => this._loginService.hasPermission([Role.CREATE_MEETING]);
    showEditMeeting = () => this._loginService.hasPermission([Role.EDIT_MEETING]);
    showExportMeeting = () => this._loginService.hasPermission([Role.EXPORT_MEETINGS]);
    showActions = () => this._loginService.hasPermission([Role.EDIT_MEETING]);
}
