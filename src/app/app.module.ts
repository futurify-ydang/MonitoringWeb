import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { ModalModule, TabsModule } from '../../node_modules/ngx-bootstrap';

/* My components */
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { MeetingModule } from 'app/main/meeting/meeting.module';
import { ReportingModule } from 'app/main/reporting/reporting.module';
import { LoginModule } from 'app/main/auth/login/login.module';
import { ForgotPasswordModule } from 'app/main/auth/forgot-password/forgot-password.module';
import { AdminModule } from 'app/main/admin/admin.module';
import { MeModule } from './main/me/me.module';
import { FormModule } from 'app/main/form/form.module';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DialogRemoveComponent } from './main/dialogs/remove/dialog-remove.component';
import { LoadingComponent } from './main/loading/loading.component';
import { LoadingInterceptor } from './main/loading/loading.interceptor';
import { YesNoDiablogComponent } from './main/dialogs/yes-no-dialog/yes-no-dialog.component';
import { AppRoutingModule } from './app.routing.module';



const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        DialogRemoveComponent,
        YesNoDiablogComponent,
        LoadingComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,

        //external modules
        ModalModule,
        TabsModule,

        // App modules
        LayoutModule,
        MeetingModule,
        ReportingModule,
        LoginModule,
        ForgotPasswordModule,
        AdminModule,
        MeModule,
        FormModule,
        HttpModule,
        
        AppRoutingModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        DialogRemoveComponent, YesNoDiablogComponent
    ]
})
export class AppModule {
}
