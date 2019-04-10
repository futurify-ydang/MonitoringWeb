import { BasePagingModel } from "app/common/models/base-paging.model";

export class ReqModelGetListGroup extends BasePagingModel {
    provinceId: number;
    districtId: number;
    communeId: number;
    trainerId: number;
    
    /**
       *
       */
    constructor() {
        super();
    }
}