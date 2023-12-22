/* eslint-disable no-console */
// Import necessary modules
import { NylonEntity } from '../entities/NylonEntity';
import { mockNylons } from '../../../../mocks/nylon';
import { confirmInitiaization } from '../utils/constants';
import { AppDataSource } from '../data-source';
import { SaleEntity } from '../entities/SaleEntity';
import { mockSales } from '../../../../mocks/sale';
import { PurchaseEntity } from '../entities/PurchaseEntity';
import { mockPurchases } from '../../../../mocks/purchase';

// Function to seed the database
const seedNylons = async () => {
  const nylonQueryBuilder = (await confirmInitiaization(AppDataSource))
    .getRepository(NylonEntity)
    .createQueryBuilder('nylon');

  try {
    await nylonQueryBuilder.insert().values(mockNylons).execute();

    console.log('Nylons seeded successfully!');
  } catch (error) {
    console.error('Error seeding nylons_a', error);
  } finally {
    await nylonQueryBuilder.connection.destroy();
  }
};

const seedSales = async () => {
  const saleQueryBuilder = (await confirmInitiaization(AppDataSource))
    .getRepository(SaleEntity)
    .createQueryBuilder('sale');

  try {
    await saleQueryBuilder.insert().values(mockSales).execute();

    console.log('Sales seeded successfully!');
  } catch (error) {
    console.error('Error seeding sales_a', error);
  } finally {
    await saleQueryBuilder.connection.destroy();
  }
};

const seedPurchases = async () => {
  const purchaseQueryBuilder = (await confirmInitiaization(AppDataSource))
    .getRepository(PurchaseEntity)
    .createQueryBuilder('purchase');

  try {
    await purchaseQueryBuilder.insert().values(mockPurchases).execute();

    console.log('Purchases seeded successfully!');
  } catch (error) {
    console.error('Error seeding purchases_a', error);
  } finally {
    await purchaseQueryBuilder.connection.destroy();
  }
};

const seedDatabase = async () => {
  try {
    await seedNylons();
  } catch (error) {
    console.error('Error seeding nylons_m', error);
    return;
  }

  try {
    await seedSales();
  } catch (error) {
    console.error('Error seeding sales_m', error);
    return;
  }

  try {
    await seedPurchases();
  } catch (error) {
    console.error('Error seeding purchases_m', error);
  }
};

// Run the seeder function
seedDatabase();
