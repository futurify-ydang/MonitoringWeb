import { FuseUtils } from '@fuse/utils';
import { Question } from 'app/main/meeting/model/question.model'
export class TrainerCriterial {
    province: number;
    district: number;
    commune: number;
    group: number;
    years: [];



    constructor(trainerCriterial?) {
        trainerCriterial = trainerCriterial || {};
        this.province = trainerCriterial.province || 0;
        this.district = trainerCriterial.district || 0;
        this.commune = trainerCriterial.commune || 0;
        this.group = trainerCriterial.group || 0;
        this.years = trainerCriterial.years || [];
    }
}