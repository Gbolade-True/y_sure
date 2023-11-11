export class APIResponse<T> {
    constructor(status: number, data?: T) {
        this.status = status;
        this.data = data;
    }

    status: number;
    data?: T;
}