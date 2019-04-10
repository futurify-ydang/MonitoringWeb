import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { District } from 'app/common/models/district.model';

export class Province {
    Id: number;
    Name: string;
    District: District[];

    constructor(province?) {
        province = province || {};
        this.Id = province.Id || FuseUtils.generateGUID();
        this.Name = province.Name || '';
        this.District = province.District || Array<District>();
    }
}


