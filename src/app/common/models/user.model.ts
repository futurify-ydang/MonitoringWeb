import { FuseUtils } from '@fuse/utils';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { Province } from 'app/common/models/province.model';
import { District } from 'app/common/models/district.model';
import { Commune } from 'app/common/models/commune.model';
import { Role } from 'app/common/models/roles.model';



export class User {
    Id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    MobileNumber: string;
    Province: Province;
    District: District;
    Commune: Commune;
    Role: Role;
    ProvinceId: number;
    DistrictId: number;
    CommuneId: number;
    GroupId: number;
    RoleId: number;
    Avatar: string;
    DateOfBirth: Date;
    FullName: string;
    Language: string;

    constructor(user?) {
        user = user || {};
        this.Id = user.Id || 0;
        this.FirstName = user.FirstName || '';
        this.MiddleName = user.MiddleName || '';
        this.LastName = user.LastName || '';
        this.FullName = user.FullName || '';
        this.MobileNumber = user.MobileNumber || '';
        this.Province = user.Province || new Array<Province>(); 
        this.District = user.District || new Array<District>();
        this.Commune = user.Commune || new Array<Commune>();
        this.Role = user.Role || new Array<Role>();
        this.Avatar = user.Avatar || '';
        this.ProvinceId = user.ProvinceId || 0;
        this.DistrictId = user.DistrictId || 0;
        this.CommuneId = user.CommuneId || 0;
        this.GroupId = user.GroupId || 0;
        this.RoleId = user.RoleId || 0;
        this.DateOfBirth = user.DateOfBirth || new Date();
    }
}

