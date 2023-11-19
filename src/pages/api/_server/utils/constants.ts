// yarn typeorm migration:generate src/pages/api/_server/migrations -d src/pages/api/_server/data-source.ts
// yarn typeorm migration:run -d src/pages/api/_server/data-source.ts
// psql -U postgres
// 0467388e-8f46-463f-b7dd-8eeac9849b2a
// ts-node ./src/pages/api/_server/data-source.ts &&

import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';

export interface ClientResponse<D> {
  data: D;
  totalCount?: number;
  currentPage?: number;
}

export const confirmInitiaization = async (dataSource: DataSource) => {
  if (!dataSource) {
    await AppDataSource.initialize();
    return AppDataSource;
  }
  if (dataSource.isInitialized) return dataSource;
  // eslint-disable-next-line no-console
  console.log('<-----DB INITIALIZED----->');
  await dataSource.initialize();
  return dataSource;
};

export const convertAPIDataToClientResponse = <D>(
  data: D,
  totalCount?: number,
  currentPage?: number,
): ClientResponse<D> => {
  return {
    data,
    totalCount,
    currentPage,
  };
};
