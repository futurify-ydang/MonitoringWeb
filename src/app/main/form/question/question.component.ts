import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ELEMENT_DATA_QUESTION_TYPE, FormElement, ElementOption, LANGUAGE_CODE, FormElementTranslate, OptionTranslate } from '../models/form-element.model';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators, FormGroupDirective } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ErrorStateMatcher } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as vietnamese } from '../i18n/vi';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  questionTypes = ELEMENT_DATA_QUESTION_TYPE;
  languageCodes = LANGUAGE_CODE;
  @ViewChild('questionForm') questionForm: NgForm;
  @Input() model: FormElement;
  @Input() index: number;
  @Input() maxIndex: number;

  @Output('update') changeModel: EventEmitter<FormElement> = new EventEmitter<FormElement>();
  @Output('validate') validate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addNew: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() moveUp: EventEmitter<number> = new EventEmitter<number>();
  @Output() moveDown: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _formBuilder: FormBuilder,
    private _translationLoader: FuseTranslationLoaderService,

  ) { 
    this._translationLoader.loadTranslations(english, vietnamese);

  }

  ngOnInit() {
  }

  /* events */
  eventChangeQuestionType() {
    this.model.ListOption = [];
    if (this.model.ElementType > 1) {
      this.model.ListOption.push(new ElementOption());
    }
    this.eventUpdateModel();
  }

  /* add option */
  eventClickAddOption(idxOption) {
    let array = this.model.ListOption;
    array.splice(idxOption + 1, 0, new ElementOption());
    this.eventUpdateModel();
  }

  eventClickDeleteOption(idxOption) {
    let array = this.model.ListOption;
    array.splice(idxOption, 1);
    if (array.length == 0) {
      array.push(new ElementOption());
    }
    console.log(array);
    this.eventUpdateModel();
  }

  /* multi language of element */
  eventClickAddLangElement(idx: number) {
    if (this.model.ListTranslate.length < this.languageCodes.length) {
      this.model.ListTranslate.splice(idx + 1, 0, new FormElementTranslate());
    }
  }

  eventClickDelLangElement(idx: number) {
    if (this.model.ListTranslate.length > 1) {
      this.model.ListTranslate.splice(idx, 1);
    }
  }

  /* multi language of option */
  eventClickAddLangOption(iOpt: number, iTrans: number) {
    if (this.model.ListOption[iOpt].ListTranslate.length < this.languageCodes.length) {
      this.model.ListOption[iOpt].ListTranslate.splice(iTrans + 1, 0, new OptionTranslate());
    }
  }

  eventClickDelLangOption(iOpt: number, iTrans: number) {
    if (this.model.ListOption[iOpt].ListTranslate.length > 1) {
      this.model.ListOption[iOpt].ListTranslate.splice(iTrans, 1);
    }
  }

  eventClickAddNewQuestion() {
    this.validAllForm();
    this.addNew.emit(this.index + 1);
  }

  eventClickDelete() {
    this.delete.emit(this.index);
  }

  eventClickMoveUp() {
    this.moveUp.emit(this.index);
  }

  eventClickMoveDown() {
    this.moveDown.emit(this.index);
  }

  // used to two-way binding to model
  eventUpdateModel() {
    this.changeModel.emit(this.model);
    this.eventValidate();
  }

  // used to emit valid or invalid for form
  eventValidate() {
    setTimeout(() => {
      this.validate.emit(this.questionForm.valid);
    }, 300);
  }

  getValidOfForm() {
    this.validAllForm();
    return this.questionForm.valid;
  }

  validAllForm() {
    Object.keys(this.questionForm.controls).forEach(key => {
      let item = this.questionForm.controls[key];
      if (!item.valid)
        this.questionForm.controls[key].markAsTouched();
    });
  }
}
