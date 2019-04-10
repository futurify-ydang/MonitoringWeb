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