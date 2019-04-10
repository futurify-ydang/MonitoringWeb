import { FuseUtils } from '@fuse/utils';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { Question, EQuestionType } from './question.model';
import { Data } from '@angular/router';

export class Group {
    id: string;
    name: string;
    firstMeeting: Data;
    lastMeeting: Data;
    totalMeeting: number;
    leader: string;
    provinceId: string;
    provinceName: string;
    districtId: string;
    districtName: string;
    communeId: string;
    communeName: string;
    listQuestion: Question[];

    constructor(group?) {
        group = group || {};
        this.id = group.id || FuseUtils.generateGUID();
        this.name = group.name || '';
        this.firstMeeting = group.firstMeeting || new Date();
        this.lastMeeting = group.lastMeeting || new Date();
        this.totalMeeting = group.totalMeeting;
        this.leader = group.leader || '';
        this.provinceId = group.provinceId || '';
        this.districtId = group.districtId || '';
        this.communeId = group.communeId || '';
        this.provinceName = group.provinceName || '';
        this.districtName = group.districtName || '';
        this.communeName = group.communeName || '';
        this.listQuestion = group.listQuestion || [];
    }
}


export const GROUP_DATA: Group[] = [
    { id: '1', name: 'Group HCM', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Sam', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '2', name: 'Group Tra Vinh', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Jack', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '3', name: 'Group Tien Giang', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Bill', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '4', name: 'Group Hau Giang', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Jimy', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '5', name: 'Group An Giang', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Tom', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '6', name: 'Group Sa Pa', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Sam', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '7', name: 'Group Can Tho', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Jack', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '8', name: 'Group Kien Giang', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Bill', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '9', name: 'Group Vung Tau', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Jimy', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '10', name: 'Group Da Nang', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Jack', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '11', name: 'Group Da Lat', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Bill', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '12', name: 'Group Ha Noi', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Jimy', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] },
    { id: '13', name: 'Group Gia Lai', firstMeeting: new Date('2018-12-10'), lastMeeting: new Date('2018-12-20'), totalMeeting: 10, leader: 'Tom', provinceId: '1', districtId: '1', communeId: '3', provinceName: 'Q.1', districtName: 'A', communeName: 'A.3', listQuestion: [] }
];