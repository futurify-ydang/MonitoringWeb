import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge } from "rxjs/observable/merge";
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DialogCommuneDetail } from '../../../../dialogs/commune-detail/dialog-commune-detail';
import { CommuneService } from '../commune.service';
import { CustomDataSource } from 'app/common/custom-datasource';
import { ReqModelGetListCommune } from '../../models/req-get-list-commune.model';
import { DialogRemoveComponent } from 'app/main/dialogs/remove/dialog-remove.component';
import { Subject } from 'rxjs';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonFunction } from 'app/common/function';

import { locale as english } from '../../i18n/en';
import { locale as vietnamese } from '../../i18n/vi';
import { LoginService } from 'app/common/login.service';
import { Role } from 'app/common/models/role';
@Component({
    selector: 'communes',
    templateUrl: './communes.component.html',
    styleUrls: ['./communes.component.scss'],
    animations: fuseAnimations
})
export class CommunesComponent implements OnInit {
    searchSubject: Subject<string> = new Subject<string>();
    displayedColumns: string[] = ['id', 'name', 'districtName', 'provinceName', 'createdAt'];
    itemsPerPageLabelElement: Element;

    reqModelGetList: ReqModelGetListCommune;
    dataSource: CustomDataSource;
    firstLoad: boolean = true;
    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        public dialog: MatDialog,
        public _communeService: CommuneService,
        private _loginService: LoginService,
        private _translateService: TranslateService,
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
        this.searchSubject.pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(res => {
                this.reqModelGetList.keywords = res;
                this.reload();
            });

        if (this.showActions()){
            this.displayedColumns.push('actions');
    }
    }

    ngOnInit() {
        this.dataSource = new CustomDataSource(this._communeService);
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
    openChangeCommuneDialog(id?: string) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            id: id,
        };

        let dialogRef = this.dialog.open(DialogCommuneDetail, dialogConfig);

        dialogRef.afterClosed().subscribe(() => this.reload());
    }

    removeCommuneDialog(id?: number) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            Result: false,
            Message: 'Are you sure?'
        };

        const dialogRef = this.dialog.open(DialogRemoveComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this._communeService.removeCommune(id).subscribe(() => this.reload());
            }
        });
    }
    updateReqModelGetList() {
        if (this.firstLoad) {
            this.reqModelGetList = { keywords: "", page: 0, length: 100, sortDirection: "asc", sortFieldName: "Id" };
        }
        else {
            this.reqModelGetList.page = this.paginator.pageIndex;
            this.reqModelGetList.length = this.paginator.pageSize;
            this.reqModelGetList.sortFieldName = this.sort.active;
            this.reqModelGetList.sortDirection = this.sort.direction;
        }
    }
    reload() {
        this.updateReqModelGetList();
        this.dataSource.reload(this.reqModelGetList, this.paginator);
    }

    // Events
    searchKeywords = (text: string) => this.searchSubject.next(text);

    showCreateCommune = () => this._loginService.hasPermission([Role.CREATE_COMMUNE]);
    showEditCommune = () => this._loginService.hasPermission([Role.EDIT_COMMUNE]);
    showDeleteCommune = () => this._loginService.hasPermission([Role.DELETE_COMMUNE]);
    showActions = () => this._loginService.hasPermission([Role.EDIT_COMMUNE, Role.DELETE_COMMUNE]);
}
