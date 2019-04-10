import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';

export class Commune {
    Id: number;
    Name: string;
    DistrictId: number;

    constructor(commune?) {
        commune = commune || {};
        this.Id = commune.Id || FuseUtils.generateGUID();
        this.Name = commune.Name || '';
        this.DistrictId = commune.DistrictId || 0;
    }
}


