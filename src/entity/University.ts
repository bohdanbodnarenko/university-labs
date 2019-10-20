import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class University {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 50})
    name: string;

    @Column("varchar", {length: 20})
    city: string;

    @Column("varchar", {length: 50})
    country: string;

    @Column("varchar", {length: 50})
    address: string;

    @Column('int')
    user_id: number;

}
