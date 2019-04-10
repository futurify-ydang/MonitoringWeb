import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';


export class Role {
    Id: number;
    Name: string;

    constructor(role?) {
        role = role || {};
        this.Id = role.Id || FuseUtils.generateGUID();
        this.Name = role.Name || '';
    }
}
