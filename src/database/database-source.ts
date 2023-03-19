import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import {envConfig} from "../config/config";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: envConfig.SQL_HOST,
    port: Number(envConfig.SQL_PORT),
    username: envConfig.SQL_USERNAME,
    password: envConfig.SQL_PASSWORD,
    database: envConfig.SQL_DATABASE,
    //migrations: ["src/database/migrations/*.{js,ts}"],
    //logging: process.env.ORM_LOGGING === "true",
    entities: ["dist/**/*.entity.js"],
    synchronize: true,
    subscribers: [],
});