import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from './login.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
    {
        path     : 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
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
        LoginComponent
    ]
})

export class LoginModule
{
}
