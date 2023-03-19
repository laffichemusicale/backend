import {Request, Response} from "express";
import {getRepository} from "typeorm";
import ConfigEntity from "../entity/config.entity";
import {MissingProprietiesError} from "../errors/http/MissingProprietiesError";
import {NotFoundError} from "../errors/http/NotFoundError";
import {Poster} from "../entity/poster.entity";
import PosterTextTemplateEntity from "../entity/posterTextTemplate.entity";

//Todo: rework this code

export async function addConfig(request: Request, response: Response) {
    let {key, value, deletable, editable} = request.body;

    try {

/*        deletable = deletable? deletable : false
        editable = editable? editable : false*/
        const posterTemplate = await getRepository(ConfigEntity).save({
            key: key,
            value: value,
            editable: editable,
            deletable: deletable
        })
        return response.status(201).send(posterTemplate)
    } catch (error) {
        console.log(error)
        throw new MissingProprietiesError("Missing properties in request or SQL cannot accomplish this.")
    }

}

export async function deleteConfig(request: Request, response: Response) {
    const {key} = request.body

    const value = await getRepository(ConfigEntity).findOneBy({
        key: key,
    });

    if (!value) throw new NotFoundError("Value not found.")

    await getRepository(ConfigEntity).remove(value);

    response.status(200).send("");
}


export async function getConfig(request: Request, response: Response) {

    let values = undefined


    if (!request.body) {
        try {
            values = await getRepository(ConfigEntity).createQueryBuilder("config").getMany();
            response.status(200).send(values)
        } catch (e) {
            console.log(e)
            throw new NotFoundError("Values not found.")
        }

    }

    const {key} = request.body;


    if (!key) {
        throw new MissingProprietiesError("Missing key.")
    }

    try {
        values = await getRepository(ConfigEntity).findBy({
            "key": key
        })
    } catch (e) {
        console.log(e)
        throw new NotFoundError("Value not found with theses arguments.")
    }

    if (!values) {
        throw new NotFoundError("There are no values for this key.")
    }


    response.status(200).send(values)
}

export async function updateConfig(req: Request, res: Response) {
    const {key, value} = req.body;


    const config = await getRepository(ConfigEntity).findOneBy({
        "key": key,
    });

    if (!config) throw new NotFoundError("Config not found.")


    config.value = value

    await getRepository(ConfigEntity).save(config);

    res.status(200).send(config);
}