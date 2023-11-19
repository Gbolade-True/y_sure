import { AppDataSource } from '../data-source';
import { ReqQuery } from '../interfaces/ReqQuery';
import { IPurchaseFilter } from '../interfaces/filter';
import { APIResponse } from '../utils/api_response';
import { updateNylonCountServ } from './nylon';
import { PurchaseEntity } from '../entities/PurchaseEntity';
import { IPurchase } from '../interfaces/purchase';
import { confirmInitiaization } from '../utils/constants';

export const getPurchasesServ = async (params: ReqQuery<IPurchaseFilter>) => {
  const { pageNumber = 1, pageSize = 25, filters } = params;
  const skip = Number(pageSize) * (Number(pageNumber) - 1);
  const parsedFilters = filters ? (JSON.parse(filters) as IPurchaseFilter) : null;

  try {
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(PurchaseEntity)
      .createQueryBuilder('purchase');

    if (parsedFilters) {
      const { nylons, timeFrame } = parsedFilters;

      if (nylons) {
        const nylonNamesToFilter = nylons.map(x => x.toLowerCase().trim());
        queryBuilder.andWhere(`CAST(purchase.nylons AS json)->>'name' IN (:...nylonNamesToFilter)`, {
          nylonNamesToFilter,
        });
      }

      if (timeFrame) {
        const currentDate = new Date();
        if (timeFrame === 'day') {
          queryBuilder.andWhere(`DATE(sale.createdAt)::date = DATE(:currentDate)::date`, { currentDate });
        }
        if (timeFrame === 'week') {
          queryBuilder.andWhere(`purchase.createdAt >= :weekAgo`, {
            weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
          });
        }
        if (timeFrame === 'month') {
          queryBuilder.andWhere(`purchase.createdAt >= :monthAgo`, {
            monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
          });
        }
        if (timeFrame === 'year') {
          queryBuilder.andWhere(`purchase.createdAt >= :yearAgo`, {
            yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000),
          });
        }
      }
    }

    const purchases = await queryBuilder.skip(skip).take(Number(pageSize)).getMany();

    return new APIResponse(200, purchases);
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const getPurchaseByIdServ = async (purchaseId: string) => {
  try {
    const purchase = await (await confirmInitiaization(AppDataSource)).getRepository(PurchaseEntity).findOneBy({
      id: purchaseId,
    });
    if (!purchase) {
      return new APIResponse(400, `Purchase doesn't Exist...`);
    }
    return new APIResponse(200, purchase);
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const makePurchaseServ = async (purchase: IPurchase) => {
  try {
    try {
      const res = await updateNylonCountServ(purchase.nylons, 'purchase');
      if (res.status !== 200) {
        return new APIResponse(400, `Error updating nylon count while purchasing`);
      }
    } catch (error) {
      return new APIResponse(500, `Internal Server Error, ${error}`);
    }

    const savedPurchase = await (await confirmInitiaization(AppDataSource))
      .getRepository(PurchaseEntity)
      .save(purchase);
    return new APIResponse(200, savedPurchase);
  } catch (error) {
    return new APIResponse(400, 'Error making purchase :(');
  }
};

export const checkTotalPurchaseInTimeFrameServ = async (query: ReqQuery<IPurchaseFilter>) => {
  const parsedFilters = query.filters ? (JSON.parse(query.filters) as IPurchaseFilter) : null;
  const timeFrame = parsedFilters?.timeFrame;

  if (!timeFrame) return new APIResponse(400, 'there seems to have been an error :(');

  try {
    let res: any = {};
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(PurchaseEntity)
      .createQueryBuilder('purchase');
    const currentDate = new Date();

    if (timeFrame === 'day') {
      res = await queryBuilder
        .select('SUM(purchase.totalAmount)', 'total')
        .andWhere(`DATE(sale.createdAt)::date = DATE(:currentDate)::date`, { currentDate })
        .getRawOne();
    }
    if (timeFrame === 'week') {
      res = await queryBuilder
        .select('SUM(purchase.totalAmount)', 'total')
        .andWhere(`purchase.createdAt >= :weekAgo`, {
          weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }
    if (timeFrame === 'month') {
      res = await queryBuilder
        .select('SUM(purchase.totalAmount)', 'total')
        .andWhere(`purchase.createdAt >= :monthAgo`, {
          monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }
    if (timeFrame === 'year') {
      res = await queryBuilder
        .select('SUM(purchase.totalAmount)', 'total')
        .andWhere(`purchase.createdAt >= :yearAgo`, {
          yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }

    return new APIResponse(200, { total: res.total, timeFrame });
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const updatePurchaseServ = async (purchase: IPurchase) => {
  if (!purchase.id) return new APIResponse(404, 'No Id Provided');
  try {
    const existingPurchase = await (await confirmInitiaization(AppDataSource)).getRepository(PurchaseEntity).findOneBy({
      id: purchase.id,
    });

    if (!existingPurchase) {
      return new APIResponse(400, 'there seems to have been an error :(');
    }

    // Remove what was purchased prior
    try {
      const res = await updateNylonCountServ(existingPurchase.nylons, 'sale');
      if (res.status !== 200) {
        return new APIResponse(400, `Error updating nylon count while r_updating purchase`);
      }
    } catch (error) {
      return new APIResponse(500, 'there seems to have been an error :(');
    }

    const updatedPurchase = (await confirmInitiaization(AppDataSource))
      .getRepository(PurchaseEntity)
      .merge(existingPurchase, purchase);

    // Add new items purchased now
    try {
      const res = await updateNylonCountServ(existingPurchase.nylons, 'purchase');
      if (res.status !== 200) {
        return new APIResponse(400, `Error updating nylon count while m_updating purchase`);
      }
    } catch (error) {
      return new APIResponse(500, 'there seems to have been an error :(');
    }

    const savedPurchase = await (await confirmInitiaization(AppDataSource))
      .getRepository(PurchaseEntity)
      .save(updatedPurchase);

    return new APIResponse(200, savedPurchase);
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};
