import { FuseUtils } from '@fuse/utils';
import { Question } from './question.model';
import { Chart } from './chart.model';

export class Report {
    firstScopeTypeName: string;
    firstSelectedName: string;
    secondScopeTypeName: string;
    secondSelectedName: string;
    timeTypeName: string;
    selectedTimes: any[];
    question: Question;
    charts: Chart[];


    constructor(report?) {
        report = report || {};
        this.firstScopeTypeName = report.scopeTypeName || 1;
        this.firstSelectedName = report.firstSelectedName || 1;
        this.secondScopeTypeName = report.secondScopeTypeName || 1;
        this.secondSelectedName = report.secondSelected || 1;
        this.timeTypeName = report.timeTypeName || 1;
        this.selectedTimes = report.selectedTimes || [];
        this.question = report.question || {};
        this.charts = report.charts || [];
    }
}