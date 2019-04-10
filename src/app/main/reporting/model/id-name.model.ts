import { FuseUtils } from '@fuse/utils';

export class IdNameModel {
    id: any;
    name: any;

    constructor(model?) {
        model = model || {};
        this.id = model.id || FuseUtils.generateGUID();
        this.name = model.name || '';
    }
}
export const ELEMENT_DATA_PROVINCE: IdNameModel[] = [
    { id: 1, name: 'Province 1' },
    { id: 2, name: 'Province 2' },
]

export const ELEMENT_DATA_DISTRICT = [
    {
        title: 'Province 1',
        childs: [{ id: 1, name: 'District 1' }, { id: 2, name: 'District 2' },]
    },
    {
        title: 'Province 2',
        childs: [{ id: 3, name: 'District 1' }, { id: 4, name: 'District 2' },]
    }
]

export const ELEMENT_DATA_COMMUNE = [
    {
        title: 'Province 1 > District 1',
        childs: [{ id: 1, name: 'Commune 1' }, { id: 2, name: 'Commune 2' },]
    },
    {
        title: 'Province 1 > District 2',
        childs: [{ id: 3, name: 'Commune 1' }, { id: 4, name: 'Commune 2' },]
    },
    {
        title: 'Province 2 > District 1',
        childs: [{ id: 5, name: 'Commune 1' }, { id: 6, name: 'Commune 2' },]
    },
    {
        title: 'Province 2 > District 2',
        childs: [{ id: 7, name: 'Commune 1' }, { id: 8, name: 'Commune 2' },]
    },
]

export const ELEMENT_DATA_GROUP = [
    {
        title: 'Province 1 > District 1 > Commune 1',
        childs: [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' },]
    },
    {
        title: 'Province 1 > District 1 > Commune 2',
        childs: [{ id: 3, name: 'Group 1' }, { id: 4, name: 'Group 2' },]
    },

    {
        title: 'Province 1 > District 2 > Commune 1',
        childs: [{ id: 5, name: 'Group 1' }, { id: 6, name: 'Group 2' },]
    },
    {
        title: 'Province 1 > District 2 > Commune 2',
        childs: [{ id: 7, name: 'Group 1' }, { id: 8, name: 'Group 2' },]
    },
    
    {
        title: 'Province 2 > District 1 > Commune 1',
        childs: [{ id: 9, name: 'Group 1' }, { id: 10, name: 'Group 2' },]
    },
    {
        title: 'Province 2 > District 1 > Commune 2',
        childs: [{ id: 11, name: 'Group 1' }, { id: 12, name: 'Group 2' },]
    },

    {
        title: 'Province 2 > District 2 > Commune 1',
        childs: [{ id: 13, name: 'Group 1' }, { id: 14, name: 'Group 2' },]
    },
    {
        title: 'Province 2 > District 2 > Commune 2',
        childs: [{ id: 15, name: 'Group 1' }, { id: 16, name: 'Group 2' },]
    },
]