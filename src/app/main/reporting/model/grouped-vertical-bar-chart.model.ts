import { FuseUtils } from '@fuse/utils';

export class GroupedChart {
    name: string;
    series: SerriesGroupedChart[];
    constructor(model?) {
        model = model || {};
        this.name = model.Name || '';
        this.series = model.Series || [];
    }
}

export class SerriesGroupedChart {
    name: string;
    value: number;
    tooltipContents: any[];
}