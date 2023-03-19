"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessForbiddenError = void 0;
class AccessForbiddenError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AccessForbiddenError = AccessForbiddenError;
