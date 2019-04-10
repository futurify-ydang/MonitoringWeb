import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { merge } from "rxjs/observable/merge";
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../user.service';
import { ReqModelGetListUser } from '../models/req-get-list-user.model';
import { ResModelGetListUser } from '../models/res-get-list-user.model';
import { CustomDataSource } from 'app/common/custom-datasource';
import { Subject, Observable } from 'rxjs';
import { Role } from 'app/common/models/role';
import { LoginService } from 'app/common/login.service';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from '../../../../i18n/en';
import { locale as navigationVietnamese } from '../../../../i18n/vi';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonFunction } from 'app/common/function';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations
})
export class ListComponent implements OnInit {
  users: ResModelGetListUser[];
  keywordsSubject: Subject<string> = new Subject<string>();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'role', 'firstLogin', 'lastLogin', 'numberOfMeetingRegistered', 'groups'];
  itemsPerPageLabelElement: Element;

  reqModelGetList: ReqModelGetListUser = new ReqModelGetListUser();
  dataSource: CustomDataSource;
  firstLoad: boolean = true;

  /* used for auto complete */
  // filteredFullNameList: Observable<string[]>;
  filteredFullNameList: string[] = [];
  fullNameList: string[] = [];

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  constructor(
    private _userService: UserService,
    private _loginService: LoginService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
  ) {
    this.keywordsSubject.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(res => {
        this.reqModelGetList.keywords = res;
        this.reload();
      });

    if (this.showActions()){
      this.displayedColumns.push('actions');
    }
  }

  ngOnInit() {
    // Set the navigation translations
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
    this._userService.getFullNameList().subscribe(res => {
      this.filteredFullNameList = res;
      this.fullNameList = res
    });
    this.dataSource = new CustomDataSource(this._userService);
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

  /* Events */
  searchKeywords(text) {
    this.keywordsSubject.next(text);
  }

  showCreateUser = () => this._loginService.hasPermission([Role.CREATE_USER]);
  showEditUser = () => this._loginService.hasPermission([Role.EDIT_USER]);
  showActions = () => this._loginService.hasPermission([Role.EDIT_USER]);
}
