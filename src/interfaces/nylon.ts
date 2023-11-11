import { NylonType } from "../enums/NylonTypeEnum";


export interface INylon {
    id: string;
    name: string;
    color: string;
    price: number;
    quantity: number;
    height?: number;
    width?: number;
    type?: NylonType;
}