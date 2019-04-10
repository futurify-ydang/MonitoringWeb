export class ResRole{
    Id: number;
    Name: string;

    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.id || 0;
        this.Name = model.name || '';
    }
}
