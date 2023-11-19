import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ExpenseTypeEnum } from '../enums/ExpenseTypeEnum';
import type { ExpenseType } from '../enums/ExpenseTypeEnum';

@Entity('Expense')
export class ExpenseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int')
  amountSpent!: number;

  @Column({ type: 'enum', enum: ExpenseTypeEnum, nullable: true, default: ExpenseTypeEnum.UTILITIES })
  type?: ExpenseType;

  @Column({ type: 'varchar', nullable: true })
  comment?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
