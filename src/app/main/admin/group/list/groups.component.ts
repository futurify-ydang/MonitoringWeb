import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogGroupDetail } from 'app/main/dialogs/group-detail/dialog-group-detail';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { GroupService } from 'app/main/admin/group/group.service';
import { ReqModelGetListGroup } from '../models/req-get-list-group.model';
import { CustomDataSource } from 'app/common/custom-datasource';
import { LocationService } from '../../location/location.service';
import { DialogRemoveComponent } from 'app/main/dialogs/remove/dialog-remove.component';
import { Subject } from 'rxjs';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';


import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
import { LoginService } from 'app/common/login.service';
import { Role } from 'app/common/models/role';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonFunction } from 'app/common/function';
import { CurrentUserModel } from 'app/common/models/current-user.model';

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    animations: fuseAnimations
})

export class GroupsComponent implements OnInit {
    currUser: CurrentUserModel;
    isCoordinator: boolean = false;
    searchSubject: Subject<string> = new Subject<string>();
    displayedColumns: string[] = ['id', 'name', 'firstMeeting', 'lastMeeting', 'totalMeeting', 'leader'];
    locations: any[] = [];
    itemsPerPageLabelElement: Element;

    reqModelGetList: ReqModelGetListGroup;
    dataSource: CustomDataSource;
    firstLoad: boolean = true;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        public dialog: MatDialog,
        private _groupService: GroupService,
        private _loginService: LoginService,
        private _translateService: TranslateService,
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
        this.searchSubject.pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(res => {
                this.reqModelGetList.keywords = res;
                this.reload();
            });

        if (this.showActions()) {
            this.displayedColumns.push('actions');
        }
    }

    ngOnInit() {
        this.currUser = this._loginService.getUser();
        this.dataSource = new CustomDataSource(this._groupService);
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
    openChangeGroupDialog(id?: number) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            id: id,
        };

        let dialogRef = this.dialog.open(DialogGroupDetail, dialogConfig);

        dialogRef.afterClosed().subscribe(() => this.reload());
    }
    openRemoveDialog(id?: number) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            Result: false,
            Message: "Are you sure?"
        };

        let dialogRef = this.dialog.open(DialogRemoveComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this._groupService.removeGroup(id).subscribe(() => this.reload());
            }
        });
    }
    updateReqModelGetList() {
        if (this.firstLoad) {
            this.reqModelGetList = { keywords: "", page: 0, length: 100, sortDirection: "asc", sortFieldName: "Id", provinceId: null, districtId: null, communeId: null, trainerId: null };
            this.updateModelSearchGroup();
        }
        else {
            this.reqModelGetList.page = this.paginator.pageIndex;
            this.reqModelGetList.length = this.paginator.pageSize;
            this.reqModelGetList.sortFieldName = this.sort.active;
            this.reqModelGetList.sortDirection = this.sort.direction;
        }
    }
    updateModelSearchGroup() {
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
        else{
            this.reqModelGetList.trainerId = this.currUser.Id;
        }
    }
    reload() {
        this.updateReqModelGetList();
        this.dataSource.reload(this.reqModelGetList, this.paginator);
    }

    /* Events */
    searchKeywords(text) {
        this.searchSubject.next(text);
    }

    showCreateGroup = () => this._loginService.hasPermission([Role.CREATE_GROUP]);
    showEditGroup = () => this._loginService.hasPermission([Role.EDIT_GROUP]);
    showDeleteGroup = () => this._loginService.hasPermission([Role.DELETE_GROUP]);
    showActions = () => this._loginService.hasPermission([Role.EDIT_GROUP, Role.DELETE_GROUP]);
}