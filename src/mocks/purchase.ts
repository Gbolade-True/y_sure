import { IPurchase } from '../pages/api/_server/interfaces/purchase';
import { mockNylons } from './nylon';

export const mockPurchases: IPurchase[] = [
  {
    id: '9bcb99d2-6b5f-4b85-b1e0-1d5a9440b2a4',
    totalCost: 2000,
    comment: 'No Comment',
    createdAt: new Date(1702731005926),
    nylons: mockNylons,
  },
];
