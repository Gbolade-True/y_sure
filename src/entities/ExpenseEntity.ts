import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { ExpenseType, ExpenseTypeEnum } from '../enums/ExpenseTypeEnum';
  
@Entity('Expense')
export class ExpenseEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column('int')
    amountSpent!: number;

    @Column('varchar')
    comment?: string;

    @Column({ type: 'enum', enum: ExpenseTypeEnum })
    type?: ExpenseType;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;
}
  