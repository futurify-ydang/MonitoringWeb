export class ReqModelLogin{
    username: string;
    password: string;

    constructor(model?: any) {
        model = model || {};
        this.username = model.username;
        this.password = model.password;        
    }
}
