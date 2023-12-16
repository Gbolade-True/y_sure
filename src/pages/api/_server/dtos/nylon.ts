import { NylonType } from '../enums/NylonTypeEnum';
import { INylon } from '../interfaces/nylon';

export type NylonDto = INylon;

export interface CreateNylonDto {
  name: string;
  price: number;
  quantity: number;
  type?: NylonType;
  manufacturer?: string;
}

export interface UpdateNylonDto extends CreateNylonDto {
  id?: string;
}
