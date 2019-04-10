import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './detail/form.component';

const appRoutes: Routes = [
    { path: 'form/edit', component: FormComponent},
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
export class FormRoutingModule { }