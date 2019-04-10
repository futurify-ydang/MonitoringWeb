import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/main/admin/user/user.service';
import { CommonFunction } from 'app/common/function';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from '../../../i18n/en';
import { locale as navigationVietnamese } from '../../../i18n/vi';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatDialog, MatDialogConfig } from '@angular/material';
@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    sendOTPForm: FormGroup;
    updatepasswordForm: FormGroup;
    wasSentPassword: boolean = false;
    wasSendOTP: number = 1;
    countDown = 60;
    mobileNumberControl: AbstractControl;
    otpControl: AbstractControl;
    passwordControl: AbstractControl;
    confirmPasswordControl: AbstractControl;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _transaleService: TranslateService,
        private _matSnackBar: MatSnackBar,
        private router: Router
    ) {
        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationVietnamese);
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            mobileNumber: ['', [Validators.required]]
        });

        this.sendOTPForm = this._formBuilder.group({
            otp: ['',[Validators.required]]
        });

        this.updatepasswordForm = this._formBuilder.group({
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        });

        this.mobileNumberControl = this.forgotPasswordForm.controls['mobileNumber'];
        this.otpControl = this.sendOTPForm.controls['otp'];
        this.passwordControl = this.updatepasswordForm.controls['password'];
        this.confirmPasswordControl = this.updatepasswordForm.controls['confirmPassword'];
    }

    sendOtp() {
        let mobileNumberControl = this.mobileNumberControl;
        mobileNumberControl.markAsTouched();
        if (mobileNumberControl.valid) {
            this.countDown = 60;
            let mobileNumber = mobileNumberControl.value;
            this._userService.sendOtpForgotPassword(mobileNumber).subscribe(() => {
                this.wasSendOTP = 2;
                const interval = setInterval(() => {
                    this.countDown--;
                    if (this.countDown <= 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            });
        }
    }

    sendPassword() {
        let otpControl = this.otpControl;
        otpControl.markAsTouched();
        if (otpControl.valid) {
            let mobileNumber = this.mobileNumberControl.value;
            let otp = otpControl.value;
            this._userService.forgotPassword(mobileNumber, otp).subscribe(() => {
                this.wasSentPassword = true;
                this.wasSendOTP = 3;
            });
        }
    }

    updatePassword(){
        let password = this.passwordControl;
        password.markAsTouched();
        let confirmPassword = this.confirmPasswordControl;
        confirmPassword.markAsTouched();

        if(password.value != confirmPassword.value){
            let MesError = this._transaleService.store.translations.en.FORGOT_PASSWORD.error_Confirm_Password;
            console.log(this._transaleService.defaultLang);
            console.log(this._transaleService);
            
            if(this._transaleService.currentLang == 'vi'){
                MesError = this._transaleService.store.translations.vi.FORGOT_PASSWORD.error_Confirm_Password;

            }
            CommonFunction.showMatSnackBar(this._matSnackBar, MesError, 'OK');
            return;
        }        

        if(password.valid && confirmPassword.valid){ 

            let mobileNumber:string = this.mobileNumberControl.value;
            let otp:string = this.otpControl.value;
            let newpassword:string = password.value;

            let requestModel = {
                PhoneNumber : mobileNumber,
                NewPassword: newpassword,
                OTP : otp
            }

            this._userService.updatePassword(requestModel).subscribe(() => {
                this.router.navigateByUrl('/auth/login');
            });
        }
        
    }
}
