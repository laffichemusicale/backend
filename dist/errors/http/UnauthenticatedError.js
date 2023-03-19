"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
