
import { Permission } from './permission.model';

export class GroupPermission {

    name: string;
    permission: Permission[];

    constructor(groupPermission?) {
        groupPermission = groupPermission || {};
        this.name = groupPermission.name || '';
        this.permission = groupPermission.permission || new Array<Permission>();
    }
}

export const GROUP_PERMISSION_DATA: GroupPermission[] = [
    { 
        name: 'User', 
        permission: [
            { name: 'VIEW_USERS', displayName: 'View users' }, 
            { name: 'CREATE_USER', displayName: 'Create user' },
            { name: 'EDIT_USER', displayName: 'Edit user' }, 
            { name: 'DELETE_USER', displayName: 'Remove user' }
        ] 
    },
    { 
        name: 'Group', 
        permission: [
            { name: 'VIEW_GROUPS', displayName: 'View groups' },
            { name: 'CREATE_GROUP', displayName: 'Create group' }, 
            { name: 'EDIT_GROUP', displayName: 'Edit group' }, 
            { name: 'DELETE_GROUP', displayName: 'Remove group' }
        ] 
    },
    { 
        name: 'Province', 
        permission: [
            { name: 'VIEW_PROVINCES', displayName: 'View provinces' },
            { name: 'CREATE_PROVINCE', displayName: 'Create province' }, 
            { name: 'EDIT_PROVINCE', displayName: 'Edit province' }, 
            { name: 'DELETE_PROVINCE', displayName: 'Remove province' }
        ] 
    },
    { 
        name: 'District', 
        permission: [
            { name: 'VIEW_DISTRICTS', displayName: 'View districts' }, 
            { name: 'CREATE_DISTRICT', displayName: 'Create district' }, 
            { name: 'EDIT_DISTRICT', displayName: 'Edit district' }, 
            { name: 'DELETE_DISTRICT', displayName: 'Remove district' }
        ]
    },
    { 
        name: 'Commune', 
        permission: [
            { name: 'VIEW_COMMUNES', displayName: 'View communes' }, 
            { name: 'CREATE_COMMUNE', displayName: 'Create commune' }, 
            { name: 'EDIT_COMMUNE', displayName: 'Edit commune' }, 
            { name: 'DELETE_COMMUNE', displayName: 'Remove commune' }
        ] 
    },
    { 
        name: 'Meeting', 
        permission: [
            { name: 'VIEW_MEETINGS', displayName: 'View meetings' }, 
            { name: 'CREATE_MEETING', displayName: 'Create meeting' }, 
            { name: 'EDIT_MEETING', displayName: 'Edit meeting' }, 
            { name: 'DELETE_MEETING', displayName: 'Remove meeting' }
        ] 
    },
    { 
        name: 'Report', 
        permission: [
            { name: 'VIEW_REPORTS', displayName: 'View meeting reports' },
            { name: 'VIEW_TRAINER_REPORT', displayName: 'View trainer report' }, 
            { name: 'VIEW_PEOPLE_REPORT', displayName: 'View people report' }
        ] 
    }
];
