import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge } from "rxjs/observable/merge";
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProvinceService } from '../province.service';
import { DialogProvinceDetail } from '../../../../dialogs/province-detail/dialog-province-detail';
import { ReqModelGetListProvince } from '../../models/req-get-list-province.model';
import { CustomDataSource } from '../../../../../common/custom-datasource';
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
    selector: 'provinces',
    templateUrl: './provinces.component.html',
    styleUrls: ['./provinces.component.scss'],
    animations: fuseAnimations
})
export class ProvincesComponent implements OnInit, AfterViewInit {
    searchSubject: Subject<string> = new Subject<string>();
    displayedColumns: string[] = ['id', 'name', 'createdAt'];
    reqModelGetList: ReqModelGetListProvince;
    dataSource: CustomDataSource;
    firstLoad: boolean = true;
    itemsPerPageLabelElement: Element;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        public dialog: MatDialog,
        private _provinceService: ProvinceService,
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
        this.dataSource = new CustomDataSource(this._provinceService);
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
    openChangeProvinceDialog(id?: string) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            id: id,
        };

        let dialogRef = this.dialog.open(DialogProvinceDetail, dialogConfig);

        dialogRef.afterClosed().subscribe(() => this.reload());
    }

    removeProvinceDialog(id?: number) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            Result: false,
            Message: 'Are you sure?'
        };

        const dialogRef = this.dialog.open(DialogRemoveComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this._provinceService.removeProvince(id).subscribe(() => this.reload());
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

     // Event
     searchKeywords = (text: string) => this.searchSubject.next(text);

    showCreateProvince = () => this._loginService.hasPermission([Role.CREATE_PROVINCE]);
    showEditProvince = () => this._loginService.hasPermission([Role.EDIT_PROVINCE]);
    showDeleteProvince = () => this._loginService.hasPermission([Role.DELETE_PROVINCE]);
    showActions = () => this._loginService.hasPermission([Role.EDIT_PROVINCE, Role.DELETE_PROVINCE]);
}
