import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/detail/my-profile.component';

const appRoutes: Routes = [
    { path: 'my-profile/detail', component: MyProfileComponent},
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
export class MeRoutingModule { }