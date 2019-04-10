export class CurrentUserModel {
    Id: number;
    Username: string;
    FullName: string;
    RoleId: number;
    LocationLevel: number;
    ProvinceId: number;
    DistrictId: number;
    CommuneId: number;
    GroupIds: number[];
    Permissions: string[];
    Language: string;
}