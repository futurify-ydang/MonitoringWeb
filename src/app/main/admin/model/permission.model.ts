import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

export class Permission {
    name: string;
    displayName: string;

    constructor(permission?) {
        permission = permission || {};
        this.name = permission.name || '';
        this.displayName = permission.displayName ||'';
    }
}


export const PERMISSION_DATA: Permission[] = [
    { name: 'USER_VIEW', displayName: 'View User' },
    { name: 'USER_CREATE', displayName: 'Create User' },
    { name: 'USER_EDIT', displayName: 'Edit User' },
    { name: 'USER_REMOVE', displayName: 'Remove User' },

    { name: 'GROUP_VIEW', displayName: 'View Group' },
    { name: 'GROUP_CREATE', displayName: 'Create Group' },
    { name: 'GROUP_EDIT', displayName: 'Edit Group' },
    { name: 'GROUP_REMOVE', displayName: 'Remove Group' },

    { name: 'PROVINCE_VIEW', displayName: 'View Province' },
    { name: 'PROVINCE_CREATE', displayName: 'Create Province' },
    { name: 'PROVINCE_EDIT', displayName: 'Edit Province' },
    { name: 'PROVINCE_REMOVE', displayName: 'Remove Province' },

    { name: 'DISTRICT_VIEW', displayName: 'View District' },
    { name: 'DISTRICT_CREATE', displayName: 'Create District' },
    { name: 'DISTRICT_EDIT', displayName: 'Edit District' },
    { name: 'DISTRICT_REMOVE', displayName: 'Remove District' },

    { name: 'COMMUNE_VIEW', displayName: 'View Commune' },
    { name: 'COMMUNE_CREATE', displayName: 'Create Commune' },
    { name: 'COMMUNE_EDIT', displayName: 'Edit Commune' },
    { name: 'COMMUNE_REMOVE', displayName: 'Remove Commune' },

    { name: 'MEETING_VIEW', displayName: 'View Meeting' },
    { name: 'MEETING_CREATE', displayName: 'Create Meeting' },
    { name: 'MEETING_EDIT', displayName: 'Edit Meeting' },
    { name: 'MEETING_REMOVE', displayName: 'Remove Meeting' },

    { name: 'TRAINER_REPORT_VIEW', displayName: 'View Meeting' },
    { name: 'TRAINER_REPORT_VIEW', displayName: 'View Trainer Report' },
    { name: 'PEOPLE_REPORT_VIEW', displayName: 'View People Report' },
];
