import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  ManyToMany
} from "typeorm";
import * as bcrypt from "bcryptjs";

import { Channel } from "./Channel";
import { University } from "./University";

export enum UserRoles {
  student = "student",
  teacher = "teacher"
}

@Entity("user_account")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20 })
  name: string;

  @Column("varchar", { length: 25 })
  surname: string;

  @Column("date", { nullable: true })
  date_of_birth: Date;

  @Column("varchar", { length: 30, unique: true })
  email: string;

  @Column("text")
  password: string;

  @Column("varchar", { length: 10, nullable: true })
  role: UserRoles;

  @ManyToMany(() => Channel, channel => channel.users)
  channels: Channel[];

  @ManyToMany(() => University, university => university.users)
  universities: University[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
