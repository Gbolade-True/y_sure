import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { INylon } from '../interfaces/nylon';

@Entity('Purchase')
export class PurchaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'simple-json',
    array: false,
    default: () => "'[]'",
  })
  nylons!: INylon[];

  @Column('int')
  totalCost!: number;

  @Column({ type: 'varchar', nullable: true })
  comment?: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
