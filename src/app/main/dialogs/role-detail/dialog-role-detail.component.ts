import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';


import { PermissionService } from '../../admin/permission/permission.service';
import { ReqRole } from 'app/main/admin/permission/models/req-role.model';
import { TranslateService } from '@ngx-translate/core';




@Component({
    selector: 'dialog-role-detail',
    templateUrl: 'dialog-role-detail.component.html',
    styleUrls: ['dialog-role-detail.component.css'],
})
export class DialogRoleDetailComponent implements OnInit {

    values: string;
    roleDetail: ReqRole;
    data: { id: number, title: string };

    nameControl = new FormControl('', Validators.required);

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogRoleDetailComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private _matSnackBar: MatSnackBar,
        private _permissionService: PermissionService,
        private _translate: TranslateService
    ) {
        this.roleDetail = new ReqRole();
        this.data = data;
    }

    ngOnInit(): void {
        if (this.data.id) {
            this._permissionService.getRole(this.data.id).subscribe((role) => {
                this.roleDetail.id = role.Id;
                this.roleDetail.name = role.Name;
            });
        }
        else {
            this.roleDetail = new ReqRole();
        }
    }

    saveRole(): void {
        const role = this._translate.instant('PERMISSION.ROLE');
        const ok = this._translate.instant('COMMON.OK');

        const validate = this.validateForm();

        if (validate != null) {
            this._matSnackBar.open(`${this._translate.instant(validate)} ${this._translate.instant('COMMON.IS_NULL_OR_INVALID')}`, ok, {
                verticalPosition: 'top',
                duration: 2000
            });
        }
        else {
            if (this.data.id != null) {
                this.roleDetail.id = this.data.id;
                this._permissionService.updateRole(this.roleDetail).subscribe(() => {
                    this._matSnackBar.open(`${role} ${this.nameControl.value} ${this._translate.instant('COMMON.IS_UPDATED')}`, ok, {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    this.onClose();
                }, (res) => {
                   
                });
            }
            else {
                this._permissionService.addRole(this.roleDetail).subscribe(() => {
                    this._matSnackBar.open(`${role} ${this.nameControl.value} ${this._translate.instant('COMMON.IS_ADDED')}`, ok, {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    this.onClose();
                }, (res) => {
                   
                });
            }
        }
    }

    onClose(): void {
        this.dialogRef.close();
    }

    // Validate form
    validateForm(): string {
        if (this.nameControl.invalid) {
            this.nameControl.markAsTouched();
            return 'PERMISSION.ROLE_NAME';
        }

        return null;
    }
}
