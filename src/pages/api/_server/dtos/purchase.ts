import { INylon } from '../interfaces/nylon';
import { IPurchase } from '../interfaces/purchase';

export type PurchaseDto = IPurchase;

export interface MakePurchaseDto {
  nylons: INylon[];
  totalCost: number;
  comment?: string;
}

export interface UpdatePurchaseDto extends MakePurchaseDto {
  id: string;
}
