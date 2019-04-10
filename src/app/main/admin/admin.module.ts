import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupModule } from './group/group.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { PermissionModule } from './permission/permission.module';
import { AppRoutingModule } from './admin.router.module';

@NgModule({
    declarations: [],
    imports     : [
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
        GroupModule,
        UserModule,
        LocationModule,
        PermissionModule,
        AppRoutingModule
    ],
    exports     : [
    ]
})

export class AdminModule
{
}
