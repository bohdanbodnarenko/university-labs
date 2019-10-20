import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 50})
    name: string;

    @Column('text', {default: ''})
    description: string;

    @Column('int')
    field_of_study_id: number;

    @Column('int')
    owner_id: number;

}
