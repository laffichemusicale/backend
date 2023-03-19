import {Request, Response} from "express";
import PosterTextTemplateEntity, {TemplateType, TemplatePart} from "../../entity/posterTextTemplate.entity";
import {MissingProprietiesError} from "../../errors/http/MissingProprietiesError";
import {NotFoundError} from "../../errors/http/NotFoundError";
import {Poster} from "../../entity/poster.entity";
import {AccessForbiddenError} from "../../errors/http/AccessForbiddenError";
import {AppDataSource} from "../../database/database-source";

const posterTemplateRepository = AppDataSource.getRepository(PosterTextTemplateEntity)

export async function addTemplate(request: Request, response: Response) {
    const {text, templateType, templatePart} = request.body;

    if (templatePart === "GLOBAL") {
        const template = await posterTemplateRepository.findOneBy({
            templatePart: templatePart,
            templateType: templateType
        });

        if (template) {
            throw new AccessForbiddenError("La template existe déjà.")
        }
    }

    try {
        const posterTemplate = await posterTemplateRepository.save({
            text,
            templateType: templateType,
            templatePart
        })
        response.status(201).send(posterTemplate)
    } catch (error) {
        console.log(error)
        throw new MissingProprietiesError("Missing properties in request or SQL cannot accomplish this.")
    }

}

export async function deleteTemplate(request: Request, response: Response) {
    const {id} = request.body

    const template = await posterTemplateRepository.findOneBy({
        id: id,
    });

    if (!template) throw new NotFoundError("Template not found.")

    await posterTemplateRepository.remove(template);

    response.status(200).send("");
}

export async function updateTemplate(req: Request, res: Response) {
    const {id, templateType, templatePart, text} = req.body;


    const template = await posterTemplateRepository.findOneBy({
        id: id,
    });

    if (!template) throw new NotFoundError("Template not found.")


    template.templateType = templateType;
    template.templatePart = templatePart;
    template.text = text;


    await posterTemplateRepository.save(template);

    res.status(200).send(template);
}


export async function getTemplate(request: Request, response: Response) {
    let templates: PosterTextTemplateEntity[]


    //query
    if (request.query.templateType && request.query.templatePart) {

        const {templatePart, templateType} = request.query

        try {
            templates = await posterTemplateRepository.findBy({
                templatePart: templatePart as TemplatePart,
                templateType: templateType as TemplateType
            })
            response.status(200).send(templates)
            return

        } catch (e) {
            throw new NotFoundError("Template not found.")
        }
    }


    //params
    if (request.params.id) {
        const {id} = request.params
        if (!id) throw new MissingProprietiesError("Missing ID")

        try {
            const template = await posterTemplateRepository.findOneBy({
                id: parseInt(id),
            });


            if (!template) {
                throw new NotFoundError("Template not found.")
            }

            response.status(200).send({
                template
            })
            return
        } catch (error) {
            throw new NotFoundError("Template not found.")
        }
    }


    if (!request.body) {
        try {
            templates = await posterTemplateRepository.createQueryBuilder("poster_text_template").getMany();
            response.status(200).send(templates)
        } catch (e) {
            console.log(e)
            throw new NotFoundError("Template not found.")
        }

    }

    const {templateType, templatePart} = request.body;

    if (!templateType || !templatePart) throw new MissingProprietiesError("Missing templateType or templatePart.")


    try {
        templates = await posterTemplateRepository.findBy({
            "templateType": templateType as TemplateType,
            "templatePart": templatePart as TemplatePart
        })
    } catch (e) {
        console.log(e)
        throw new NotFoundError("Template not found with theses arguments.")
    }

    if (!templates) {
        throw new NotFoundError("There are no templates for theses requirements.")
    }


    response.status(200).send(templates)
}