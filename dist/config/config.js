"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
exports.envConfig = {
    SQL_HOST: process.env.DB_HOST || "127.0.0.1",
    SQL_PORT: Number(process.env.DB_PORT) || 3306,
    SQL_USERNAME: process.env.DB_USER || "root",
    SQL_PASSWORD: process.env.DB_PASSWORD || "root",
    SQL_DATABASE: process.env.DB_DATABASE || "laffichemusicale",
    SECRET_KEY: process.env.SECRET_ACCESS_KEY || "secret_key",
    BACKEND_PORT: process.env.BACKEND_PORT || 8000
};
