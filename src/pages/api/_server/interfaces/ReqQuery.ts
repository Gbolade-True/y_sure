import type { NextApiRequest } from 'next';

// eslint-disable-next-line unused-imports/no-unused-vars
export interface ReqQuery<TFilter> extends Partial<{ [key: string]: string }> {
  pageNumber?: string;
  pageSize?: string;
  filters?: string;
}

export interface CustomRequest<TBody, TParams extends Partial<{ [key: string]: string }> = {}> extends NextApiRequest {
  body: TBody;
  query: TParams;
}
