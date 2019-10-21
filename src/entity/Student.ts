import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { User } from "./User";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 30 })
  specialization: string;

  @Column("varchar", { length: 10 })
  group: string;

  @Column("varchar", { length: 20 })
  faculty: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column("int")
  userId: number;
}
