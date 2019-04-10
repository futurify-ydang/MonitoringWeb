import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { Commune } from 'app/common/models/commune.model';


export class District {
    Id: number;
    Name: string;
    Commune: Commune[];
    ProvinceId: number;

    constructor(district?) {
        district = district || {};
        this.Id = district.Id || FuseUtils.generateGUID();
        this.Name = district.Name || '';
        this.Commune = district.Commune || new Array<Commune>();
        this.ProvinceId = district.ProvinceId || 0;
    }
}
