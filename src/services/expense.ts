import { AppDataSource } from "../data-source"
import { ReqParams } from "../interfaces/ReqParams"
import { IExpenseFilter } from "../interfaces/filter"
import { APIResponse } from "../utils/api_response"
import { updateNylonCountServ } from "./nylon"
import { IPurchase } from "../interfaces/purchase"
import { ExpenseEntity } from "../entities/ExpenseEntity"
import { IExpense } from "../interfaces/expense"

export const getExpensesServ = async (params: ReqParams<IExpenseFilter>) => {
    const { pageNumber = 1, pageSize = 25, filters } = params;
    const skip = pageSize * (pageNumber - 1);

    try {
        const queryBuilder = AppDataSource.getRepository(ExpenseEntity).createQueryBuilder('expense');

        if (filters) {
            const { timeFrame } = filters;

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

        const expenses = 
            queryBuilder
                .skip(skip)
                .take(pageSize)
                .getMany()

        return new APIResponse(200, expenses);

    }  catch(err) {
        console.log('Error getting espenses:', err);
        return new APIResponse(400, 'there seems to have been an error :(');
    }
}

export const getExpenseByIdServ = async (expenseId: string) => {
    const expense = await AppDataSource.getRepository(ExpenseEntity).findOneBy({
        id: expenseId,
    })
    return new APIResponse(200, expense);
}

export const registerExpenseServ = async (expense: IExpense) => {
    const savedExpense = await AppDataSource.getRepository(ExpenseEntity).save(expense)
    return new APIResponse(200, savedExpense);
}

export const checkTotalExpenseInTimeFrameServ = async (params: ReqParams<IExpenseFilter>) => {
    const timeFrame = params.filters?.timeFrame;

    if (!timeFrame) return new APIResponse(400, 'there seems to have been an error :(');;

    try {
        let res: any = {}
        const queryBuilder = AppDataSource.getRepository(ExpenseEntity).createQueryBuilder('expense');
        const currentDate = new Date();

        if (timeFrame === 'day') {
            res = await queryBuilder
                .select('SUM(expense.totalAmount)', 'total')
                .andWhere(
                    `DATE_TRUNC('day', expense.createdAt) = DATE_TRUNC('day', :currentDate)`,
                    { currentDate }
                )
                .getRawOne();
        }
        if (timeFrame === 'week') {
            res = await queryBuilder
                .select('SUM(expense.totalAmount)', 'total')
                .andWhere(
                    `expense.createdAt >= :weekAgo`,
                    { weekAgo: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }
        if (timeFrame === 'month') {
            res = await queryBuilder
                .select('SUM(expense.totalAmount)', 'total')
                .andWhere(
                    `expense.createdAt >= :monthAgo`,
                    { monthAgo: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }
        if (timeFrame === 'year') {
            res = await queryBuilder
                .select('SUM(expense.totalAmount)', 'total')
                .andWhere(
                    `expense.createdAt >= :yearAgo`,
                    { yearAgo: new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000) }
                )
                .getRawOne();
        }

        return new APIResponse(200, { total: res.total, timeFrame });
    } catch (error) {
        console.log('Error getting total expenses:', error);
        return new APIResponse(400, 'there seems to have been an error :(');
    }
}

export const updateExpenseServ = async (expense: IExpense) => {
    try {
        const existingExpense = await AppDataSource.getRepository(ExpenseEntity).findOneBy({
            id: expense.id,
        })
    
        if (!existingExpense) {
            return new APIResponse(400, 'there seems to have been an error :(');
        }
    
        const updatedExpense = AppDataSource.getRepository(ExpenseEntity).merge(existingExpense, expense);

        const savedExpense = await AppDataSource.getRepository(ExpenseEntity).save(updatedExpense);

        return new APIResponse(200, savedExpense);
      } catch (error) {
        console.error('Error updating Expense:', error);
        return new APIResponse(500, 'Internal Server Error')
      }
}
