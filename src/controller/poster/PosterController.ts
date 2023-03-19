import {Request, Response} from "express";
import {Poster} from "../../entity/poster.entity";
import {arrayDataProcessor, posterProcessor} from "../../processor/PosterProcessor";
import {NotFoundError} from "../../errors/http/NotFoundError";
import {MissingProprietiesError} from "../../errors/http/MissingProprietiesError";
import {AppDataSource} from "../../database/database-source";

const posterRepository = AppDataSource.getRepository(Poster)


export async function getFullPoster(req: Request, res: Response) {
    let posters: Poster[]

    try {
        posters = await posterRepository.createQueryBuilder("poster").getMany();
    } catch (e) {
        throw new NotFoundError("Poster not found.")
    }
    res.status(200).send({
        posters
    })
}

export async function getPoster(req: Request, res: Response) {
    const {id} = req.params;

    if (!id) {
        let posters: Poster[]

        try {
            posters = await posterRepository.createQueryBuilder("poster").getMany();
        } catch (e) {
            throw new NotFoundError("Poster not found.")
        }

        const treatedPosters: Object[] = await arrayDataProcessor(posters);

        res.status(200).send({
            posters: treatedPosters
        })

    } else {

        const poster = await posterRepository.findOneBy({
            id: parseInt(id),
        });

        if (!poster) {
            throw new NotFoundError("Poster not found.")
        }

        const treatedPoster: Object = await posterProcessor(poster)


        res.status(200).send({
            poster: treatedPoster
        })

    }
}

export async function deletePoster(req: Request, res: Response) {
    const {id} = req.body

    const poster = await posterRepository.findOneBy({
        id: id,
    });

    if (!poster) throw new NotFoundError("Poster not found.")

    await posterRepository.remove(poster);

    res.status(200).send("");
}


export async function updatePoster(req: Request, res: Response) {
    const {id, frenchText, englishText, title, draft, valid} = req.body;


    const poster = await posterRepository.findOneBy({
        id: id,
    });

    if (!poster) throw new NotFoundError("Poster not found.")


    poster.title = title;
    poster.frenchText = frenchText;
    poster.englishText = englishText;
    poster.draft = draft;
    poster.valid = valid;

    await posterRepository.save(poster);

    res.status(200).send(poster);
}


export async function addPoster(req: Request, res: Response) {

    const {frenchText, englishText, title, draft, valid, posterInfo} = req.body;

    try {

        const poster = await posterRepository.save({
            title,
            frenchText,
            englishText,
            valid,
            draft,
            posterInfo
        })
        res.status(201).send(poster);
    } catch (error) {
        console.log(error)
        throw new MissingProprietiesError("Missing properties in request or SQL cannot accomplish this.")
    }


}