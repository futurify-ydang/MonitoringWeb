import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProfileComponent } from './my-profile/detail/my-profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from '../auth/guard/auth.guard';
import { TranslateModule } from '@ngx-translate/core';
import { MeRoutingModule } from './me.routing';



const routes = [
    {
        path: 'my-profile/detail',
        component: MyProfileComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        MyProfileComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        BrowserAnimationsModule,
        CommonModule,
        FuseSharedModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatChipsModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatRadioModule,
        FlexLayoutModule,
        TranslateModule,

        MeRoutingModule
    ],
    exports: [
        MyProfileComponent
    ]
})

export class MeModule
{
}
