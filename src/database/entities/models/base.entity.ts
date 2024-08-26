import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @CreateDateColumn()
  created: Date;
  @UpdateDateColumn()
  updated: Date;
}
