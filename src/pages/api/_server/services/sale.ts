import { AppDataSource } from '../data-source';
import { ReqQuery } from '../interfaces/ReqQuery';
import { ISaleFilter } from '../interfaces/filter';
import { SaleEntity } from '../entities/SaleEntity';
import { APIResponse } from '../utils/api_response';
import { mapNylonEntityToNylonDto, updateNylonCountServ } from './nylon';
import { confirmInitiaization } from '../utils/constants';
import { MakeSaleDto, SaleDto, UpdateSaleDto } from '../dtos/sale';
import { NylonDto } from '../dtos/nylon';

export const getSalesServ = async (params: ReqQuery<ISaleFilter>) => {
  const { pageNumber = 1, pageSize = 25, filters } = params;
  const skip = Number(pageSize) * (Number(pageNumber) - 1);
  const parsedFilters = filters ? (JSON.parse(filters) as ISaleFilter) : null;

  try {
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(SaleEntity)
      .createQueryBuilder('sale');

    if (parsedFilters) {
      const { nylons, timeFrame, owed, customer } = parsedFilters;

      if (nylons) {
        const nylonNamesToFilter = nylons.map(x => x.toLowerCase().trim());
        queryBuilder.andWhere(`CAST(sale.nylons AS json)->>'name' IN (:...nylonNamesToFilter)`, {
          nylonNamesToFilter,
        });
      }

      if (timeFrame) {
        const currentDate = new Date();
        if (timeFrame === 'day') {
          queryBuilder.andWhere(`DATE(sale.createdAt)::date = DATE(:currentDate)::date`, { currentDate });
        }
        if (timeFrame === 'week') {
          queryBuilder.andWhere(`sale.createdAt >= :weekAgo`, {
            weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
          });
        }
        if (timeFrame === 'month') {
          queryBuilder.andWhere(`sale.createdAt >= :monthAgo`, {
            monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
          });
        }
        if (timeFrame === 'year') {
          queryBuilder.andWhere(`sale.createdAt >= :yearAgo`, {
            yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000),
          });
        }
      }

      if (owed) {
        queryBuilder.andWhere('sale.amountOwed > 0');
      }

      if (customer) {
        queryBuilder.andWhere('sale.customerNamer ILIKE :customer', { customer: `%${customer}%` });
      }
    }

    const totalCount = await queryBuilder.getCount();
    const saleEntities = await queryBuilder.skip(skip).take(Number(pageSize)).getMany();
    const sales = saleEntities.map(mapSaleEntityToSaleDto);

    return new APIResponse(200, sales, totalCount, Number(pageNumber));
  } catch (err) {
    return new APIResponse(500, `Internal Server Error, ${err}`);
  }
};

