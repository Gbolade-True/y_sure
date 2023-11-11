import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface ReqParams<TFilter = {}> {
    pageNumber?: number;
    pageSize?: number;
    filters?: TFilter;
};

export interface CustomRequest<TBody, TParams extends ParamsDictionary = {}> extends Request {
    body: TBody;
    params: TParams;
}