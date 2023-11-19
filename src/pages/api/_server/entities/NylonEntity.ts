import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NylonTypeEnum } from '../enums/NylonTypeEnum';
import type { NylonType } from '../enums/NylonTypeEnum';

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

  @Column({ type: 'int', nullable: true })
  height?: number;

  @Column({ type: 'int', nullable: true })
  width?: number;

  @Column({ type: 'varchar', nullable: true })
  manufacturer?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;
}
