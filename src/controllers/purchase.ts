import { Request, Response } from "express"
import { CustomRequest, ReqParams } from "../interfaces/ReqParams"
import { IPurchaseFilter } from "../interfaces/filter"
import { IPurchase } from "../interfaces/purchase"
import { checkTotalPurchaseInTimeFrameServ, getPurchaseByIdServ, getPurchasesServ, makePurchaseServ, updatePurchaseServ } from "../services/purchase"

export const getPurchases = async (req: Request<ReqParams<IPurchaseFilter>>, res: Response) => {
    getPurchasesServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const getPurchaseById = async (req: Request, res: Response) => {
    getPurchaseByIdServ(req.params.id).then(resp => res.status(resp.status).json(resp.data));
}

export const makePurchase = async (req: CustomRequest<IPurchase>, res: Response) => {
    makePurchaseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}

export const checkTotalPurchasesInTimeFrame = async (req: Request<ReqParams<IPurchaseFilter>>, res: Response) => {
    checkTotalPurchaseInTimeFrameServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const updatePurchase = async (req: CustomRequest<IPurchase>, res: Response) => {
    updatePurchaseServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}
