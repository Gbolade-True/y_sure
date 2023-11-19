import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ type: 'varchar', nullable: true })
  comment?: string;

  @Column({ type: 'varchar', nullable: true })
  customerName?: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  dateToBeDelivered?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;
}
