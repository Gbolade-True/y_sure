import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { NylonType, NylonTypeEnum } from '../enums/NylonTypeEnum';
  
@Entity('Nylon')
export class NylonEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column('text')
    name!: string;
  
    @Column('text')
    color!: string;
  
    @Column('int')
    quantity!: number;

    @Column('int')
    price!: number;
  
    @Column({ type: 'enum', enum: NylonTypeEnum, nullable: true })
    type?: NylonType;

    @Column('int')
    height?: number;
  
    @Column('int')
    width?: number;

    @Column('varchar')
    manufacturer?: string;
  
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt?: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date;
}
  