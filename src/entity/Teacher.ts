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
import { Channel } from "./Channel";
import { Post } from "./Post";

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  position: string;

  @Column("int")
  userId: number;

  @Column("int")
  fieldOfStudyId: number;

  @ManyToOne(() => FieldOfStudy, fieldOfStudy => fieldOfStudy.teachers)
  fieldOfStudy: FieldOfStudy;

  @OneToOne(() => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => Channel, channel => channel.owner)
  ownedChannels: Channel[];

  @OneToMany(() => Post, post => post.owner)
  posts: Post[];
}
