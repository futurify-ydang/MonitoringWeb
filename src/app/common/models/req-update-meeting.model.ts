

export class ReqModelUpdateMeeting{
    Id: number;
    TrainerId: number;
    GroupId: number;
    FormId: number;
    Description: string;
    Duration: number;
    MeetingDate: string;
    Form: any;
    NumberOfParticipants: number;
    ImagePaths: string[];
    /**
     *
     */
    constructor(model?) {
        model = model || {};
        this.Id = model.Id || 0;
        this.TrainerId = model.TrainerId || 0;
        this.GroupId = model.GroupId || 0;
        this.FormId = model.FormId || 0;
        this.Description = model.Description || '';
        this.Duration = model.Duration || 0;
        this.MeetingDate = model.MeetingDate || new Date();
        this.ImagePaths = model.ImagePaths || [];
    }
}