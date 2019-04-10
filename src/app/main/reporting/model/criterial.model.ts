import { FuseUtils } from '@fuse/utils';
import { Question } from 'app/main/meeting/model/question.model'
export class Criterial {
    firstScopeType: number;
    firstSelected: any;
    secondScopeType: number;
    secondSelected: any;
    timeType: any;
    selectedTimes: any[];
    questions: Question[];
    selectedQuestions: number[];



    constructor(criterial?) {
        criterial = criterial || {};
        this.firstScopeType = criterial.firstScopeType || 1;
        this.firstSelected = criterial.firstSelected || 1;
        this.secondScopeType = criterial.secondScopeType || 1;
        this.secondSelected = criterial.secondSelected || 1;
        this.timeType = criterial.timeType || 1;
        this.selectedTimes = criterial.selectedTimes || [];
        this.questions = criterial.questions || [];
        this.selectedQuestions = criterial.selectedQuestions || [];
    }
}