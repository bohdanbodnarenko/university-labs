import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    text: string;

    // @Column('date', {default: Date.now()})
    // timestamp: number;

    @Column('int')
    channel_id: number;

    @Column('int')
    owner_id: number;

}
