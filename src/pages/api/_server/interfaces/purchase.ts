import { INylon } from './nylon';

export interface IPurchase {
  id: string;
  nylons: INylon[];
  totalAmount: number;
  comment?: string;
  createdAt?: string;
}
