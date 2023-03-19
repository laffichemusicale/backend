"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const UnauthenticatedError_1 = require("../errors/http/UnauthenticatedError");
const AccessForbiddenError_1 = require("../errors/http/AccessForbiddenError");
const InvalidCredentialsError_1 = require("../errors/http/InvalidCredentialsError");
const MissingProprietiesError_1 = require("../errors/http/MissingProprietiesError");
const NotFoundError_1 = require("../errors/http/NotFoundError");
const BadRequestError_1 = require("../errors/http/BadRequestError");
function errorHandler(error, request, response, next) {
    if (error instanceof UnauthenticatedError_1.UnauthenticatedError) {
        response.status(401).send({
            message: "UNAUTHORIZED",
            details: error.message,
            stack: error.stack
        });
    }
    if (error instanceof AccessForbiddenError_1.AccessForbiddenError) {
        response.status(401).send({
            message: "UNAUTHORIZED",
            details: error.message,
            stack: error.stack
        });
    }
    if (error instanceof InvalidCredentialsError_1.InvalidCredentialsError) {
        response.status(401).send({
            message: "UNAUTHORIZED",
            details: error.message,
            stack: error.stack
        });
    }
    if (error instanceof MissingProprietiesError_1.MissingProprietiesError) {
        response.status(400).send({
            message: "BAD_REQUEST",
            details: error.message,
            stack: error.stack
        });
    }
    if (error instanceof NotFoundError_1.NotFoundError) {
        response.status(404).send({
            message: "NOT_FOUND",
            details: error.message,
            stack: error.stack
        });
    }
    if (error instanceof BadRequestError_1.BadRequestError) {
        response.status(400).send({
            message: "BAD_REQUEST",
            details: error.message,
            stack: error.stack
        });
    }
}
exports.errorHandler = errorHandler;
