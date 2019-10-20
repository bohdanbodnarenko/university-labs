import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 30})
    specialization: string;

    @Column('int')
    user_id: number;

}
