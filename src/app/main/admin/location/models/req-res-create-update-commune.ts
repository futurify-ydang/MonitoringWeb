export class ReqResModelCreateUpdateCommune{
    Id: number;
    Name: string;
    DistrictId: number;
    DistrictName: string;
    ProvinceId: number;
    ProvinceName: string;

    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.Id || 0;
        this.Name = model.Name || '';
        this.DistrictId = model.DistrictId || 0;
        this.DistrictName = model.DistrictName || '';
        this.ProvinceId = model.ProvinceId || 0;
        this.ProvinceName = model.ProvinceName || '';
    }
}