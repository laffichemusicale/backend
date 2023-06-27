import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('prompt')
export default class PromptEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    prompt!: string
}