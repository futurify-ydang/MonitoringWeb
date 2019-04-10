import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule, MatListOption, MatListModule, MatFormFieldModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule, MatTreeModule, MatCheckboxModule, MatExpansionModule, MatProgressSpinnerModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PermissionsComponent } from './list/permissions.component';
import { DialogRoleDetailComponent } from '../../dialogs/role-detail/dialog-role-detail.component';
import { AuthGuard } from 'app/main/auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule } from '@ngx-translate/core';


const routes = [
    {
        path: 'admin/permission/list',
        component: PermissionsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.MANAGE_ROLES]}
    }
];


@NgModule({
    declarations: [
        PermissionsComponent,
        DialogRoleDetailComponent
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
        MatTreeModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatListModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        TranslateModule
    ],
    exports: [
        PermissionsComponent
    ],
    entryComponents: [
        DialogRoleDetailComponent
    ]
})

export class PermissionModule
{
}
