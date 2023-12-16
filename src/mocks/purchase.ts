import { IPurchase } from '@/pages/api/_server/interfaces/purchase';
import { mockNylons } from './nylon';

export const mockPurchases: IPurchase[] = [
  {
    id: '1',
    totalCost: 2000,
    comment: 'No Comment',
    createdAt: new Date(1702731005926),
    nylons: mockNylons,
  },
];