export const getSaleByIdServ = async (saleId: string) => {
  try {
    const sale = await (await confirmInitiaization(AppDataSource)).getRepository(SaleEntity).findOneBy({
      id: saleId,
    });
    if (!sale) {
      return new APIResponse(400, `Sale not found`);
    }
    return new APIResponse(200, mapSaleEntityToSaleDto(sale));
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const makeSaleServ = async (saleDto: MakeSaleDto) => {
  try {
    try {
      const res = await updateNylonCountServ(saleDto.nylons, 'sale');
      if (res.status !== 200) {
        return new APIResponse(400, `Error updating nylon count while selling`);
      }
    } catch (error) {
      return new APIResponse(500, `Internal Server Error, ${error}`);
    }
    const saleEntity = mapSaleDtoToSaleEntity(saleDto);
    const savedSale = await (await confirmInitiaization(AppDataSource)).getRepository(SaleEntity).save(saleEntity);
    return new APIResponse(200, mapSaleEntityToSaleDto(savedSale));
  } catch (error) {
    return new APIResponse(400, `Error making sale, ${error}`);
  }
};

export const checkTotalSalesInTimeFrameServ = async (params: ReqQuery<ISaleFilter>) => {
  const parsedFilters = params.filters ? (JSON.parse(params.filters) as ISaleFilter) : null;
  const timeFrame = parsedFilters?.timeFrame;

  if (!timeFrame) return new APIResponse(400, 'there seems to have been an error :(');

  try {
    let res: any = {};
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(SaleEntity)
      .createQueryBuilder('sale');
    const currentDate = new Date();

    if (timeFrame === 'day') {
      res = await queryBuilder
        .select('SUM(sale.totalAmount)', 'total')
        .andWhere(`DATE(sale.createdAt)::date = DATE(:currentDate)::date`, { currentDate })
        .getRawOne();
    }
    if (timeFrame === 'week') {
      res = await queryBuilder
        .select('SUM(sale.totalAmount)', 'total')
        .andWhere(`sale.createdAt >= :weekAgo`, { weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) })
        .getRawOne();
    }
    if (timeFrame === 'month') {
      res = await queryBuilder
        .select('SUM(sale.totalAmount)', 'total')
        .andWhere(`sale.createdAt >= :monthAgo`, {
          monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }
    if (timeFrame === 'year') {
      res = await queryBuilder
        .select('SUM(sale.totalAmount)', 'total')
        .andWhere(`sale.createdAt >= :yearAgo`, {
          yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }

    return new APIResponse(200, { total: res.total, timeFrame });
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const updateSaleServ = async (saleDto: UpdateSaleDto) => {
  if (!saleDto.id) return new APIResponse(404, 'No Id Provided');
  try {
    const existingSale = await (await confirmInitiaization(AppDataSource)).getRepository(SaleEntity).findOneBy({
      id: saleDto.id,
    });

    if (!existingSale) {
      return new APIResponse(400, 'there seems to have been an error :(');
    }

    const saleEntity = mapSaleDtoToSaleEntity(saleDto);
    saleEntity.updatedAt = new Date();

    // Add back what was sold prior
    const existingNylonDtos = existingSale.nylons.map(mapNylonEntityToNylonDto);
    try {
      const res = await updateNylonCountServ(existingNylonDtos, 'purchase');
      if (res.status !== 200) {
        return new APIResponse(400, `Error updating nylon count while r_updating sale`);
      }
    } catch (error) {
      return new APIResponse(500, 'there seems to have been an error :(');
    }

    const updatedSale = (await confirmInitiaization(AppDataSource))
      .getRepository(SaleEntity)
      .merge(existingSale, saleEntity);

    // Remove new items sold now
    const updatedNylonDtos = updatedSale.nylons.map(mapNylonEntityToNylonDto);
    try {
      const res = await updateNylonCountServ(updatedNylonDtos, 'sale');
      if (res.status !== 200) {
        return new APIResponse(400, `Error updating nylon count while m_updating sale`);
      }
    } catch (error) {
      return new APIResponse(500, 'there seems to have been an error :(');
    }

    const savedSale = await (await confirmInitiaization(AppDataSource)).getRepository(SaleEntity).save(updatedSale);

    return new APIResponse(200, mapSaleEntityToSaleDto(savedSale));
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

const calculateAmountBasedOnNylonsSold = (nylonDtos: NylonDto[]): number => {
  const totalAmount: number = nylonDtos.map(nylon => nylon.price).reduce((acc, currentPrice) => acc + currentPrice, 0);
  return totalAmount;
};

const calculateAmountOwed = (totalAmount: number, amountPaid: number): number => {
  return totalAmount - amountPaid || 0;
};

const mapSaleDtoToSaleEntity = (dto: MakeSaleDto | UpdateSaleDto): SaleEntity => {
  const sale = new SaleEntity();
  const totalAmount = calculateAmountBasedOnNylonsSold(dto.nylons);

  sale.nylons = dto.nylons;
  sale.totalAmount = totalAmount;
  sale.amountPaid = dto.amountPaid;
  sale.amountOwed = calculateAmountOwed(totalAmount, dto.amountPaid);
  sale.comment = dto.comment;
  sale.customerName = dto.customerName;
  if (dto.dateToBeDelivered) sale.dateToBeDelivered = new Date(dto.dateToBeDelivered);

  if ('id' in dto) sale.id = dto.id;

  return sale;
};

const mapSaleEntityToSaleDto = (sale: SaleEntity): SaleDto => {
  const dto: SaleDto = {
    id: sale.id,
    nylons: sale.nylons,
    totalAmount: sale.totalAmount,
    amountPaid: sale.amountPaid,
    amountOwed: sale.amountOwed,
    comment: sale.comment,
    customerName: sale.customerName,
    createdAt: sale.createdAt,
  };

  return dto;
};
