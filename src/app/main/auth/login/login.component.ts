import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from 'app/common/login.service';
import { ResLogin } from './models/res-login.model';
import { ReqLogin } from './models/req-login.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { locale as navigationEnglish } from './i18n/en';
import { locale as navigationVietnamese } from './i18n/vn';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LocalService } from 'app/common/local.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { YesNoDiablogComponent } from 'app/main/dialogs/yes-no-dialog/yes-no-dialog.component';
import { UserService } from 'app/main/admin/user/user.service';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginModel: ReqLogin;
    errorMessage: string;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _router: Router,
        private _translateService: TranslateService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _localSerivce: LocalService,
        private _userService: UserService,
        public dialog: MatDialog,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        let currLanguage = this._localSerivce.getItem('CURR_LANGUAGE');
        this._translateService.use(currLanguage);
        this.loginModel = new ReqLogin();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
        this.loginForm = this._formBuilder.group({
            mobileNumber: ['', [Validators.required]],
            password: ['', Validators.required],
            remember: [false]
        });
    }
    logIn() {
        this.validAllForm();
        if (!this.loginForm.invalid) {
            this.executeLogin();
            // change request: not show login alert
            // this._userService.checkLoggedIn(this.loginModel.username).subscribe((res) => {
            //     if (res) {
            //         this.showDialog();
            //     }
            //     else {
            //         this.executeLogin();
            //     }
            // });
        }
    }
    // show dialog alert will be log out the accounts on other devices
    private showDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            Result: false,
            EnMessage: 'This account will be logged out on the other devices. Are you sure?',
            ViMessage: 'Tài khoản sẽ bị đăng xuất trên các thiệt bị khác. Bạn chắc chứ?',
        };
        const dialogRef = this.dialog.open(YesNoDiablogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.executeLogin();
            }
        });
    }
    // execute login
    private executeLogin() {
        this._loginService.logIn(this.loginModel).subscribe((res: ResLogin) => {
            this._loginService.setLoggedIn(res, this.loginForm.controls['remember'].value);
            const lang = this._localSerivce.getUser().Language || 'en';
            this._translateService.use(lang);
            this._router.navigate(['/meeting/list']);
        });
    }
    // Validate form
    private validAllForm(): void {
        Object.keys(this.loginForm.controls).forEach(key => {
            const item = this.loginForm.controls[key];
            if (!item.valid) {
                this.loginForm.controls[key].markAsTouched();
            }
        });
    }
}
