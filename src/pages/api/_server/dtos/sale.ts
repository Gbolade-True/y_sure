import { INylon } from '../interfaces/nylon';
import { ISale } from '../interfaces/sale';

export type SaleDto = ISale;

export interface MakeSaleDto {
  nylons: INylon[];
  amountPaid: number;
  comment?: string;
  customerName?: string;
  dateToBeDelivered?: string;
}

export interface UpdateSaleDto extends MakeSaleDto {
  id: string;
}
