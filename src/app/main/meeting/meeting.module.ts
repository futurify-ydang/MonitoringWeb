import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule, MatProgressSpinnerModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MeetingComponent } from './detail/meeting.component';
import { MeetingsComponent } from './list/meetings.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExportMeetingsComponent } from './export-meetings/export-meetings.component';
import { DialogHistoryComponent } from '../dialogs/history/dialog-history.component';
import { MomentModule } from 'angular2-moment';
import { MeetingRoutingModule } from './meeting.routing';
import { RouterModule, Routes } from '@angular/router';

const routes = [
    {
        path     : 'meeting/list',
        component: MeetingsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_MEETINGS]}
    },
    {
        path     : 'meeting/list/:groupName',
        component: MeetingsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_MEETINGS]}
    },
    {
        path     : 'meeting/export',
        component: ExportMeetingsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.EXPORT_MEETINGS]}
    },
    {
        path     : 'meeting/create',
        component: MeetingComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.CREATE_MEETING]}
    },
    {
        path     : 'meeting/:id',
        component: MeetingComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.EDIT_MEETING]}
    },
];

@NgModule({
    declarations: [
        ExportMeetingsComponent,
        MeetingComponent,
        MeetingsComponent,
        DialogHistoryComponent,
    ],
    imports     : [
        // RouterModule.forChild(routes),
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
        MatProgressSpinnerModule,
        TranslateModule,
        MomentModule,

        MeetingRoutingModule
    ],
    exports     : [
        ExportMeetingsComponent,
        MeetingComponent,
        MeetingsComponent,
    ],
    entryComponents: [
        DialogHistoryComponent
    ]
})

export class MeetingModule
{
}
