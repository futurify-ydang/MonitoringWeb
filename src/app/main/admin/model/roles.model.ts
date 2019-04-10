import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

import { GroupPermission } from './group.permission.model';

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
