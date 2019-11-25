import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  OneToMany,
  JoinTable
} from "typeorm";

import { Teacher } from "./Teacher";
import { FieldOfStudy } from "./FieldOfStudy";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 30, unique: true })
  name: string;

  @Column("text", { default: "", nullable: true })
  description: string;

  @Column("int")
  ownerId: number;

  @ManyToOne(() => FieldOfStudy, fieldOfStudy => fieldOfStudy.channels)
  fieldOfStudy: FieldOfStudy;

  @ManyToOne(() => Teacher, teacher => teacher.ownedChannels)
  owner: Teacher;

  @OneToMany(() => Post, post => post.channel)
  posts: Post[];

  @ManyToMany(() => User, user => user.channels)
  @JoinTable()
  users: User[];
}
