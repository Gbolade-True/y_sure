import { DataSource } from 'typeorm';
import { NylonEntity } from './entities/NylonEntity';
import { SaleEntity } from './entities/SaleEntity';
import { PurchaseEntity } from './entities/PurchaseEntity';
import { ExpenseEntity } from './entities/ExpenseEntity';
import { Init1700152458379 } from './migrations/1700152458379-Init';

// console.log(process.env.DB_URL, 'wefewfewer')

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://default:gQHowOn3fmW4@ep-tiny-silence-24032170-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
  username: 'postgres',
  // port: 5432,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_ENDPOINT,
  // database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [NylonEntity, SaleEntity, PurchaseEntity, ExpenseEntity],
  migrations: [Init1700152458379],
  subscribers: [],
});
