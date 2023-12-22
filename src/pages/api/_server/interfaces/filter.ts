import { NylonType } from '../enums/NylonTypeEnum';
import { TimeFrameType } from '../enums/TimeFrameEnum';

export interface ISaleFilter {
  nylons?: string[];
  timeFrame?: TimeFrameType;
  owed?: boolean;
  customer?: string;
}

export interface INylonFilter {
  type?: NylonType;
  name?: string;
  color?: string;
  quantity?: string;
}

export interface IPurchaseFilter {
  nylons?: string[];
  timeFrame?: TimeFrameType;
}

export interface IExpenseFilter {
  timeFrame?: TimeFrameType;
}
