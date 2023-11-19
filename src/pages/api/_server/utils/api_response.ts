import { ClientResponse, convertAPIDataToClientResponse } from './constants';

export class APIResponse<T> {
  constructor(status: number, data?: T, totalCount?: number, currentPage?: number) {
    this.status = status;
    this.data = convertAPIDataToClientResponse(data, totalCount, currentPage) as ClientResponse<T>;
  }

  status: number;

  data?: ClientResponse<T>;
}
