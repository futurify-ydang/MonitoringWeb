import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule, MatProgressSpinnerModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommunesComponent } from './list/communes.component';
import { DialogCommuneDetail } from '../../../dialogs/commune-detail/dialog-commune-detail';
import { AuthGuard } from 'app/main/auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
    {
        path: 'admin/location/commune/list',
        component: CommunesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_COMMUNES]}
    }
];

@NgModule({
    declarations: [
        CommunesComponent,
        DialogCommuneDetail
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
        MatProgressSpinnerModule,
        TranslateModule
    ],
    exports: [
        CommunesComponent
    ],
    entryComponents: [
        DialogCommuneDetail
    ]
})

export class CommuneModule
{
}
