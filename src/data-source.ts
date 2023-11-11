import { DataSource } from "typeorm";
import { NylonEntity } from "./entities/NylonEntity";
import { SaleEntity } from "./entities/SaleEntity";
import { PurchaseEntity } from "./entities/PurchaseEntity";
import { ExpenseEntity } from "./entities/ExpenseEntity";
import { Init1699732888175 } from './migrations/1699732888175-Init';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [NylonEntity, SaleEntity, PurchaseEntity, ExpenseEntity],
    migrations: [Init1699732888175],
    subscribers: [],
});
