import { Request, Response } from "express"
import { CustomRequest, ReqParams } from "../interfaces/ReqParams"
import { IExpenseFilter } from "../interfaces/filter"
import { checkTotalExpenseInTimeFrameServ, getExpenseByIdServ, getExpensesServ, registerExpenseServ, updateExpenseServ } from "../services/expense"
import { IExpense } from "../interfaces/expense"

export const getExpenses = async (req: Request<ReqParams<IExpenseFilter>>, res: Response) => {
    getExpensesServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const getExpenseById = async (req: Request, res: Response) => {
    getExpenseByIdServ(req.params.id).then(resp => res.status(resp.status).json(resp.data));
}

export const registerExpense = async (req: CustomRequest<IExpense>, res: Response) => {
    registerExpenseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}

export const checkTotalExpensesInTimeFrame = async (req: Request<ReqParams<IExpenseFilter>>, res: Response) => {
    checkTotalExpenseInTimeFrameServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const updateExpense = async (req: CustomRequest<IExpense>, res: Response) => {
    updateExpenseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
