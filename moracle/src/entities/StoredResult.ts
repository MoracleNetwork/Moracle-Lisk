import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class StoredResult extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    txId: string;

    @Column("text")
    serializedResult: string;

}