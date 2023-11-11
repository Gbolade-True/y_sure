import { NylonType } from "../enums/NylonTypeEnum";


export type TimeFrameType = 'day' | 'week' | 'month' | 'year';

export interface ISalesFilter {
    nylons?: string[];
    timeFrame?: TimeFrameType;
    owed?: boolean;
    customer?: string;
}

export interface INylonFilter {
    type?: NylonType;
    name?: string;
    color?: string;
    quantity?: number;
}

export interface IPurchaseFilter {
    nylons?: string[];
    timeFrame?: TimeFrameType;
}

export interface IExpenseFilter {
    timeFrame?: TimeFrameType;
}

