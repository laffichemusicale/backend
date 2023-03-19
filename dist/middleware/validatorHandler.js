"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const BadRequestError_1 = require("../errors/http/BadRequestError");
function validatorHandler(error, request, response, next) {
    console.log("test");
    const errors = (0, express_validator_1.validationResult)(request);
    console.log(errors);
    if (!errors.isEmpty()) {
        throw new BadRequestError_1.BadRequestError(JSON.stringify(errors));
    }
    return next();
}
exports.default = validatorHandler;
