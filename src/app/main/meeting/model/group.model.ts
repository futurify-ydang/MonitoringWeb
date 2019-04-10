import { FuseUtils } from '@fuse/utils';

export class Group {
    id: number;
    name: string;

    constructor(group?) {
        group = group || {};
        this.id = group.id || FuseUtils.generateGUID();
        this.name = group.name || '';
    }
}


export const GROUP_DATA: Group[] = [
    {id: 1, name: 'Group HCM'},
    {id: 2, name: 'Group Tra Vinh'},
    {id: 4, name: 'Gropu Tien Giang'}
  ];