import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Poster} from "./poster.entity";

export enum TemplatePart {
    INTRODUCTION_PART_1 = "INTRODUCTION_PART_1",
    INTRODUCTION_PART_2 = "INTRODUCTION_PART_2",
    CONCLUSION = "CONCLUSION",
    GENERAL = "GENERAL"
}

export enum TemplateType {
    ALBUM = "ALBUM", VENUE = "VENUE"
}

@Entity("poster_text_template")
export default class PosterTextTemplateEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("longtext")
    text!: string;

    @Column()
    templateType!: TemplateType

    @Column()
    templatePart!: TemplatePart

}