"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentials = void 0;
class InvalidCredentials extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidCredentials = InvalidCredentials;
