import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

export class Province {
    id: string;
    name: string;
    createAt: Data;

    constructor(province?) {
        province = province || {};
        this.id = province.id || FuseUtils.generateGUID();
        this.name = province.name || '';
        this.createAt = province.createAt || new Date();
    }
}


export const PROVINCE_DATA: Province[] = [
    { id: '1', name: 'Q.1', createAt: new Date('2018-12-11') },
    { id: '2', name: 'Q.2', createAt: new Date('2018-12-12') },
    { id: '3', name: 'Q.3', createAt: new Date('2018-12-13') },
    { id: '4', name: 'Q.4', createAt: new Date('2018-12-11') },
    { id: '5', name: 'Q.5', createAt: new Date('2018-12-12') },
    { id: '6', name: 'Q.6', createAt: new Date('2018-12-13') },
    { id: '7', name: 'Q.7', createAt: new Date('2018-12-11') },
    { id: '8', name: 'Q.8', createAt: new Date('2018-12-12') },
    { id: '9', name: 'Q.9', createAt: new Date('2018-12-13') },
    { id: '10', name: 'Q.10', createAt: new Date('2018-12-11') },
    { id: '11', name: 'Q.11', createAt: new Date('2018-12-12') },
    { id: '12', name: 'Q.12', createAt: new Date('2018-12-13') },
];