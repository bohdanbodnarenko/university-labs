import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from "typeorm";

import { Teacher } from "./Teacher";
import { Channel } from "./Channel";

@Entity("field_of_study")
export class FieldOfStudy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100, unique:true })
  name: string;

  @OneToMany(() => Teacher, teacher => teacher.fieldOfStudy)
  teachers: Teacher[];

  @OneToMany(() => Channel, channel => channel.fieldOfStudy)
  channels: Channel[];
}
