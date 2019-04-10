import { FuseUtils } from '@fuse/utils';

export class Trainer {
    id: number;
    name: string;

    constructor(trainer?) {
        trainer = trainer || {};
        this.id = trainer.id || FuseUtils.generateGUID();
        this.name = trainer.name || '';
    }
}


export const TRAINER_DATA: Trainer[] = [
    {id: 1, name: 'Adam'},
    {id: 2, name: 'Adele'},
    {id: 4, name: 'May'},
    {id: 5, name: 'Jane'},
    {id: 6, name: 'Cathy'},
  ];