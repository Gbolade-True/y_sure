import { DataSource } from "typeorm";
import { NylonEntity } from "./entities/NylonEntity";
import { SaleEntity } from "./entities/SaleEntity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [NylonEntity, SaleEntity],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize();