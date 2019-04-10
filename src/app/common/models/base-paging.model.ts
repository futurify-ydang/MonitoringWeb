export class BasePagingModel{
    keywords: string;
    page: number;
    length: number;
    sortFieldName: string;
    sortDirection: string;
    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.keywords = model.keywords || '';
        this.page = model.page || 0;
        this.length = model.length || 10;
        this.sortFieldName = model.sortFieldName || '';
        this.sortDirection = model.sortDirection || '';
    }
}