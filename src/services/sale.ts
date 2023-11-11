import { AppDataSource } from "../data-source"
import { ReqParams } from "../interfaces/ReqParams"
import { ISalesFilter } from "../interfaces/filter"
import { SaleEntity } from "../entities/SaleEntity"
import { ISale } from "../interfaces/sale"
import { APIResponse } from "../utils/api_response"
import { updateNylonCountServ } from "./nylon"

export const getSalesServ = async (params: ReqParams<ISalesFilter>) => {
    const { pageNumber = 1, pageSize = 25, filters } = params;
    const skip = pageSize * (pageNumber - 1);

    try {
        const queryBuilder = AppDataSource.getRepository(SaleEntity).createQueryBuilder('sale');

        if (filters) {
            const { nylons, timeFrame, owed, customer } = filters;

            if (nylons) {
                const nylonNamesToFilter = nylons.map(x => x.toLowerCase().trim())
                queryBuilder.andWhere(`ARRAY[${nylonNamesToFilter.map(name => `'${name}'`).join(',')}]::text[] && sale.nylons`);
            }

            if (timeFrame) {
                const currentDate = new Date();
                if(timeFrame === 'day') {
                    queryBuilder.andWhere(
                        `DATE_TRUNC('day', sale.createdAt) = DATE_TRUNC('day', :currentDate)`,
                        { currentDate }
                      );
                }
                if(timeFrame === 'week') {
                    queryBuilder.andWhere(
                        `sale.createdAt >= :weekAgo`,
                        { weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) }
                    );
                }
                if(timeFrame === 'month') {
                    queryBuilder.andWhere(
                        `sale.createdAt >= :monthAgo`,
                        { monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
                    );
                }
                if(timeFrame === 'year') {
                    queryBuilder.andWhere(
                        `sale.createdAt >= :yearAgo`,
                        { yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000) }
                    );
                }
            }

            if (owed) {
                queryBuilder.andWhere('sale.amountOwed > 0');
            }

            if (customer) {
                queryBuilder.andWhere('sale.customerNamer === :customer', { customer });
            }
        }

        const sales = 
            await queryBuilder
                .skip(skip)
                .take(pageSize)
                .getMany()

        return new APIResponse(200, sales);

    }  catch(err) {
        return new APIResponse(500, `Internal Server Error, ${err}`)
    }
}

export const getSaleByIdServ = async (saleId: string) => {
    const sale = await AppDataSource.getRepository(SaleEntity).findOneBy({
        id: saleId,
    })
    return new APIResponse(200, sale);
}

export const makeSaleServ = async (sale: ISale) => {
    const savedSale = await AppDataSource.getRepository(SaleEntity).save(sale)
    for (const nylon of sale.nylons) {
        await updateNylonCountServ(nylon.id, nylon.quantity, 'sale');
    }
    return new APIResponse(200, savedSale);
}

export const checkTotalSalesInTimeFrameServ = async (params: ReqParams<ISalesFilter>) => {
    const timeFrame = params.filters?.timeFrame;

    if (!timeFrame) return new APIResponse(400, 'there seems to have been an error :(');;

    try {
        let res: any = {}
        const queryBuilder = AppDataSource.getRepository(SaleEntity).createQueryBuilder('sale');
        const currentDate = new Date();

        if (timeFrame === 'day') {
            res = await queryBuilder
                .select('SUM(sale.totalAmount)', 'total')
                .andWhere(
                    `DATE_TRUNC('day', sale.createdAt) = DATE_TRUNC('day', :currentDate)`,
                    { currentDate }
                )
                .getRawOne();
        }
        if (timeFrame === 'week') {
            res = await queryBuilder
                .select('SUM(sale.totalAmount)', 'total')
                .andWhere(
                    `sale.createdAt >= :weekAgo`,
                    { weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }
        if (timeFrame === 'month') {
            res = await queryBuilder
                .select('SUM(sale.totalAmount)', 'total')
                .andWhere(
                    `sale.createdAt >= :monthAgo`,
                    { monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }
        if (timeFrame === 'year') {
            res = await queryBuilder
                .select('SUM(sale.totalAmount)', 'total')
                .andWhere(
                    `sale.createdAt >= :yearAgo`,
                    { yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }

        return new APIResponse(200, { total: res.total, timeFrame });
    } catch (error) {
        return new APIResponse(500, `Internal Server Error, ${error}`)
    }
}

export const updateSaleServ = async (sale: ISale) => {
    try {
        const existingSale = await AppDataSource.getRepository(SaleEntity).findOneBy({
            id: sale.id,
        })
    
        if (!existingSale) {
            return new APIResponse(400, 'there seems to have been an error :(');
        }
    
        const updatedSale = AppDataSource.getRepository(SaleEntity).merge(existingSale, sale);

        const savedSale = await AppDataSource.getRepository(SaleEntity).save(updatedSale);

        return new APIResponse(200, savedSale);
      } catch (error) {
        return new APIResponse(500, `Internal Server Error, ${error}`)
      }
}
