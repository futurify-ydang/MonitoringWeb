export class ReqResModelCreateUpdateDistrict{
    Id: number;
    Name: string;
    ProvinceId: number;
    ProvinceName: string;
    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.Id || 0;
        this.Name = model.Name || "";
        this.ProvinceId = model.ProvinceId || 0;
        this.ProvinceName = model.ProvinceName || "";
    }
}