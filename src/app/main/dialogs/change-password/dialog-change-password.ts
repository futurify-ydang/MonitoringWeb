import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ProfileService } from 'app/main/me/my-profile/my-profile.service';
import { MustMatch, MustNotMatch } from 'app/common/validate';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as vietnam} from './i18n/vi';
import { locale as english} from './i18n/en';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'app/common/local.service';
import { Router } from '@angular/router';


@Component({
  selector: 'dialog-change-password',
  templateUrl: 'dialog-change-password.html',
})
export class DialogChangePassword implements OnInit {
    changePassWordForm: FormGroup;
    changePassword: ChangePasswordModel;
    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogChangePassword>,
        private _profileService: ProfileService,
        private _matSnackBar: MatSnackBar,
        private translationLoader: FuseTranslationLoaderService,
        private translate: TranslateService,
        private _router: Router,
        private _localSerivce: LocalService,
    ) {
        this.changePassword = new ChangePasswordModel();
        this.translationLoader.loadTranslations(english, vietnam);
    }

    ngOnInit(): void {
        this.changePassWordForm = this._formBuilder.group(
            {
                oldPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            },
            { 
                validator: [
                    MustMatch('newPassword', 'confirmPassword'),
                    MustNotMatch('oldPassword', 'newPassword')
                ] 
            }
        );
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.validAllForm();
        
        if (!this.changePassWordForm.invalid){
            this._profileService.updatePassword({
                OldPassword: this.changePassword.OldPassword,
                NewPassword: this.changePassword.NewPassword
            }).subscribe(() => {
                this._matSnackBar.open(this.translate.instant('CHANGE_PASSWORD.UPDATE_PASSWORD_SUCCESSFUL'), 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this.onClose();
                this._localSerivce.logout();
                setTimeout(() => {
                    this._router.navigate(['/auth/login']);
                }, 2000);
            });
        }
    }

    // Validate form
    private validAllForm(): void {
        Object.keys(this.changePassWordForm.controls).forEach(key => {
            const item = this.changePassWordForm.controls[key];
            if (!item.valid){
                this.changePassWordForm.controls[key].markAsTouched();
            }
        });
    }

    checkPasswords(group: FormGroup): any {
        const pass = group.controls.newPassword.value;
        const confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };   
    }
}

export class ChangePasswordModel {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}
