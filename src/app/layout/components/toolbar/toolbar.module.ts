import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatDialogModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { DialogChangePassword } from '../../../main/dialogs/change-password/dialog-change-password';
import { DialogChangePhoneNumberComponent } from '../../../main/dialogs/change-phone-number/dialog-change-phone-number';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ToolbarComponent,
        DialogChangePassword,
        DialogChangePhoneNumberComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule
    ],
    exports     : [
        ToolbarComponent
    ],
    entryComponents: [
        DialogChangePassword,
        DialogChangePhoneNumberComponent
    ]
})
export class ToolbarModule
{
}
