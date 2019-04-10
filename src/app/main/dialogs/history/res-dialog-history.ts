export class ResDialogHistory{
    Items: Log[];
    Total: number;
}

export class Log {
    Avatar?: string;
    UserName?: string;
    EventDateUTC: Date;
    EventType: number;
    LogDetails: LogDetail[];
}

export class LogDetail {
    Id: number;
    PropertyName: string;
    OriginalValue?: string;
    NewValue?: string;
    AuditLogId: number;
}
