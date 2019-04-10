import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';


export class Role {
    id: number;
    name: string;
    permission: string[];

    constructor(role?) {
        role = role || {};
        this.id = role.id || FuseUtils.generateGUID();
        this.name = role.name || '';
        this.permission = role.groupPermission || new Array<string>();
    }
}


export const ROLE_DATA: Role[] = [
    { id: 1, name: 'Administrator', permission: ['USER_VIEW', 'USER_CREATE', 'USER_EDIT', 'USER_REMOVE'] },
    { id: 2, name: 'Employees', permission: ['GROUP_VIEW', 'GROUP_CREATE', 'GROUP_EDIT', 'GROUP_REMOVE'] },
    { id: 3, name: 'Customer', permission: ['PROVINCE_VIEW', 'PROVINCE_CREATE', 'PROVINCE_EDIT', 'PROVINCE_REMOVE'] }
];