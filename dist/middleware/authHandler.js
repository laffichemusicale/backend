"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = void 0;
const UnauthenticatedError_1 = require("../errors/http/UnauthenticatedError");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const authHandler = (request, response, next) => {
    var _a;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    let payload = undefined;
    if (!token) {
        throw new UnauthenticatedError_1.UnauthenticatedError("Authorization is missing.");
    }
    try {
        payload = (0, jsonwebtoken_1.verify)(token, config_1.envConfig.SECRET_KEY);
        next();
    }
    catch (e) {
        throw new UnauthenticatedError_1.UnauthenticatedError("Authorization is invalid.");
    }
};
exports.authHandler = authHandler;
