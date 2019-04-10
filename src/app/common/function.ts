import { MatSnackBar, MatPaginator } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

export class CommonFunction {
    static markAsTouchedAllForm(form) {
        Object.keys(form.controls).forEach(key => {
            let item = form.controls[key];
            if (!item.valid)
            form.controls[key].markAsTouched();
        });
    }
    static showMatSnackBar(matSnackBar: MatSnackBar, message, action){
        matSnackBar.open(message, action, {
            verticalPosition: 'top',
            duration: 2000
        });
    }
    static getItemsPerPageLabelTranslateOfMatTable(translateService: TranslateService, paginator: MatPaginator): string{
        let currentLang = translateService.currentLang;
        let label = ''
        if(currentLang == 'en'){
            label = 'Items per page:';
        }
        else {
            label = 'Số mục mỗi trang:';
        }
        return label
    }
}