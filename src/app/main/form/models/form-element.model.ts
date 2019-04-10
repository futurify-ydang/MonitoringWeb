import { FuseUtils } from "@fuse/utils";


export enum E_ELEMENT_TYPE {
    ShortAnswer = 1,
    MultipleChoiceAnswer,
    MultipleChoice
}

export class FormElement {
    Id: number;
    ElementType: E_ELEMENT_TYPE;
    ListTranslate: FormElementTranslate[];
    ListOption: ElementOption[];
    constructor(element?) {
        element = element || {};
        this.Id = element.Id || 0;
        this.ElementType = element.elementType || 1;
        this.ListTranslate = element.ListTranslate || [{ LanguageCode: "EN", Description: "" }, { LanguageCode: "VI", Description: "" }];
        this.ListOption = element.listOption || [];
    }
}

export class FormElementTranslate {
    Id: number;
    LanguageCode: string;
    Description: string;
}

export class ElementOption {
    Id: number;
    ListTranslate: OptionTranslate[];
    Unique: string;
    constructor(elementOption?) {
        elementOption = elementOption || {};
        this.Id = elementOption.Id || 0;
        this.ListTranslate = elementOption.ListTranslate || [{ LanguageCode: "EN", Caption: "" }, { LanguageCode: "VI", Description: "" }];
        this.Unique = elementOption.Unique || FuseUtils.generateGUID();
    }
}

export class OptionTranslate {
    LanguageCode: string;
    Caption: string;
}

export class ElementType {
    Id: number;
    name: string;
}

export class LanguageCode{
    Id: number;
    Code: string;
}

export const ELEMENT_DATA_QUESTION_TYPE: ElementType[] = [
    { Id: 1, name: 'Short Answer' },
    { Id: 2, name: 'Multiple Choice Answer' },
    { Id: 3, name: 'Multiple Choice' },
]

export const LANGUAGE_CODE: LanguageCode[] = [
    {Id: 1, Code: "EN"},
    {Id: 2, Code: "VI"}
]

export const ELEMENT_DATA_QUESTION: any = {
    model: [
        {
            Id: "0",
            ElementType: E_ELEMENT_TYPE.ShortAnswer,
            ListTranslate: [
                {
                    Description: "",
                    LanguageCode: "EN"
                },
                {
                    Description: "",
                    LanguageCode: "VI"
                }
            ],
        }
    ]
};