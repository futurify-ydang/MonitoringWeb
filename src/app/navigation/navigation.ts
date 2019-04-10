import { FuseNavigation } from '@fuse/types';
import { of, Observable } from 'rxjs';
import { Role } from 'app/common/models/role';
import { LoginService } from 'app/common/login.service';

export const navigation = (loginService: LoginService): Observable<FuseNavigation[]> => {
    return of<FuseNavigation[]>([
        {
            id: 'applications',
            title: 'Applications',
            translate: 'NAV.APPLICATIONS',
            type: 'group',
            children: [
                {
                    id: 'Users',
                    title: 'Users',
                    translate: 'NAV.USER.TITLE',
                    type: 'collapsable',
                    hidden: !loginService.hasPermission([Role.VIEW_USERS, Role.CREATE_USER]),
                    icon: 'dashboard',
                    children: [
                        {
                            id: 'user-list',
                            title: 'List',
                            translate: 'NAV.USER.LIST',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_USERS]),
                            url: 'admin/user/list'
                        },
                        {
                            id: 'user-create',
                            title: 'Create new',
                            translate: 'NAV.USER.CREATE_NEW',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.CREATE_USER]),
                            url: 'admin/user/create'
                        },
                    ]
                },
                {
                    id: 'groups',
                    title: 'Groups',
                    translate: 'NAV.GROUP.TITLE',
                    type: 'item',
                    hidden: !loginService.hasPermission([Role.VIEW_GROUPS]),
                    icon: 'group',
                    url: '/admin/group/list'
                },
                {
                    id: 'locations',
                    title: 'Locations',
                    translate: 'NAV.LOCATION.TITLE',
                    type: 'collapsable',
                    hidden: !loginService.hasPermission([Role.VIEW_PROVINCES, Role.VIEW_DISTRICTS, Role.VIEW_COMMUNES]),
                    icon: 'location_on',
                    children: [
                        {
                            id: 'province',
                            title: 'Province',
                            translate: 'NAV.LOCATION.PROVINCE',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_PROVINCES]),
                            url: '/admin/location/province/list'
                        },
                        {
                            id: 'district',
                            title: 'District',
                            translate: 'NAV.LOCATION.DISTRICT',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_DISTRICTS]),
                            url: '/admin/location/district/list'
                        },
                        {
                            id: 'commune',
                            title: 'Commune',
                            translate: 'NAV.LOCATION.COMMUNE',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_COMMUNES]),
                            url: '/admin/location/commune/list'
                        }
                    ]
                },
                {
                    id: 'meetings',
                    title: 'Meetings',
                    translate: 'NAV.MEETING.TITLE',
                    type: 'collapsable',
                    hidden: !loginService.hasPermission([Role.VIEW_MEETINGS, Role.CREATE_MEETING]),
                    icon: 'dashboard',
                    children: [
                        {
                            id: 'meeting-list',
                            title: 'List',
                            translate: 'NAV.MEETING.LIST',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_MEETINGS]),
                            url: '/meeting/list'
                        },
                        {
                            id: 'meeting-create',
                            title: 'Create new',
                            translate: 'NAV.MEETING.CREATE_NEW',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.CREATE_MEETING]),
                            url: '/meeting/create'
                        }
                    ]
                },
                {
                    id: 'permission',
                    title: 'Permissions',
                    translate: 'NAV.PERMISSION.TITLE',
                    type: 'item',
                    icon: 'settings',
                    hidden: !loginService.hasPermission([Role.MANAGE_ROLES]),
                    url: '/admin/permission/list'
                },
                {
                    id: 'reporting',
                    title: 'Reports',
                    translate: 'NAV.REPORTING.TITLE',
                    type: 'collapsable',
                    hidden: !loginService.hasPermission([Role.VIEW_MEETING_REPORTS, Role.VIEW_TRAINER_REPORTS, Role.VIEW_DISTRICT_REPORTS]),
                    icon: 'insert_drive_file',
                    children: [
                        {
                            id: 'reporting',
                            title: 'Meeting report',
                            translate: 'NAV.REPORTING.MEETING_REPORT',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_MEETING_REPORTS]),
                            url: '/reporting/reporting'
                        },
                        {
                            id: 'reporting',
                            title: 'Trainer report',
                            translate: 'NAV.REPORTING.TRAINER_REPORT',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_TRAINER_REPORTS]),
                            url: '/reporting/trainer'
                        },
                        {
                            id: 'reporting',
                            title: 'District report',
                            translate: 'NAV.REPORTING.DISTRICT_REPORT',
                            type: 'item',
                            hidden: !loginService.hasPermission([Role.VIEW_DISTRICT_REPORTS]),
                            url: '/reporting/district'
                        }
                    ]
                },
                {
                    id: 'form',
                    title: 'Forms',
                    translate: 'NAV.FORM.TITLE',
                    type: 'item',
                    hidden: !loginService.hasPermission([Role.MANAGE_FORMS]),
                    icon: 'insert_drive_file',
                    url: '/form/edit'
                }
            ]
        }
    ]);
};
