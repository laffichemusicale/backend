import {NextFunction, Request, Response} from "express";
import {UnauthenticatedError} from "../errors/http/UnauthenticatedError";
import {AccessForbiddenError} from "../errors/http/AccessForbiddenError";
import {InvalidCredentialsError} from "../errors/http/InvalidCredentialsError";
import {MissingProprietiesError} from "../errors/http/MissingProprietiesError";
import {NotFoundError} from "../errors/http/NotFoundError";
import {BadRequestError} from "../errors/http/BadRequestError";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    if (error instanceof UnauthenticatedError) {
        response.status(401).send({
            message: "UNAUTHORIZED",
            details: error.message,
            stack: error.stack
        })
    }

    if (error instanceof AccessForbiddenError) {
        response.status(401).send({
            message: "UNAUTHORIZED",
            details: error.message,
            stack: error.stack
        })
    }

    if (error instanceof InvalidCredentialsError) {
        response.status(401).send({
            message: "UNAUTHORIZED",
            details: error.message,
            stack: error.stack
        })
    }

    if (error instanceof MissingProprietiesError) {
        response.status(400).send({
            message: "BAD_REQUEST",
            details: error.message,
            stack: error.stack
        })
    }

    if (error instanceof NotFoundError) {
        response.status(404).send({
            message: "NOT_FOUND",
            details: error.message,
            stack: error.stack
        })
    }

    if (error instanceof BadRequestError) {
        response.status(400).send({
            message: "BAD_REQUEST",
            details: error.message,
            stack: error.stack
        })
    }
}

