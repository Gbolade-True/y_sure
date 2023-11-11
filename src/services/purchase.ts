import { AppDataSource } from "../data-source"
import { ReqParams } from "../interfaces/ReqParams"
import { IPurchaseFilter } from "../interfaces/filter"
import { APIResponse } from "../utils/api_response"
import { updateNylonCountServ } from "./nylon"
import { PurchaseEntity } from "../entities/PurchaseEntity"
import { IPurchase } from "../interfaces/purchase"

export const getPurchasesServ = async (params: ReqParams<IPurchaseFilter>) => {
    const { pageNumber = 1, pageSize = 25, filters } = params;
    const skip = pageSize * (pageNumber - 1);

    try {
        const queryBuilder = AppDataSource.getRepository(PurchaseEntity).createQueryBuilder('purchase');

        if (filters) {
            const { nylons, timeFrame } = filters;

            if (nylons) {
                const nylonNamesToFilter = nylons.map(x => x.toLowerCase().trim())
                queryBuilder.andWhere(`ARRAY[${nylonNamesToFilter.map(name => `'${name}'`).join(',')}]::text[] && purchase.nylons`);
            }

            if (timeFrame) {
                const currentDate = new Date();
                if(timeFrame === 'day') {
                    queryBuilder.andWhere(
                        `DATE_TRUNC('day', purchase.createdAt) = DATE_TRUNC('day', :currentDate)`,
                        { currentDate }
                      );
                }
                if(timeFrame === 'week') {
                    queryBuilder.andWhere(
                        `purchase.createdAt >= :weekAgo`,
                        { weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) }
                    );
                }
                if(timeFrame === 'month') {
                    queryBuilder.andWhere(
                        `purchase.createdAt >= :monthAgo`,
                        { monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
                    );
                }
                if(timeFrame === 'year') {
                    queryBuilder.andWhere(
                        `purchase.createdAt >= :yearAgo`,
                        { yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000) }
                    );
                }
            }
        }

        const purchases = 
            queryBuilder
                .skip(skip)
                .take(pageSize)
                .getMany()

        return new APIResponse(200, purchases);

    }  catch(err) {
        console.log('Error getting purchases:', err);
        return new APIResponse(400, 'there seems to have been an error :(');
    }
}

export const getPurchaseByIdServ = async (purchaseId: string) => {
    const purchase = await AppDataSource.getRepository(PurchaseEntity).findOneBy({
        id: purchaseId,
    })
    return new APIResponse(200, purchase);
}

export const makePurchaseServ = async (purchase: IPurchase) => {
    const savedPurchase = await AppDataSource.getRepository(PurchaseEntity).save(purchase)
    for (const nylon of purchase.nylons) {
        await updateNylonCountServ(nylon.id, nylon.quantity, 'purchase');
    }
    return new APIResponse(200, savedPurchase);
}

export const checkTotalPurchaseInTimeFrameServ = async (params: ReqParams<IPurchaseFilter>) => {
    const timeFrame = params.filters?.timeFrame;

    if (!timeFrame) return new APIResponse(400, 'there seems to have been an error :(');;

    try {
        let res: any = {}
        const queryBuilder = AppDataSource.getRepository(PurchaseEntity).createQueryBuilder('purchase');
        const currentDate = new Date();

        if (timeFrame === 'day') {
            res = await queryBuilder
                .select('SUM(purchase.totalAmount)', 'total')
                .andWhere(
                    `DATE_TRUNC('day', purchase.createdAt) = DATE_TRUNC('day', :currentDate)`,
                    { currentDate }
                )
                .getRawOne();
        }
        if (timeFrame === 'week') {
            res = await queryBuilder
                .select('SUM(purchase.totalAmount)', 'total')
                .andWhere(
                    `purchase.createdAt >= :weekAgo`,
                    { weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }
        if (timeFrame === 'month') {
            res = await queryBuilder
                .select('SUM(purchase.totalAmount)', 'total')
                .andWhere(
                    `purchase.createdAt >= :monthAgo`,
                    { monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }
        if (timeFrame === 'year') {
            res = await queryBuilder
                .select('SUM(purchase.totalAmount)', 'total')
                .andWhere(
                    `purchase.createdAt >= :yearAgo`,
                    { yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }

        return new APIResponse(200, { total: res.total, timeFrame });
    } catch (error) {
        console.log('Error getting total purchases:', error);
        return new APIResponse(400, 'there seems to have been an error :(');
    }
}

export const updatePurchaseServ = async (purchase: IPurchase) => {
    try {
        const existingPurchase = await AppDataSource.getRepository(PurchaseEntity).findOneBy({
            id: purchase.id,
        })
    
        if (!existingPurchase) {
            return new APIResponse(400, 'there seems to have been an error :(');
        }
    
        const updatedPurchase = AppDataSource.getRepository(PurchaseEntity).merge(existingPurchase, purchase);

        const savedPurchase = await AppDataSource.getRepository(PurchaseEntity).save(updatedPurchase);

        return new APIResponse(200, savedPurchase);
      } catch (error) {
        console.error('Error updating Purchase:', error);
        return new APIResponse(500, 'Internal Server Error')
      }
}
