import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {
  MatButtonModule, MatChipsModule, MatIconModule, MatTabsModule, MatInputModule, MatTableModule, MatSnackBarModule,
  MatPaginatorModule, MatSortModule, MatDatepickerModule,
  MatAutocompleteModule, MatSelectModule, MatRadioModule, MatProgressSpinnerModule

} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from 'app/main/auth/guard/auth.guard';
import { Role } from 'app/common/models/role';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
  ],
  imports: [
    RouterModule,
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
    ListComponent
  ],
  entryComponents: [
  ]
})

export class UserModule {
}
