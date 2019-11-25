import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("varchar", { length: 20 })
  city: string;

  @Column("varchar", { length: 50 })
  country: string;

  @Column("varchar", { length: 50 })
  address: string;

  @ManyToMany(() => User, user => user.universities)
  @JoinTable()
  users: User[];
}
