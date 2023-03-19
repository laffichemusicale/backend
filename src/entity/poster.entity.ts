import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import PosterInfoEntity from "./posterInfo.entity";

@Entity("poster")
export class Poster {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string

    @Column("longtext")
    frenchText!: string

    @Column("longtext")
    englishText!: string

    @Column()
    valid!: boolean

    @Column()
    draft!: boolean

    @OneToOne(() => PosterInfoEntity, {cascade:true, nullable:true})
    @JoinColumn({name:"poster_info"})
    posterInfo!: PosterInfoEntity




}