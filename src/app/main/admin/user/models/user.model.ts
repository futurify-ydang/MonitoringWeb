import { FuseUtils } from '@fuse/utils';
import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';

export class ReqModelUpdateUser {
    Id: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    ProvinceId: number;
    DistrictId: number;
    CommuneId: number;
    GroupIds: number[];
    LeaderOfGroupId: number;
    MobileNumber: string;
    DateOfBirth: Date;
    RoleId: number;
    LocationLevelType: number;
    Status: number;
    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.Id || 0;
        this.FirstName = model.FirstName || "";
        this.MiddleName = model.MiddleName || "";
        this.LastName = model.LastName || "";
        this.ProvinceId = model.ProvinceId || null;
        this.DistrictId = model.DistrictId || null;
        this.CommuneId = model.CommuneId || null;
        this.GroupIds = model.GroupIds || [];
        this.MobileNumber = model.MobileNumber || "";
        this.DateOfBirth = model.DateOfBirth || null;
        this.RoleId = model.RoleId || null;
        this.LocationLevelType = model.LocationLevelType || 1;
        this.Status = model.Status || 1;

    }
}

export class Role {
    id: number;
    name: string;
}
// Fake data
export const ELEMENT_DATA_ROLE_LIST = [
    {
        id: 1,
        name: "Groupleader"
    },
    {
        id: 2,
        name: "Coordinator"
    },
    {
        id: 3,
        name: "Main Admin"
    },
]