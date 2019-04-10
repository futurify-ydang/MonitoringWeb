import { NgModule } from '@angular/core';
import { RouterModule, CanActivate, Routes } from '@angular/router';
import { ReportingComponent } from './reporting/reporting.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { TrainerReportComponent } from './trainer-report/trainer-report.component';
import { DistrictReportComponent } from './district-report/district-report.component';

const appRoutes: Routes = [
    {
        path: 'reporting/reporting',
        component: ReportingComponent
    },
    {
        path: 'reporting/view',
        component: ViewReportComponent
    },
    {
        path: 'reporting/trainer',
        component: TrainerReportComponent
    },
    {
        path: 'reporting/district',
        component: DistrictReportComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class ReportRoutingModule { }