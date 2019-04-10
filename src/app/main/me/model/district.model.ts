import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';

export class District {
    id: string;
    name: string;
    provinceId: string;
    provinceName: string;
    createAt: Data;

    constructor(district?) {
        district = district || {};
        this.id = district.id || FuseUtils.generateGUID();
        this.name = district.name || '';
        this.provinceId = district.provinceId || '';
        this.provinceName = district.provinceName || '';
        this.createAt = district.createAt || new Date();
    }
}


export const DISTRICT_DATA: District[] = [
    { id: '1', name: 'District A', provinceId: '1', provinceName:'Q.1', createAt: new Date('2018-12-22') },
    { id: '4', name: 'District D', provinceId: '1', provinceName:'Q.1', createAt: new Date('2018-12-23') },
    { id: '2', name: 'District B', provinceId: '2', provinceName:'Q.2' ,createAt: new Date('2018-12-24') },
    { id: '3', name: 'District C', provinceId: '3', provinceName:'Q.3' ,createAt: new Date('2018-12-25') },
    { id: '5', name: 'District E', provinceId: '3', provinceName:'Q.3' ,createAt: new Date('2018-12-26') },
    { id: '6', name: 'District F', provinceId: '3', provinceName: 'Q.3' ,createAt: new Date('2018-12-27') },
];