import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
// other lib
import { fuseAnimations } from '@fuse/animations';
import { FormElement, ELEMENT_DATA_QUESTION } from '../models/form-element.model';
import { QuestionComponent } from '../question/question.component';
import { FormService } from '../form.service';
import { reqModelCreateForm } from '../models/request-model';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
import { CommonFunction } from 'app/common/function';
import { DialogRemoveComponent } from 'app/main/dialogs/remove/dialog-remove.component';
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: fuseAnimations
})

// FORM COMPONENT
export class FormComponent implements OnInit {
    questions: FormElement[] = ELEMENT_DATA_QUESTION.model.map(x => Object.assign({}, x))
    @ViewChildren(QuestionComponent) viewChildren: QueryList<any>;
    constructor(
        private _translationLoader: FuseTranslationLoaderService,
        private _matSnackBar: MatSnackBar,
        private _formService: FormService,
        private _dialog: MatDialog,
    ) {
        this._translationLoader.loadTranslations(english, vietnamese);
    }

    ngOnInit() {
        this._formService.getForm(0).subscribe(resp => {
            var listQuestion = resp.ListElement;
            if (listQuestion.length > 0) {
                this.questions = listQuestion;
            }
        });

    }

    // save new form 
    save() {
        let result = this.eventValidationAllAppQuestion();
        if (result) {

            // create request model 
            var request = new reqModelCreateForm;
            request.listElement = this.questions;
            console.log(request.listElement);
            // call service 
            this._formService.createForm(request).subscribe(res => {
                this._formService.getForm(0).subscribe(resp => {
                    var listQuestion = resp.ListElement;
                    if (listQuestion.length > 0) {
                        this.questions = listQuestion;
                    }
                    this._matSnackBar.open('Save success', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                });
            });
        }
        else {
            this._matSnackBar.open('Errors', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
    }

    /* Events */
    eventAddNewQuestion(index) {
        this.questions.splice(index, 0, new FormElement());
    }
    eventDeleteQuestion(index) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.data = {
            Result: false
        };

        const dialogRef = this._dialog.open(DialogRemoveComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((res) => {
            if (this.questions.length > 1 && res) {
                this.questions.splice(index, 1);
            }
        });
    }
    eventMoveDown(index) {
        let maxIndex = this.questions.length - 1;
        if (index != maxIndex) {
            this._swapItemsInQuestions(index, index + 1);
        }
    }
    eventMoveUp(index) {
        if (index > 0) {
            this._swapItemsInQuestions(index, index - 1);
        }
    }
    eventValidationAllAppQuestion(): boolean {
        let appQuestion = this.viewChildren.toArray();
        for (let i = 0; i < appQuestion.length; i++) {
            let valid = appQuestion[i].getValidOfForm();
            if (!valid) {
                return false;
            }
        }
        return true;
    }

    /* Private functions */
    private getIndexQuestion(questionId): number {
        return this.questions.findIndex(q => q.Id == questionId);
    }
    private _swapItemsInQuestions(indexFrom, indexTo): void {
        let questions = this.questions;
        let temp = questions[indexFrom];
        questions[indexFrom] = questions[indexTo];
        questions[indexTo] = temp;
    }
}
