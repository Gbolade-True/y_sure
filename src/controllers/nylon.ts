import { Request, Response } from "express"
import { CustomRequest, ReqParams } from "../interfaces/ReqParams"
import { INylon } from "../interfaces/nylon"
import { createNylonServ, deleteNylonServ, getNylonByIdServ, getNylonsServ, updateNylonServ } from "../services/nylon"

export const getNylons = async (req: Request<ReqParams>, res: Response) => {
  getNylonsServ(req.params).then(resp => res.status(resp.status).json(resp.data));
}

export const getNylonById = async (req: Request, res: Response) => {
  getNylonByIdServ(req.params.id).then(resp => res.status(resp.status).json(resp.data));
}

export const createNylon = async (req: CustomRequest<INylon>, res: Response) => {
  createNylonServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}

export const updateNylon = async (req: CustomRequest<INylon>, res: Response) => {
  updateNylonServ(req.body).then(resp => res.status(resp.status).json(resp.data));
}

export const deleteNylon = async (req: CustomRequest<any, { id: string }>, res: Response) => {
  deleteNylonServ(req.params.id).then(resp => res.status(resp.status).json(resp.data));
};
