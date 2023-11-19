import { INylon } from './nylon';

export interface ISale {
  id: string;
  nylons: INylon[];
  totalAmount: number;
  amountPaid: number;
  amountOwed: number;
  createdAt: string;
  comment?: string;
  customerName?: string;
  dateToBeDelivered?: string;
  updatedAt?: string;
}
