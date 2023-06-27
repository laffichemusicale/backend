import {Request, Response} from "express";
import {getRepository} from "typeorm";
import PromptEntity from "../entity/prompt.entity";
import {NotFoundError} from "../errors/http/NotFoundError";


export async function getPrompt(request: Request, response: Response) {
    response.status(200).send(await getRepository(PromptEntity).findOneBy({"id": 1}))
}

export async function editPrompt(request: Request, response: Response) {
    let {prompt} = request.body

    const dbPrompt = await getRepository(PromptEntity).findOneBy({"id": 1})

    if (!dbPrompt) throw new NotFoundError("Prompt not found.")

    dbPrompt.prompt = prompt;

    await getRepository(PromptEntity).save(dbPrompt)

    response.status(200).send(dbPrompt);


}