import type { NextApiRequest } from 'next';

// eslint-disable-next-line unused-imports/no-unused-vars
export interface ReqQuery<TFilter> extends Partial<{ [key: string]: string | TFilter }> {
  pageNumber?: string;
  pageSize?: string;
  filters?: string;
  type?: TFilter;
}

export interface CustomRequest<TBody, TParams extends Partial<{ [key: string]: string }> = {}> extends NextApiRequest {
  body: TBody;
  query: TParams;
}
