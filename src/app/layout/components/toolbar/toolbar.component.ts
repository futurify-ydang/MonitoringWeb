import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material';
import { DialogChangePassword } from '../../../main/dialogs/change-password/dialog-change-password';
import { DialogChangePhoneNumberComponent } from '../../../main/dialogs/change-phone-number/dialog-change-phone-number';

// import { navigation } from 'app/navigation/navigation';
import { ProfileService } from '../../../main/me/my-profile/my-profile.service';
import { User } from '../../../common/models/user.model';
import { LocalService } from 'app/common/local.service';
import { API_USERMANAGEMENT_HOST } from 'app/app.constant';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    id: number;
    avatar: string;
    fullName: string;
    apiHost = API_USERMANAGEMENT_HOST;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        public dialog: MatDialog,
        public _profileService: ProfileService,
        private _localSerivce: LocalService,
        private _cookieService: CookieService,
        private _router: Router
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        // this.navigation = navigation;

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'vi',
                title: 'Vietnamese',
                flag: 'vn'
            }
        ];

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        let user =  this._localSerivce.getUser();
        if (user)
            this.id =  this._localSerivce.getUser().Id;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let cookie:string = this._cookieService['document'].cookie;
        if(!cookie.includes('access_token')){
            this._router.navigate(['/auth/login']);
        }
        
        this.avatar = '/assets/images/avatars/no-image-icon-hi.png';
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang }) ||  this.languages[0];
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
        if (this.id) {
            this._profileService.getSummaryProfile().subscribe(res => {

                this.fullName = res.FullName;

                if (res.AvatarUrl)
                    this.avatar = this.apiHost + res.AvatarUrl;
                 // Use the selected language for translations
                 // Set the selected language from default languages
                 this._translateService.use(res.Language);
                this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
            });
        }

        this._profileService.avatar.subscribe((res) => {
            if (res != null)
                this.avatar = res;
        });

        this._profileService.fullName.subscribe((res) => {
            if (res != null)
                this.fullName = res;
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
        * Toggle sidebar open
        *
        * @param key
        */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
    openChangePasswordDialog() {
        this.dialog.open(DialogChangePassword, { disableClose: true });
    }

    openChangePhoneNumberDialog() {
        this.dialog.open(DialogChangePhoneNumberComponent, { disableClose: true });
    }

    logOut = () => {
        this._localSerivce.logout();
    };

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
        this._profileService.setLanguage(lang.id).subscribe();
    }
}
