import { ExpenseType } from "../enums/ExpenseTypeEnum";

export interface IExpense {
    id: string;
    amountSpent: number;
    type: ExpenseType;
    comment?: string;
};
