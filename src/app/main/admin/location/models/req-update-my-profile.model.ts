import { Province } from "../../../../common/models/province.model";
import { District } from "../../../../common/models/district.model";
import { Commune } from "../../../../common/models/commune.model";
import { Role } from "../../../../common/models/roles.model";

export class ReqModelUpdateProfile{
    Id: number;
    FirstName: string;
    FullName: string;
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
    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.Id || 0;
        this.FirstName = model.FirstName || '';
        this.FullName = model.FullName || '';
        this.LastName = model.LastName || '';
        this.MobileNumber = model.MobileNumber || '';
        this.Province = model.Province || new Array<Province>();
        this.District = model.District || new Array<District>();
        this.Commune = model.Commune || new Array<Commune>();
        this.Role = model.Role || new Array<Role>();
        this.Avatar = model.Avatar || '';
        this.ProvinceId = model.ProvinceId || 0;
        this.DistrictId = model.DistrictId || 0;
        this.CommuneId = model.CommuneId || 0;
        this.GroupId = model.GroupId || 0;
        this.RoleId = model.RoleId || 0;
        this.DateOfBirth = model.DateOfBirth || new Date();
    }
}