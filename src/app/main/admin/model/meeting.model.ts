import { FuseUtils } from '@fuse/utils';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { Question, EQuestionType } from './question.model';
export class Meeting {
    id: string;
    trainerId: number;
    groupName: string;
    trainerName: string;
    meetingDate: Date;
    duration: number;
    startTime: Date;
    endTime: Date;
    location: string;
    name: string;
    description: string;
    active: boolean;
    listQuestion: Question[];
    
    constructor(meeting?) {
        meeting = meeting || {};
        this.id = meeting.id || FuseUtils.generateGUID();
        this.name = meeting.name || '';
        this.description = meeting.description || '';
        this.active = meeting.active || true;
        this.trainerId = meeting.trainerId || '';
        this.groupName = meeting.groupName || '';
        this.trainerName = meeting.trainerName || '';
        this.meetingDate = meeting.meetingDate || new Date();
        this.duration = meeting.duration || 0 ;
        this.startTime = meeting.startTime || new Date();
        this.endTime = meeting.endTime || new Date();
        this.location = meeting.location || '';
        this.listQuestion = meeting.listQuestion || [];
    }
}

export const ELEMENT_DATA: Meeting[] = [
    { id: '1', name: 'Meeting 1', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group HCM', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: []},
    { id: '2', name: 'Meeting 2', active: true, description: "", trainerId: 1, trainerName: 'Adele', groupName: 'Group Tra Vinh', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: []},
    { id: '3', name: 'Meeting 3', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group HCM', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '4', name: 'Meeting 4', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group Tien Giang', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '5', name: 'Meeting 5', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group Tra Vinh', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '6', name: 'Meeting 6', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group HCM', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '7', name: 'Meeting 7', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group HCM', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '8', name: 'Meeting 8', active: true, description: "", trainerId: 1, trainerName: 'Adele', groupName: 'Group Tien Giang', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '9', name: 'Meeting 9', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group HCM', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '10', name: 'Meeting 10', active: true, description: "", trainerId: 1, trainerName: 'Adele', groupName: 'Group Tra Vinh', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '11', name: 'Meeting 11', active: true, description: "", trainerId: 1, trainerName: 'Adam', groupName: 'Group HCM', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '12', name: 'Meeting 12', active: true, description: "", trainerId: 1, trainerName: 'Cathy', groupName: 'Group Tien Giang', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
    { id: '13', name: 'Meeting 13', active: true, description: "", trainerId: 1, trainerName: 'May', groupName: 'Group Tra Vinh', meetingDate: new Date('2018-12-10'), duration: 120, startTime: new Date('2018-12-10'), endTime: new Date('2018-12-11'), location: 'Ho Chi Minh', listQuestion: [] },
];