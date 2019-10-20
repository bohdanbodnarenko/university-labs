import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("user_accout")
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

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
