import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
  MatPaginatorModule, MatSortModule, MatDatepickerModule,
  MatAutocompleteModule, MatSelectModule, MatRadioModule, MatCardModule

} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './detail/form.component';
import { QuestionComponent } from './question/question.component';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule } from '@ngx-translate/core';
import { FormRoutingModule } from './form.routing';


const routes = [
  {
    path: 'form/edit',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.MANAGE_FORMS]}
  },
];

@NgModule({
  declarations: [
    FormComponent,
    QuestionComponent,
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
    MatCardModule,
    TranslateModule,
    
    FormRoutingModule
  ],
  exports: [
    FormComponent
  ],
  entryComponents: [
  ]
})

export class FormModule {
}
