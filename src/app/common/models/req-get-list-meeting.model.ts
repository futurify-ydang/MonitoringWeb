import { BasePagingModel } from "app/common/models/base-paging.model";

export class ReqModelGetListMeeting extends BasePagingModel {
    provinceId: number;
    districtId: number;
    communeId: number;
    trainerId: number;
    /**
     *
     */
    fromDate: Date;
    toDate: Date;
    constructor(model?) {
        model = model || {};
        super(model);
        this.fromDate = model.fromDate || null;
        this.toDate = model.toDate || null;
    }
}