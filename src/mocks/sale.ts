import { ISale } from '@/pages/api/_server/interfaces/sale';
import { mockNylons } from './nylon';

export const mockSales: ISale[] = [
  {
    id: '1',
    totalAmount: 2000,
    amountOwed: 0,
    amountPaid: 2000,
    comment: 'No Comment',
    createdAt: new Date(1702731005926),
    nylons: mockNylons,
  },
  {
    id: '2',
    totalAmount: 2000,
    amountOwed: 2000,
    amountPaid: 4000,
    comment: 'Comment plenty',
    createdAt: new Date(1702731005926),
    nylons: mockNylons,
  },
];
