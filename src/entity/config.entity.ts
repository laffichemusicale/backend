import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("config")
export default class ConfigEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    key!: string

    @Column("longtext")
    value!: string

    @Column({default: false})
    editable!: boolean

    @Column({default: false})
    deletable!: boolean

}