import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
    MatPaginatorModule, MatSortModule, MatDatepickerModule, MatRadioModule, MatSelectModule,
    MatAutocompleteModule, MatCheckboxModule, MatGridListModule, MatListModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ReportingComponent } from './reporting/reporting.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ChartComponent } from './chart/chart.component';
import { TrainerReportComponent } from './trainer-report/trainer-report.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { DistrictReportComponent } from './district-report/district-report.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { ChartMeetingComponent } from './chart-meeting/chart-meeting.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReportRoutingModule } from './report.routing';

const routes = [
    {
        path: 'reporting/reporting',
        component: ReportingComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_MEETING_REPORTS]}
    },
    {
        path: 'reporting/view',
        component: ViewReportComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_MEETING_REPORTS]}
    },
    {
        path: 'reporting/trainer',
        component: TrainerReportComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_TRAINER_REPORTS]}
    },
    {
        path: 'reporting/district',
        component: DistrictReportComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.VIEW_DISTRICT_REPORTS]}
    },
];

@NgModule({
    declarations: [
        ReportingComponent,
        ChipsAutocompleteComponent,
        ViewReportComponent,
        ChartComponent,
        TrainerReportComponent,
        GroupedBarChartComponent,
        DistrictReportComponent,
        ChartMeetingComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        BrowserAnimationsModule,
        FuseSharedModule,
        BrowserModule,
        NgxChartsModule,
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
        MatRadioModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatGridListModule,
        MatListModule,
        TranslateModule,

        ReportRoutingModule
    ],
    exports: [
        ReportingComponent,
    ]
})

export class ReportingModule {
}
