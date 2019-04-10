import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './user/list/list.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from 'app/common/models/role';

const appRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ListComponent,
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: 'user/list',
                        component: ListComponent,
                        data: { roles: [Role.VIEW_USERS] }
                    },
                    {
                        path: 'user/create',
                        component: ListComponent,
                        data: { roles: [Role.CREATE_USER] }
                    },
                    {
                        path: 'user/:id',
                        component: ListComponent,
                        data: { roles: [Role.EDIT_USER] }
                    }
                ]
            }
        ]
    }
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
export class AppRoutingModule { }