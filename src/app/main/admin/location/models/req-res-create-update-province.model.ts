export class ReqResModelCreateUpdateProvince{
    Id: number;
    Name: string;
    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.Id || 0;
        this.Name = model.Name || "";
    }
}