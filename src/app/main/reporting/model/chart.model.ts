import { FuseUtils } from '@fuse/utils';

export class Chart {
    scopeName: string;
    columnAnserCharts: ColumnAnserChart[];
    constructor() {
    }
}

export class ColumnAnserChart {
    answer: string;
    columnCharts: ColumnChart[];
    constructor() {
    }
}

export class ColumnChart {
    timeName: number;
    value: number;
    textValue: string;
    constructor() {
    }
}