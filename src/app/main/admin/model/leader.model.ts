import { FuseUtils } from '@fuse/utils';
import { Data } from '@angular/router';

export class Leader {
    id: number;
    name: string;

    constructor(leader?) {
        leader = leader || {};
        this.id = leader.id || FuseUtils.generateGUID();
        this.name = leader.name || '';
    }
}


export const LEADER_DATA: Leader[] = [
    {id: 1, name: 'Adam'},
    {id: 2, name: 'Adele'},
    {id: 4, name: 'May'},
    {id: 5, name: 'Jane'},
    {id: 6, name: 'Cathy'},
  ];