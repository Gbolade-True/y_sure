import { AppDataSource } from '../data-source';
import { ReqQuery } from '../interfaces/ReqQuery';
import { IExpenseFilter } from '../interfaces/filter';
import { APIResponse } from '../utils/api_response';
import { ExpenseEntity } from '../entities/ExpenseEntity';
import { IExpense } from '../interfaces/expense';
import { confirmInitiaization } from '../utils/constants';

export const getExpensesServ = async (query: ReqQuery<IExpenseFilter>) => {
  const { pageNumber = 1, pageSize = 25, filters } = query;
  const skip = Number(pageSize) * (Number(pageNumber) - 1);
  const parsedFilters = filters ? (JSON.parse(filters) as IExpenseFilter) : null;

  try {
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(ExpenseEntity)
      .createQueryBuilder('expense');

    if (parsedFilters) {
      const { timeFrame } = parsedFilters;

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

    const expenses = await queryBuilder.skip(skip).take(Number(pageSize)).getMany();

    return new APIResponse(200, expenses);
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const getExpenseByIdServ = async (expenseId: string) => {
  const expense = await (await confirmInitiaization(AppDataSource)).getRepository(ExpenseEntity).findOneBy({
    id: expenseId,
  });
  return new APIResponse(200, expense);
};

export const registerExpenseServ = async (expense: IExpense) => {
  const savedExpense = await (await confirmInitiaization(AppDataSource)).getRepository(ExpenseEntity).save(expense);
  return new APIResponse(200, savedExpense);
};

export const checkTotalExpenseInTimeFrameServ = async (params: ReqQuery<IExpenseFilter>) => {
  const parsedFilters = params.filters ? (JSON.parse(params.filters) as IExpenseFilter) : null;
  const timeFrame = parsedFilters?.timeFrame;

  if (!timeFrame) return new APIResponse(400, 'there seems to have been an error :(');

  try {
    let res: any = {};
    const queryBuilder = (await confirmInitiaization(AppDataSource))
      .getRepository(ExpenseEntity)
      .createQueryBuilder('expense');
    const currentDate = new Date();

    if (timeFrame === 'day') {
      res = await queryBuilder
        .select('SUM(expense.totalAmount)', 'total')
        .andWhere(`DATE(sale.createdAt)::date = DATE(:currentDate)::date`, { currentDate })
        .getRawOne();
    }
    if (timeFrame === 'week') {
      res = await queryBuilder
        .select('SUM(expense.totalAmount)', 'total')
        .andWhere(`expense.createdAt >= :weekAgo`, {
          weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }
    if (timeFrame === 'month') {
      res = await queryBuilder
        .select('SUM(expense.totalAmount)', 'total')
        .andWhere(`expense.createdAt >= :monthAgo`, {
          monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }
    if (timeFrame === 'year') {
      res = await queryBuilder
        .select('SUM(expense.totalAmount)', 'total')
        .andWhere(`expense.createdAt >= :yearAgo`, {
          yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000),
        })
        .getRawOne();
    }

    return new APIResponse(200, { total: res.total, timeFrame });
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};

export const updateExpenseServ = async (expense: IExpense) => {
  if (!expense.id) return new APIResponse(404, 'No Id Provided');
  try {
    const existingExpense = await (await confirmInitiaization(AppDataSource)).getRepository(ExpenseEntity).findOneBy({
      id: expense.id,
    });

    if (!existingExpense) {
      return new APIResponse(400, 'there seems to have been an error :(');
    }

    const updatedExpense = (await confirmInitiaization(AppDataSource))
      .getRepository(ExpenseEntity)
      .merge(existingExpense, expense);

    const savedExpense = await (await confirmInitiaization(AppDataSource))
      .getRepository(ExpenseEntity)
      .save(updatedExpense);

    return new APIResponse(200, savedExpense);
  } catch (error) {
    return new APIResponse(500, `Internal Server Error, ${error}`);
  }
};
