import { IRouter } from 'express';
import nylonRoute from './nylon';
import saleRoute from './sale';

const routes = (app: IRouter) => {
    const api = (route: string) => `/api/${route}`;

    app.use(api('nylon'), nylonRoute);
    app.use(api('sale'), saleRoute);
}

export default routes;
