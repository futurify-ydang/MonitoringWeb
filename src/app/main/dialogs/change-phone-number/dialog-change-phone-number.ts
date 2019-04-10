import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ProfileService } from 'app/main/me/my-profile/my-profile.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'app/common/local.service';
import { Router } from '@angular/router';


@Component({
    selector: 'dialog-change-phone-number',
    templateUrl: 'dialog-change-phone-number.html',
    styleUrls: ['dialog-change-phone-number.css']
})
export class DialogChangePhoneNumberComponent implements OnInit {
    changePhoneNumberForm: FormGroup;
    changePhoneNumber: ChangePhoneNumber;
    isSendOTP = false;
    countDown = 60;

    constructor(
        private _formBuilder: FormBuilder,
        private _profileService: ProfileService,
        private _matSnackBar: MatSnackBar,
        private _translate: TranslateService,
        private _router: Router,
        private _localSerivce: LocalService,
        public dialogRef: MatDialogRef<DialogChangePhoneNumberComponent>
    ) {
        this.changePhoneNumber = new ChangePhoneNumber();
    }

    ngOnInit(): void {
        this.changePhoneNumberForm = this._formBuilder.group({
            newPhoneNumber: ['', Validators.required],
            otp: ['', Validators.required]
        });
    }

    onSendOTP(): void {
        this._profileService.sendOTP(this.changePhoneNumber).subscribe(() => {
            this.isSendOTP = true;
            const interval = setInterval(() => {
                this.countDown--;
                if (this.countDown <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
        });
    }

    onReSendOTP(): void {
        if (this.countDown > 0){
            return;
        }
        this._profileService.reSendOTP(this.changePhoneNumber).subscribe(() => {
            this.countDown = 60;
            const interval = setInterval(() => {
                this.countDown--;
                if (this.countDown <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
            this._matSnackBar.open(this._translate.instant('CHANGE_PHONE_NUMBER.RE_SEND_SUCCESSFUL'), 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        });
    }

    onVerifyOTP(): void {
        this._profileService.verifyOTP(this.changePhoneNumber).subscribe(() => {
            this._matSnackBar.open(this._translate.instant('CHANGE_PHONE_NUMBER.UPDATE_PHONE_NUMBER_SUCCESSFUL'), 'OK', {
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

    onClose(): void {
        this.isSendOTP = false;
        this.dialogRef.close();
    }
}

export class ChangePhoneNumber {
    NewPhoneNumber: string;
    OTP: string;
}
