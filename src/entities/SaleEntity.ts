import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { INylon } from '../interfaces/nylon';
  
@Entity('Sale')
export class SaleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'simple-json',
        array: false,
        default: () => "'[]'",
    })
    nylons!: INylon[];

    @Column('int')
    totalAmount!: number;

    @Column('int')
    amountPaid!: number;

    @Column('int')
    amountOwed!: number;
  
    @Column('varchar')
    comment?: string;
  
    @Column('text')
    customerName?: string;
  
    @CreateDateColumn({ type: 'timestamptz' })
    dateToBeDelivered?: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date;
}
  