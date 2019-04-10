import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule,
    MatAutocompleteModule, MatSelectModule, MatRadioModule, MatProgressSpinnerModule
    
    } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProvincesComponent } from './list/provinces.component';
import { DialogProvinceDetail } from '../../../dialogs/province-detail/dialog-province-detail';
import { AuthGuard } from 'app/main/auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
    {
        path: 'admin/location/province/list',
        component: ProvincesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_PROVINCES]}
    }
];

@NgModule({
    declarations: [
        ProvincesComponent,
        DialogProvinceDetail
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
        ProvincesComponent
    ],
    entryComponents: [
        DialogProvinceDetail
    ]
})

export class ProvinceModule
{
}
