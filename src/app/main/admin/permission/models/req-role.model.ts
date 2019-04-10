export class ReqRole{
    id: number;
    name: string;

    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.id = model.id || 0;
        this.name = model.name || '';
    }
}
