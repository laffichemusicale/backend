"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const UnauthenticatedError_1 = require("./errors/http/UnauthenticatedError");
function isLogged(req) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    let payload = undefined;
    if (!token) {
        throw new UnauthenticatedError_1.UnauthenticatedError("Authorization is missing.");
    }
    try {
        payload = (0, jsonwebtoken_1.verify)(token, "access_secret");
        return true;
    }
    catch (e) {
        throw new UnauthenticatedError_1.UnauthenticatedError("Authorization is invalid.");
    }
    return true;
}
exports.default = isLogged;
