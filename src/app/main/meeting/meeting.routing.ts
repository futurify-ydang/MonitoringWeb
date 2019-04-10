import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './list/meetings.component';
import { MeetingComponent } from './detail/meeting.component';
import { AuthGuard } from '../auth/guard/auth.guard';

const appRoutes: Routes = [

    {
        path: '', 
        component: MeetingsComponent,
        canActivate: [AuthGuard], 
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children:[
                    { path: 'list', component: MeetingsComponent},
                    { path: 'list/:groupName', component: MeetingsComponent },
                    { path: 'export', component: MeetingsComponent },
                    { path: 'create', component: MeetingComponent },
                    { path: ':id', component: MeetingComponent }
                ]
            }
        ]
    },
   
    
];

@NgModule({
    imports: [
        RouterModule.forChild(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class MeetingRoutingModule { }