import { FuseUtils } from '@fuse/utils';
export const ELEMENT_TYPE = {
    'SHORT_ANSWER': 1,
    'MULTIPLE_CHOISE_ANSWER': 2,
    'MULTIPLE_CHOISE': 3,
}
export enum EQuestionType { 
    Text = 1, 
    Number, 
    YesNo,
    HasMultiAnswer,
    HasMultiQuestionAnswer,
}

export class Question {
    id: number;
    question: string;
    answer: string;
    type: EQuestionType;
    listChild: Question[];

    constructor(Question?) {
        Question = Question || {};
        this.id = Question.id || FuseUtils.generateGUID();
        this.question = Question.question || '';
        this.answer = Question.answer || '';
        this.type = Question.type || EQuestionType.Text;
        this.listChild = Question.listChild || []
    }
}

export const QUESTION_DATA: Question[] = [
    {id: 1, question : 'Number of people attending:', answer: '', type: EQuestionType.Number, listChild: []},
    {id: 1, question : 'How many new?', answer: '', type: EQuestionType.Number, listChild: []},
    {id: 1, question : 'Do you think next year will be better than this year?', answer: '', type: EQuestionType.YesNo, listChild: []},
    {id: 1, question : 'What is the main challenge in group members households?', answer: '', type: EQuestionType.HasMultiQuestionAnswer, listChild: [
        {id: 1, question : 'Lack of income?', answer: '', type: EQuestionType.Number, listChild: []},
        {id: 1, question : 'Unstable weather?', answer: '', type: EQuestionType.Number, listChild: []},
        {id: 1, question : 'Family issues?', answer: '', type: EQuestionType.Number, listChild: []}
    ]},
];