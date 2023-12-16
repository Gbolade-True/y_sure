import { INylon } from './nylon';

export interface IPurchase {
  id: string;
  nylons: INylon[];
  totalCost: number;
  comment?: string;
  createdAt?: Date;
}
