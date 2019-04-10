import { FuseUtils } from '@fuse/utils';

export class Question {
    id: number;
    question: string;
    answer: string;
    type: number;

    constructor(question?) {
        question = question || {};
        this.id = question.id || FuseUtils.generateGUID();
        this.question = question.question || '';
        this.answer = question.answer || '';
        this.type = question.type || 0;
    }
}
export const ELEMENT_DATA_QUESTION: Question[] = [
    {id: 1, question : 'How many people?', answer: '5', type: 1},
    {id: 2, question : 'Will next year be better? ', answer: '5', type: 1},
    {id: 3, question : 'I know what to do if there is saltwater into the freshwater? ', answer: '5', type: 1},
]