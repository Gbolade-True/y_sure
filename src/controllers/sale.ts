import { Request, Response } from "express"
import { CustomRequest, ReqParams } from "../interfaces/ReqParams"
import { ISalesFilter } from "../interfaces/filter"
import { ISale } from "../interfaces/sale"
import { checkTotalSalesInTimeFrameServ, getSaleByIdServ, getSalesServ, makeSaleServ, updateSaleServ } from "../services/sale"

export const getSales = async (req: Request<ReqParams<ISalesFilter>>, res: Response) => {
    getSalesServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const getSaleById = async (req: Request, res: Response) => {
    getSaleByIdServ(req.params.id).then(resp => res.status(resp.status).json(resp.data));
}

export const makeSale = async (req: CustomRequest<ISale>, res: Response) => {
    makeSaleServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}

export const checkTotalSalesInTimeFrame = async (req: Request<ReqParams<ISalesFilter>>, res: Response) => {
    checkTotalSalesInTimeFrameServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const updateSale = async (req: CustomRequest<ISale>, res: Response) => {
    updateSaleServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
