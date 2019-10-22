import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  ManyToOne,
  OneToMany
} from "typeorm";

import { User } from "./User";
import { FieldOfStudy } from "./FieldOfStudy";

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  position: string;

  @ManyToOne(() => FieldOfStudy, fieldOfStudy => fieldOfStudy.teachers)
  fieldOfStudy: FieldOfStudy;

  @Column("int", { nullable: true })
  fieldOfStudyId: number;

  @OneToOne(() => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column("int")
  userId: number;
}
