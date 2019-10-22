import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert
} from "typeorm";
import * as bcrypt from "bcryptjs";

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

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
