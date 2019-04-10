import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';

export class Commune {
    id: string;
    name: string;
    districtId: string;
    districtName: string;
    createAt: Data;

    constructor(commune?) {
        commune = commune || {};
        this.id = commune.id || FuseUtils.generateGUID();
        this.name = commune.name || '';
        this.districtId = commune.districtId || 0;
        this.districtName = commune.districtName || '';
        this.createAt = commune.createAt || new Date();
    }
}


export const COMMUNE_DATA: Commune[] = [
    { id: '1', name: 'A.1', districtId: '1', districtName: 'District A', createAt: new Date("2018-12-10") },
    { id: '2', name: 'A.2', districtId: '1', districtName: 'District A', createAt: new Date("2018-12-10") },
    { id: '3', name: 'A.3', districtId: '1', districtName: 'District A', createAt: new Date("2018-12-10") },
    { id: '4', name: 'A.4', districtId: '1', districtName: 'District A', createAt: new Date("2018-12-10") },
    { id: '5', name: 'A.5', districtId: '1', districtName: 'District A', createAt: new Date("2018-12-10") },
    { id: '6', name: 'B.1', districtId: '2', districtName: 'District B', createAt: new Date("2018-12-10") },
    { id: '7', name: 'B.2', districtId: '2', districtName: 'District B', createAt: new Date("2018-12-10") },
    { id: '8', name: 'B.3', districtId: '2', districtName: 'District B', createAt: new Date("2018-12-10") },
    { id: '9', name: 'B.4', districtId: '2', districtName: 'District B', createAt: new Date("2018-12-10") },
    { id: '10', name: 'B.5', districtId: '2', districtName: 'District B', createAt: new Date("2018-12-10") },
    { id: '11', name: 'C.1', districtId: '3', districtName: 'District C', createAt: new Date("2018-12-10") },
    { id: '12', name: 'C.2', districtId: '3', districtName: 'District C', createAt: new Date("2018-12-10") },
    { id: '13', name: 'C.3', districtId: '3', districtName: 'District C', createAt: new Date("2018-12-10") },
    { id: '14', name: 'C.4', districtId: '3', districtName: 'District C', createAt: new Date("2018-12-10") },
    { id: '15', name: 'C.5', districtId: '3', districtName: 'District C', createAt: new Date("2018-12-10") },
];