export class APIResponse<T> {
    constructor(status: number, data?: T) {
        this.status = status;
        this.data = {
            data: data
        } as unknown as T;
    }

    status: number;
    data?: T;
}