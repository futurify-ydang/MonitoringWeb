import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
    {
        path     : 'auth/forgot-password',
        component: ForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TranslateModule,
        FuseSharedModule
    ],
    exports     : [
        ForgotPasswordComponent
    ]
})

export class ForgotPasswordModule
{
}
