// angular lib
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CommonFunction } from 'app/common/function';
// other lib
import { fuseAnimations } from '@fuse/animations';
import { Permission } from '../../model/permission.model';
import { PermissionService } from '../permission.service';
import { DialogRoleDetailComponent } from '../../../dialogs/role-detail/dialog-role-detail.component';
import { GroupPermission } from '../../model/group.permission.model';
import { ReqModelGetListRole } from '../../location/models/req-get-list-role.model';
import { CustomDataSource } from 'app/common/custom-datasource';
import { merge } from 'rxjs/observable/merge';
import { tap } from 'rxjs/operators';
import { DialogRemoveComponent } from 'app/main/dialogs/remove/dialog-remove.component';


@Component({
    selector: 'permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss'],
    animations: fuseAnimations
})

export class PermissionsComponent implements OnInit, AfterViewInit {
    itemsPerPageLabelElement: Element;
    displayedColumns: string[] = ['id', 'name', 'actions'];
    // permissions: Permission[];
    groupPermissions: GroupPermission[];
    permission: Permission;
    rolePermissions: any;
    permissionTitle: string;
    title: string;
    roleId: number;
    reqModelGetList: ReqModelGetListRole;
    dataSource: CustomDataSource;
    firstLoad = true;
    showPermissions = false;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        public _permissionService: PermissionService,
        private _translateService: TranslateService,
    ) {

    }

    ngOnInit(): void {
        // this.permissions = PERMISSION_DATA;
        //   this.groupPermissions = GROUP_PERMISSION_DATA;
        this._permissionService.getListPermission().subscribe(res => {
            this.groupPermissions = res;
        });
        this.dataSource = new CustomDataSource(this._permissionService);
        this.reload();
        this.firstLoad = false;
    }

    ngAfterViewInit(): void {
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
    reload(): void {
        this.updateReqModelGetList();
        this.dataSource.reload(this.reqModelGetList, this.paginator);
    }

    updateReqModelGetList(): void {
        if (this.firstLoad) {
            this.reqModelGetList = { keywords: '', page: 0, length: 10, sortDirection: 'asc', sortFieldName: 'Id' };
        }
        else {
            this.reqModelGetList.page = this.paginator.pageIndex;
            this.reqModelGetList.length = this.paginator.pageSize;
            this.reqModelGetList.sortFieldName = this.sort.active;
            this.reqModelGetList.sortDirection = this.sort.direction;
        }
    }

    openRoleDetailDialog(id?: string): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        if (id != null) {
            this.title = 'PERMISSION.EDIT_ROLE';
        }
        else {
            this.title = 'PERMISSION.NEW_ROLE';
        }

        dialogConfig.data = {
            id: id,
            title: this.title
        };

        const dialogRef = this.dialog.open(DialogRoleDetailComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(() => this.reload());
    }

    removeRole(id: number): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            Result: false,
            Message: 'COMMON.ARE_YOU_SURE'
        };

        const dialogRef = this.dialog.open(DialogRemoveComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this._permissionService.removeRole(id).subscribe(() => this.reload());
            }
        });
    }

    getPermission(id?: number, name?: string): void {
        this.showPermissions = true;
        this.roleId = id;

        this._permissionService.getRolePermission(id).subscribe((res) => {
            this.rolePermissions = res;
            console.log(this.rolePermissions);
        });
        this.permissionTitle = name;
    }

    selectedPermission(value: string): boolean {
        let permissionsOfRole = null;
        if (this.rolePermissions) {
            if (this.rolePermissions.IsAssignAll) {
                return true;
            }
            permissionsOfRole = this.rolePermissions.PermissionIds;
        }
        if (permissionsOfRole && permissionsOfRole.indexOf(value) !== -1) {
            return true;
        }
        return false;
    }

    selected(name: string): void {
        const rolePermissions = this.rolePermissions.PermissionIds;

        if (rolePermissions.indexOf(name) === -1) {
            this._permissionService.addRolePermission(
                { roleId: this.roleId, permissionId: name }
            ).subscribe(
                () => {
                    this.reloadRolePermission();
                }
            );
        }
        else {
            this._permissionService.removeRolePermission({ roleId: this.roleId, permissionId: name }).subscribe(
                () => {
                    this.reloadRolePermission();
                }
            );
        }
    }

    assignOrUnAssignAll(isAssignAll: boolean) {
        this._permissionService.assignOrUnAssignAll(this.roleId, isAssignAll).subscribe(() => {
            this.reloadRolePermission();
        });
    }
    reloadRolePermission() {
        this._permissionService.getRolePermission(this.roleId).subscribe((res) => {
            this.rolePermissions = res;
        });
    }
}
