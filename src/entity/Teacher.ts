import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 50})
    position: string;

    @Column('int')
    user_id: number;

    @Column('int')
    field_of_study_id: number;
}
