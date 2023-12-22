import { NylonTypeEnum } from '../pages/api/_server/enums/NylonTypeEnum';
import { INylon } from '../pages/api/_server/interfaces/nylon';

export const mockNylons: INylon[] = [
  {
    id: '9bcb99d2-6b5f-4b85-b1e0-1d5a9440b2a0',
    name: 'SS1-black',
    quantity: 500,
    price: 1500,
    type: NylonTypeEnum.STANDARD,
    manufacturer: 'M1',
  },
  {
    id: '30ddcc3b-1cd2-4050-99d7-541dcae38c67',
    name: 'SS2-white',
    quantity: 400,
    price: 200,
    type: NylonTypeEnum.STANDARD,
    manufacturer: '_',
  },
  {
    id: '30ddcc3b-1cd2-4050-99d7-541dcae38c68',
    name: 'SS3-grey',
    quantity: 400,
    price: 200,
    type: NylonTypeEnum.STANDARD,
    manufacturer: '_',
  },
  {
    id: '30ddcc3b-1cd2-4050-99d7-541dcae38c69',
    name: 'Ghana_Must_Go',
    quantity: 400,
    price: 200,
    type: NylonTypeEnum.GHANA_MUST_GO,
    manufacturer: '_',
  },
  {
    id: '30ddcc3b-1cd2-4050-99d7-541dcae38c61',
    name: 'Ziplock_1',
    quantity: 400,
    price: 200,
    type: NylonTypeEnum.ZIPLOCK,
    manufacturer: '_',
  },
];
