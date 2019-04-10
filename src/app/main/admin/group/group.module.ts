import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule, MatDialogModule, MatProgressSpinnerModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogGroupDetail } from '../../dialogs/group-detail/dialog-group-detail';
import { GroupsComponent } from './list/groups.component';
import { DialogRemoveComponent } from 'app/main/dialogs/remove/dialog-remove.component';
import { AuthGuard } from 'app/main/auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule } from '@ngx-translate/core';


const routes = [
    {
        path: 'admin/group/list',
        component: GroupsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_GROUPS]}
    }
];

@NgModule({
    declarations: [
        GroupsComponent,
        DialogGroupDetail
    ],
    imports     : [
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
        MatDialogModule,
        MatProgressSpinnerModule,
        TranslateModule
    ],
    exports     : [
        GroupsComponent
    ],
    entryComponents: [
        DialogGroupDetail
    ]
})

export class GroupModule
{
}
