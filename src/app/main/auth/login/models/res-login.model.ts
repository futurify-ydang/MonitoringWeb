export class ResLogin {
    AccessToken: string;
    ExpiredAt: string;

    Account: ResLoginAccount;
}

export class ResLoginAccount {
    Id: number;
    UserName: string;
    FullName: string;
    RoleId: number;
    Permissions: string[];
    Language: string;
}
