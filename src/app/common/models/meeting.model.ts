import { Question } from '../../main/meeting/Model/question.model';
import { Group } from 'app/common/models/group.model';
import { User } from './user.model';

export class Meeting {
    Id: number;
    TrainerId: number;
    Group: Group;
    GroupId: number;
    Trainer: User;
    MeetingDate: Date;
    Duration: number;
    StartTime: Date;
    EndTime: Date;
    Location: string;
    LocationId: number;
    Name: string;
    Description: string;
    NumberOfParticipants: number;
    Active: boolean;
    ListQuestion: Question[];
    MeetingImages: any[];
    FormId: number;
    CreatedAt: Date;
    constructor(meeting?) {
        meeting = meeting || {};
        this.Id = meeting.Id;
        this.Name = meeting.Name || '';
        this.Description = meeting.Description || '';
        this.NumberOfParticipants = meeting.NumberOfParticipants || 0;
        this.Active = meeting.Active || true;
        this.TrainerId = meeting.TrainerId || '';
        this.Group = meeting.Group || new Array<Group>();
        this.GroupId = meeting.GroupId || 0;
        this.Trainer = meeting.Trainer || new Array<User>();
        this.MeetingDate = meeting.MeetingDate || new Date();
        this.Duration = meeting.Duration || 0 ;
        this.StartTime = meeting.StartTime || new Date();
        this.EndTime = meeting.EndTime || new Date();
        this.Location = meeting.Location || '';
        this.LocationId = meeting.LocationId || 0;
        this.ListQuestion = meeting.ListQuestion || [];
        this.MeetingImages = meeting.MeetingImages || [];
    }
}

