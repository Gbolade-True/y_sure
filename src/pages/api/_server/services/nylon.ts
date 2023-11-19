import { AppDataSource } from '../data-source';
import { NylonEntity } from '../entities/NylonEntity';
import { ReqQuery } from '../interfaces/ReqQuery';
import { INylonFilter } from '../interfaces/filter';
import { INylon } from '../interfaces/nylon';
import { APIResponse } from '../utils/api_response';
import { confirmInitiaization } from '../utils/constants';

export const getNylonsServ = async (params: ReqQuery<INylonFilter>) => {
  const { pageNumber = 1, pageSize = 10, filters } = params;
  const skip = Number(pageSize) * (Number(pageNumber) - 1);
  const parsedFilters = filters ? (JSON.parse(filters) as INylonFilter) : null;

  try {
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(NylonEntity)
      .createQueryBuilder('nylon');

    if (parsedFilters) {
      const { type, name, color, quantity } = parsedFilters;

      if (type) {
        queryBuilder.andWhere('nylon.type = :type', { type });
      }

      if (name) {
        queryBuilder.andWhere('nylon.name ILIKE :name', { name: `%${name}%` });
      }

      if (color) {
        queryBuilder.andWhere('nylon.color = :color', { color });
      }

      if (quantity) {
        queryBuilder.andWhere('nylon.quantity >= :quantity', { quantity });
      }
    }

    const totalCount = await queryBuilder.getCount();
    const nylons = await queryBuilder.skip(skip).take(Number(pageSize)).getMany();

    return new APIResponse(200, nylons, totalCount, Number(pageNumber));
  } catch (error) {
    return new APIResponse(400, `there seems to have been an error :(, ${error}`);
  }
};

export const getNylonByIdServ = async (nylonId: string) => {
  if (!nylonId) return new APIResponse(404, 'No Id Provided');
  try {
    const nylon = await (await confirmInitiaization(AppDataSource)).getRepository(NylonEntity).findOneBy({
      id: nylonId,
    });
    if (!nylon) {
      return new APIResponse(400, 'Invalid ID');
    }
    return new APIResponse(200, nylon);
  } catch (error) {
    return new APIResponse(400, `there seems to have been an error :(, ${error}`);
  }
};

export const createNylonServ = async (nylon: INylon) => {
  try {
    const createdNylon = await (await confirmInitiaization(AppDataSource)).getRepository(NylonEntity).save(nylon);
    return new APIResponse(200, createdNylon);
  } catch (error) {
    return new APIResponse(400, `there seems to have been an error :(, ${error}`);
  }
};

export const updateNylonServ = async (nylon: INylon) => {
  if (!nylon.id) return new APIResponse(404, 'No Id Provided');
  try {
    const existingNylon = await (await confirmInitiaization(AppDataSource)).getRepository(NylonEntity).findOneBy({
      id: nylon.id,
    });

    if (!existingNylon) {
      return new APIResponse(404, 'Nylon not found');
    }

    const updatedNylon = AppDataSource.getRepository(NylonEntity).merge(existingNylon, nylon);
    updatedNylon.updatedAt = new Date();

    const savedNylon = await (await confirmInitiaization(AppDataSource)).getRepository(NylonEntity).save(updatedNylon);

    return new APIResponse(200, savedNylon);
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const updateNylonCountServ = async (nylons: INylon[], type: 'sale' | 'purchase') => {
  try {
    const result = nylons.map(async nylon => {
      await (
        await confirmInitiaization(AppDataSource)
      )
        .createQueryBuilder(NylonEntity, 'nylon')
        .update(NylonEntity)
        .set({ quantity: () => `"quantity" ${type === 'sale' ? '-' : '+'} ${nylon.quantity}` })
        .where('id = :id', { id: nylon.id })
        .execute();
    });

    if (!(await Promise.all(result))) {
      return new APIResponse(404, 'Nylon not found');
    }

    return new APIResponse(200, { message: 'Nylon quantity updated successfully', nylon: result });
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const deleteNylonServ = async (nylonId: string) => {
  if (!nylonId) return new APIResponse(404, 'No Id Provided');
  try {
    const existingNylon = await (await confirmInitiaization(AppDataSource))
      .getRepository(NylonEntity)
      .findOneBy({ id: nylonId });

    if (!existingNylon) {
      return new APIResponse(404, 'Nylon not found');
    }

    await (await confirmInitiaization(AppDataSource)).getRepository(NylonEntity).delete(nylonId);

    return new APIResponse(200, 'Nylon deleted successfully');
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};
