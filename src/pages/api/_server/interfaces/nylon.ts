import { NylonType } from '../enums/NylonTypeEnum';

export interface INylon {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type?: NylonType;
  manufacturer?: string;
  createdAt?: string;
  updatedAt?: string;
}
