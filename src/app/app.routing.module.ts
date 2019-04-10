import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/auth/login/login.component';
import { AuthGuard } from './main/auth/guard/auth.guard';
import { ListComponent } from './main/admin/user/list/list.component';

const appRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: './main/admin/admin.module#AdminModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'metting',
        loadChildren: './main/meeting/meeting.module#MeetingModule',
        canLoad: [AuthGuard]
    },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
    // { path: '**', component: LoginComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false, // <-- debugging purposes only
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }