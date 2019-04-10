import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DropdownItem } from './dropdown-item.model'


/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete',
  templateUrl: 'chips-autocomplete.component.html',
  styleUrls: ['chips-autocomplete.component.scss'],
})
export class ChipsAutocompleteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  elemntCtrl = new FormControl();
  filteredList: Observable<any[]>;

  selectedDropdownItems: DropdownItem[] = [];
  /* */
  nameValueColumns: string[];
  nameTextColumns: string[];
  isBasicArray = true;
  valueList: any[] = [];
  dataListModel: any[] = [];
  @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  /* Input */
  @Input() dataList: any[];
  @Input() selectedValueList: any[];
  @Input() nameValueColumnStr: string;
  @Input() nameTextColumnStr: string;
  @Input() onlySelect: boolean = false;
  @Input() canSelect: boolean = true;
  @Input() placeholder: string;
  @Input() type: string;

  @Output() modalSave: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() {

  }

  ngOnInit() {
    if (this.nameValueColumnStr === null || this.nameTextColumnStr === null ||
      this.nameValueColumnStr === undefined || this.nameTextColumnStr === undefined
    ) {
      this.isBasicArray = true;
    } else {
      this.isBasicArray = false;
      if (this.nameTextColumnStr !== null && this.nameTextColumnStr !== undefined) {
        this.nameTextColumns = this.nameTextColumnStr.split('.');
      }
      if (this.nameValueColumnStr !== null && this.nameValueColumnStr !== undefined) {
        this.nameValueColumns = this.nameValueColumnStr.split('.');
      }
    }
    this.createdAllListModel();
    this.updateSelectedDropdownItems();
    this.filteredList = this.elemntCtrl.valueChanges.pipe(
      startWith(null),
      map((item: any | null) => item ? this._filter(item) : this.dataListModel.slice()));
  }
  /* Init list text/value based on listModel to show in dropdown
  If listModel is just a basic array( string[], int[] , ...) -> value = index, text = value
  If listModel is a complex object array( object[]) -> value and name will get by nameValueColumnStr, nameTextColumnStr
  */
  createdAllListModel() {
    this.dataList.forEach((item, index) => {
      let objResult: DropdownItem = new DropdownItem();
      if (this.isBasicArray === true) {
        objResult.text = item;
        objResult.value = item;
      }
      else {
        if (this.nameValueColumns.length > 0) {
          objResult.value = this.getValueOfListModel(item);
        }
        if (this.nameTextColumns.length > 0) {
          objResult.text = this.getTextOfListModel(item);
        }
      }
      this.dataListModel.push(objResult);
    });
  }
  updateSelectedDropdownItems() {
    if (this.selectedValueList !== undefined && this.selectedValueList !== null) {
      if (!this.onlySelect) {
        this.selectedValueList.forEach(item => {
          this.selectedDropdownItems.push({
            text: item,
            value: item,
            isNew: false,
          });
        });
      }
      else {
        this.dataListModel.forEach((item) => {
          let index = this.selectedValueList.findIndex(x => x === item.value)
          if (index > -1) {
            this.selectedDropdownItems.push({
              text: item.text,
              value: item.value,
              isNew: false,
            });
          }
        });
      }
    }
    else {
      this.selectedValueList = [];
    }
  }
  /* Get text of item based on nameTextColumns */
  getValueOfListModel(item) {
    var result = item;
    this.nameValueColumns.forEach(function (value) {
      result = result[value];
    });
    return result;
  }
  /* Get value of item based on nameValueColumns */
  getTextOfListModel(item) {
    var result = item;
    this.nameTextColumns.forEach(function (value) {
      result = result[value];
    });
    return result;
  }
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen && !this.onlySelect) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if (value) {
        this.addToValueList(value, value);
        this._updateOutput();
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.elemntCtrl.setValue(null);
    }
  }

  remove(value: any): void {
    const index = this.selectedDropdownItems.findIndex(x => x.value == value);

    if (index >= 0) {
      this.selectedDropdownItems.splice(index, 1);
    }
    this._updateOutput();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var text = event.option.viewValue;
    var value = event.option.value;
    this.addToValueList(value, text);

    this.valueInput.nativeElement.value = '';
    this.elemntCtrl.setValue(null);
    this._updateOutput();
  }
  addToValueList(value, text) {
    this.selectedDropdownItems.push({
      text: text,
      value: value,
      isNew: false
    });
  }
  private _filter(value: any): any[] {
    const filterValue = value.toString().toLowerCase();
    return this.dataListModel.filter(item => item.text.toString().toLowerCase().indexOf(filterValue) === 0);
  }
  private _updateOutput() {
    let output = [];
    if (this.type === "number") {
      this.selectedDropdownItems.forEach(item => output.push(+item.value));
    }
    else {
      this.selectedDropdownItems.forEach(item => output.push(item.value));
    }
    this.modalSave.emit(output);
  }
}