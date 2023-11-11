import { AppDataSource } from "../data-source"
import { NylonEntity } from "../entities/NylonEntity"
import { ReqParams } from "../interfaces/ReqParams"
import { INylonFilter } from "../interfaces/filter"
import { INylon } from "../interfaces/nylon"
import { APIResponse } from "../utils/api_response"

export const getNylonsServ = async (params: ReqParams<INylonFilter>) => {
  const { pageNumber = 1, pageSize = 10, filters } = params;
  const skip = pageSize * (pageNumber - 1);

  try {
    const queryBuilder = AppDataSource.getRepository(NylonEntity).createQueryBuilder('nylon');

    if(filters) {
      const { type, name, color, quantity } = filters;

      if (type) {
        queryBuilder.andWhere('nylon.type = :type', { type });
      }

      if (name) {
        queryBuilder.andWhere('nylon.name = :name', { name });
      }

      if (color) {
        queryBuilder.andWhere('nylon.color = :color', { color });
      }

      if (quantity) {
        queryBuilder.andWhere('nylon.quantity >= :quantity', { quantity });
      }
    }

    const nylons = 
      await queryBuilder
        .skip(skip)
        .take(pageSize)
        .getMany()
    console.log(nylons, 'nylon success')

    return new APIResponse(200, nylons)
  }  catch(err) {
    console.log('Error getting nylons:', err);
    return new APIResponse(400, `there seems to have been an error :(, ${err}`);
  }
}

export const getNylonByIdServ = async (nylonId: string) => {
  const nylon = await AppDataSource.getRepository(NylonEntity).findOneBy({
      id: nylonId,
  })
  return new APIResponse(200, nylon);
}

export const createNylonServ = async (nylon: INylon) => {
  const createdNylon = await AppDataSource.getRepository(NylonEntity).save(nylon)
  return new APIResponse(200, createdNylon);
}

export const updateNylonServ = async (nylon: INylon) => {
  try {
    const existingNylon = await AppDataSource.getRepository(NylonEntity).findOneBy({
        id: nylon.id,
    })

    if (!existingNylon) {
      return new APIResponse(404, 'Nylon not found')
    }

    const updatedNylon = AppDataSource.getRepository(NylonEntity).merge(existingNylon, nylon);
    updatedNylon.updatedAt = new Date();

    const savedNylon = await AppDataSource.getRepository(NylonEntity).save(updatedNylon);

    return new APIResponse(200, savedNylon);
  } catch (error) {
    console.error('Error updating Nylon:', error);
    return new APIResponse(500, 'Internal Server Error')
  }
}

export const updateNylonCountServ = async (id: string, quantity: number, type: 'sale' | 'purchase') => {
  try {
    const existingNylon = await AppDataSource.getRepository(NylonEntity).findOneBy({
      id: id,
    })

    
  if (!existingNylon) {
    return new APIResponse(404, 'Nylon not found')
  }
      
  type === 'sale' ? existingNylon.quantity -= quantity : existingNylon.quantity += quantity;

  const updatedNylon = AppDataSource.getRepository(NylonEntity).merge(existingNylon, existingNylon);
  updatedNylon.updatedAt = new Date();

  await AppDataSource.getRepository(NylonEntity).save(updatedNylon);

  return new APIResponse(200, { message: 'Nylon quantity updated successfully', nylon: updatedNylon });
  } catch (error) {
    console.error('Error updating Nylon:', error);
    return new APIResponse(500, 'Internal Server Error')
  }
}

export const deleteNylonServ = async (nylonId: string) => {
  try {
    const existingNylon = await AppDataSource.getRepository(NylonEntity).findOneBy({ id: nylonId });

    if (!existingNylon) {
      return new APIResponse(404, 'Nylon not found')
    }

    await AppDataSource.getRepository(NylonEntity).delete(nylonId);

    return new APIResponse(200, 'Nylon deleted successfully');
  } catch (error) {
    console.error('Error deleting Nylon:', error);
    return new APIResponse(500, 'Internal Server Error')
  }
};
