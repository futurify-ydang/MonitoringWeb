import { FuseUtils } from '@fuse/utils';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';


export class Profile {
    Id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    MobileNumber: string;
    Province: string;
    District: string;
    Commune: string;
    ProvinceId: number;
    DistrictId: number;
    CommuneId: number;
    GroupId: number;
    RoleId: number;
    Avatar: string;
    DateOfBirth: Date;

    constructor(profile?) {
        profile = profile || {};
        this.Id = profile.Id || 0;
        this.FirstName = profile.FirstName || '';
        this.LastName = profile.LastName || '';
        this.MobileNumber = profile.MobileNumber || '';
        this.Province = profile.Province || ''; 
        this.District = profile.District || '';
        this.Commune = profile.Commune || '';
        this.Avatar = profile.Avatar || '';
        this.ProvinceId = profile.ProvinceId || 0;
        this.DistrictId = profile.DistrictId || 0;
        this.CommuneId = profile.CommuneId || 0;
        this.GroupId = profile.GroupId || 0;
        this.RoleId = profile.RoleId || 0;
        this.DateOfBirth = profile.DateOfBirth || new Date();
    }
}

