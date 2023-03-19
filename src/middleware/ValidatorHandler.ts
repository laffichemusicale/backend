import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {BadRequestError} from "../errors/http/BadRequestError";

export default function validatorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    console.log("test")

    const errors = validationResult(request);

    console.log(errors)

    if (!errors.isEmpty()) {
        throw new BadRequestError(JSON.stringify(errors))
    }

    return next()

}
