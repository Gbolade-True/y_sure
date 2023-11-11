import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
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
    totalAmount!: number;

    @Column('varchar')
    comment?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date;
}
  