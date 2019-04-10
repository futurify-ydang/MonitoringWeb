import { FuseUtils } from '@fuse/utils';

export class Group {
    Id: number;
    Name: string;
    ProvinceName: string;
    DistrictName: string;
    CommuneName: string;

    constructor(group?) {
        group = group || {};
        this.Id = group.Id || FuseUtils.generateGUID();
        this.Name = group.Name || '';
        this.ProvinceName = group.ProvinceName || '';
        this.DistrictName = group.DistrictName || '';
        this.CommuneName = group.CommuneName || '';
    }
}
