import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity
} from "typeorm";

import { User } from "./User";

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  position: string;

  @Column("int", { nullable: true })
  field_of_study_id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column("int")
  userId: number;
}
