import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from "typeorm";

import { Teacher } from "./Teacher";

@Entity("field_of_study")
export class FieldOfStudy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  name: string;

  @OneToMany(() => Teacher, teacher => teacher.fieldOfStudy)
  teachers: Teacher[];
}
