import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("poster_info")
export default class PosterInfoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    artist!: string;

    @Column({nullable: true})
    date!: string;

    @Column({nullable: true})
    tour!: string;

    @Column({nullable: true})
    album!: string;

    @Column({nullable: true})
    room!: string;

    @Column({nullable: true})
    dim1cm!: number;

    @Column({nullable: true})
    dim2cm!: number;

    @Column({nullable: true})
    dim1in!: number;

    @Column({nullable: true})
    dim2in!: number;

    @Column({nullable: true})
    printer!: string;

    @Column({nullable: true})
    photo!: string;

    @Column({type:"longtext", nullable: true})
    keywords_musical_genre!: string;

    @Column({type:"longtext", nullable: true})
    keywords_specifics!: string;

    @Column({type:"longtext", nullable: true})
    keywords_product!: string;

    @Column({type:"longtext", nullable: true})
    product_category!: string;

    @Column({nullable: true})
    ugc!: string;

    @Column({nullable: true})
    box!: string;

    @Column({nullable: true})
    size_max!: string;

    @Column({nullable: true})
    stock!: number;

    @Column({nullable: true})
    price!: number;


}