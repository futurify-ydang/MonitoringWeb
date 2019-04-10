import { BasePagingModel } from "app/common/models/base-paging.model";

export class ReqModelGetListDistrict extends BasePagingModel{
    keywords: string;
    /**
     *
     */
    constructor() {
        super();
    }
}