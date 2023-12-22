import { ISale } from '../pages/api/_server/interfaces/sale';
import { mockNylons } from './nylon';

export const mockSales: ISale[] = [
  {
    id: '9bcb99d2-6b5f-4b85-b1e0-1d5a9440b2a0',
    totalAmount: 2000,
    amountOwed: 0,
    amountPaid: 2000,
    comment: 'No Comment',
    createdAt: new Date(1702731005926),
    nylons: mockNylons,
  },
  {
    id: '9bcb99d2-6b5f-4b85-b1e0-1d5a9440b2a1',
    totalAmount: 2000,
    amountOwed: 2000,
    amountPaid: 4000,
    comment: 'Comment plenty',
    createdAt: new Date(1702731005926),
    nylons: mockNylons,
  },
];
