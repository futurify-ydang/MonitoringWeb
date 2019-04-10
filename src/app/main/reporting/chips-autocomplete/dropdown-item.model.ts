import { FuseUtils } from '@fuse/utils';
export class DropdownItem {
    value: any;
    text: any;
    isNew: boolean;


    constructor(dropdownItem?) {
        dropdownItem = dropdownItem || {};
        this.value = dropdownItem.value || '';
        this.text = dropdownItem.text || '';
        this.isNew = dropdownItem.isNew || false;
    }
}